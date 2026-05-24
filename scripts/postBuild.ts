import { writeFile } from "node:fs/promises";
import { cp } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import fg from "fast-glob";
import { dirname, extname } from "node:path";
import type Package from "../package.json";
import { generatePublicInterface } from "./typegen.ts";

function reduceArray(name: string, files?: string[]): string {
  return files?.[0]
    ? `\n${name} {${files.reduce((acc, value) => {
        return value ? `${acc}\n\t'${value}',` : acc;
      }, "")}\n}\n`
    : "";
}

async function generateDirectoryGlobs(root: string) {
  const files = await fg("**/*", {
    cwd: root,
    onlyFiles: true,
  });

  const groups = new Map<string, Set<string>>();

  for (const file of files) {
    const dir = dirname(file);
    const ext = extname(file);

    if (!groups.has(dir)) {
      groups.set(dir, new Set());
    }

    groups.get(dir)!.add(ext);
  }

  return [...groups.entries()].map(([dir, exts]) => {
    dir = dir === "." ? `` : `${dir}/`;

    if (exts.size === 1) {
      return `dist/${dir}*${[...exts][0]}`;
    }

    return `${dir}*`;
  });
}

let buildCount = 0;
let fxmanifest = "";

export default async function () {
  if (++buildCount < 2) return;

  const { name, author, version, license, description }: typeof Package =
    JSON.parse(await readFile("./package.json", "utf8"));

  const files = await generateDirectoryGlobs("./public");

  files.unshift('locales/*.json')

  let body = Object.entries({
    name,
    author: author.name,
    version,
    license,
    description,
  }).reduce(
    (acc, [key, value]) => (value ? `${acc}${key} '${value}'\n` : acc),
    "",
  );

  body += `fx_version 'cerulean'
game 'gta5'
node_version '22'

client_script 'dist/client.js'
server_script 'dist/server.js'
${reduceArray("files", files)}`;

  if (body === fxmanifest) return;

  generatePublicInterface()

  console.log(`Generated new fxmanifest.lua`);
  fxmanifest = body;

  await cp("./public", "./dist", {
    recursive: true,
  });

  await writeFile("./fxmanifest.lua", body);
  await writeFile(".yarn.installed", new Date().toISOString());
}
