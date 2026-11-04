import { cp, readFile, writeFile, access } from "node:fs/promises";
import fg from "fast-glob";
import { dirname, extname } from "node:path";
import type Package from "../package.json";
import { generateInterface } from "./typegen.ts";
import { $ } from "zx";

function reduceArray(name: string, files?: string[]): string {
  return files?.[0]
    ? `\n${name} {${files.reduce((acc, value) => {
        return value ? `${acc}\n\t'${value}',` : acc;
      }, "")}\n}\n`
    : "";
}

async function generateDirectoryGlobs(root: string, useRoot = false) {
  const files = await fg("**/*", {
    cwd: root,
    onlyFiles: true,
  });

  const groups = new Map<string, Set<string>>();

  for (const file of files) {
    const dir = dirname(file);

    let ext = extname(file);

    if (ext === ".") {
      ext = "";
    }

    let exts = groups.get(dir);

    if (!exts) {
      exts = new Set();
      groups.set(dir, exts);
    }

    exts.add(ext);
  }

  const path = useRoot ? root : "dist";

  return [...groups.entries()].flatMap(([dir, exts]) => {
    const prefix = dir === "." ? `${path}/` : `${path}/${dir}/`;

    return [...exts].map((ext) => {
      return ext ? `${prefix}*${ext}` : `${prefix}*`;
    });
  });
}

let buildCount = 0;
let fxmanifest = "";
let watch = process.argv[2] === "--watch";

export default async function () {
  if (++buildCount < 2) return;

  const { name, author, version, license, description }: typeof Package = JSON.parse(
    await readFile("./package.json", "utf8"),
  );

  const files = await generateDirectoryGlobs("public");

  files.unshift("locales/*.json");

  let body = Object.entries({
    name,
    author: author.name,
    version,
    license,
    description,
  }).reduce((acc, [key, value]) => (value ? `${acc}${key} '${value}'\n` : acc), "");

  body += `fx_version 'cerulean'
game 'gta5'

client_script 'dist/client.js'
server_script 'dist/dummy.js'
`;

  try {
    await access("./web");

    if (!watch) await $`nub run webbuild`;

    files.push(...(await generateDirectoryGlobs("dist/web", true)));

    body += `\nui_page 'dist/web/index.html'\n`;
  } catch {}

  body += reduceArray("files", files);

  if (body === fxmanifest) return;

  const dummy = `require("./dist/server/server.js");`
  fxmanifest = body;

  generateInterface("public");


  await Promise.all([
    writeFile("./fxmanifest.lua", body),
    writeFile("./dist/dummy.js", dummy),
    cp("./public", "./dist", { recursive: true }),
  ]);

  console.log(`Generated new fxmanifest.lua`);
}
