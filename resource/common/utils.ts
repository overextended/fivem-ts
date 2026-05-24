import { ResourceName } from "./resource";
import type { Public } from "types/public";

export function LoadFile<T extends keyof Public>(path: T): Public[T] {
  path = path.replace("public/", "dist/") as T;
  const file = LoadResourceFile(ResourceName, path);

  if (!file) {
    throw new Error(`Failed to load file "${path}" (file not found)`);
  }

  const ext = path.slice(path.lastIndexOf(".") + 1);

  switch (ext) {
    case "js":
      return new Function(file)();
    case "json":
      return JSON.parse(file);
  }

  throw new Error(`Failed to load file "${path}" (invalid extension type)`);
}
