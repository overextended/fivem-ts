import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

function normalize(file: string): string {
  return file.replace(/\\/g, "/");
}

function walk(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);

    return entry.isDirectory() ? walk(full) : [full];
  });
}

export function generatePublicInterface() {
  const files = walk("public");
  const lines: string[] = ["/* auto-generated */", "", "export interface Public {"];

  for (const file of files) {
    const relative = normalize(path.relative(".", file));
    const extension = path.extname(file);
    let type = "string";

    switch (extension) {
      case ".json":
      case ".js":
        type = `typeof import("../${relative}")`;
        break;
    }

    lines.push(`\t"${relative}": ${type};`);
  }

  lines.push("}");

  writeFileSync("types/public.d.ts", lines.join("\n"), "utf8");
}
