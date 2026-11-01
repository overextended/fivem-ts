# FiveM TypeScript Boilerplate

A template for creating FiveM resources with TypeScript.

## Getting started

> [!NOTE]
> Install [Nub](https://nubjs.com/) and [Git](https://git-scm.com/) if you don't already have them.

Use any of the options below to initialise your resource.

### Using [`Git`](https://git-scm.com/)

```
git clone --depth=1 https://github.com/overextended/fivem-ts <name>
cd <name>
rm -rf .git
git init
git add .
git commit -m "Initial commit"
```

### Using [`GitHub CLI`](https://cli.github.com/)

```
gh repo create <name> --template=overextended/fivem-ts
```

### Alternative methods

- [Create a new repository](https://github.com/new?template_name=fivem-ts&template_owner=overextended)
- [Download the template directly](https://github.com/overextended/fivem-ts/archive/refs/heads/main.zip)

## Setup

Initialise your project to set the project name and optionally scaffold a new web app.

```bash
nub install
nub create vite web
```

Customise `package.json` with the author, repository, and any other relevant information. This information is added to the fxmanifest when building the project.

## Scripts

### `nub run build`

Build all resource files in production mode using [tsdown](https://tsdown.dev/).

### `nub run dev`

Run [tsdown](https://tsdown.dev/) in watch mode, to actively rebuild resource files as they are modified.

### `nub run lint`

Run [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) to analyse your project for potential errors, bugs, and code quality issues.

### `nub run format`

Run [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) to automatically reformat your project and ensure consistent code styling.

### `nub run webdev`

Runs the [Vite](https://vite.dev/) dev server for live web development.

### `nub run webbuild`

Builds your web project in production mode.

## Layout

### [/locales/](locales)

Contains translation files used with the [ox_lib](https://overextended.dev/ox_lib/Modules/Locale/Shared) locales module.

### [/public/](public)

Static assets served directly without processing or bundling.

### [/resource/](resource)

Main project source code.

- [`client`](resource/client) – client modules
- [`common`](resource/common) – shared modules
- [`server`](resource/server) – server modules

### [/scripts/](scripts)

Scripts used during project development.

### [/types/](types)

Type definitions used across the project.
