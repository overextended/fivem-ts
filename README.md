# FiveM TypeScript Boilerplate

A template for creating FiveM resources with TypeScript.

## Getting started

> [!NOTE]
> Install [Bun](https://bun.com) and [Git](https://git-scm.com/) if you don't already have them.

Use any of the options below to initialise your resource.

### Using [bun create](https://bun.com/docs/runtime/templating/create)

```bash
bun create overextended/fivem-ts
```

### Using [GitHub CLI](https://cli.github.com/)

```bash
gh repo create <name> --template=overextended/fivem-ts
```

### Alternative methods

- [Create a new repository](https://github.com/new?template_name=fivem-ts&template_owner=overextended) on GitHub.
- [Download the template](https://github.com/overextended/fivem-ts/archive/refs/heads/main.zip) directly.

## Setup

Initialise your project to set the project name and optionally scaffold a new web app.

```bash
bun run init
```

Customise `package.json` with the author, repository, and any other relevant information. This information is added to the fxmanifest when building the project.

```bash
bunx sv create web
```

## Scripts

### `bun tsd`

Build all resource files in production mode using [tsdown](https://tsdown.dev/).

### `bun dev`

Run [tsdown](https://tsdown.dev/) in watch mode, to actively rebuild resource files as they are modified.

### `bun lint`

Run [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) to analyse your project for potential errors, bugs, and code quality issues.

### `bun format`

Run [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) to automatically reformat your project and ensure consistent code styling.

### `bun webdev`

Runs the [Vite](https://vite.dev/) dev server for live web development.

### `bun webbuild`

Builds your web project in production mode.

### `bun run build`

Runs the `bun tsd` and `bun webbuild` scripts to create a complete production-ready build of your project.

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
