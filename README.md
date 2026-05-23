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

Customise `package.json` with your project name, author, and any other relevant information. This information is added to the fxmanifest when building the project.

If you're looking to create a webapp (i.e. nui) consider scaffolding with Svelte.

```bash
bunx sv create web
```

## Development

Use `bun tsd` to build all production files in production mode using [tsdown](https://tsdown.dev/).

During development use `bun dev` to actively rebuild modified files.

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
