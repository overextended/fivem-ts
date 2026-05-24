import { $, file } from "bun";

const cwd = process.cwd();
const name = process.argv[3] || cwd.slice(cwd.lastIndexOf("/") + 1);
const initWeb = confirm("Would you like to create a web app?");

const pkg = file("./package.json");

await pkg.json().then((obj) => {
  obj.name = name;
  obj.author.name = "";
  obj.license = "";

  delete obj.bugs;
  delete obj.repository;
  delete obj.author.url;

  if (initWeb) {
    obj.workspaces ??= [];
    obj.workspaces.push("./web");
  }

  return pkg.write(JSON.stringify(obj, null, 2));
});

if (initWeb) await $`bun create vite web`;
