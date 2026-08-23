# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A personal calendar web app built with Angular: a Google Calendar-style **weekly** view where tasks
are small colorful boxes sized to their text, can be checked off as done, are created by clicking a
day, and can be added or removed across a range of days by dragging.

See [ROADMAP.md](ROADMAP.md) for the design decisions, the `Task` model, and the milestone list.
Keep the progress checkboxes there up to date as milestones land.

The user intends to add a Spring (Java) backend later. Do not scaffold or add Spring/backend code
until explicitly asked — for now this is a frontend-only Angular project.

## Working style (important)

The user is learning to program and is building this app to learn Angular. **The user writes the
application code, not Claude.** For each step: explain what to build, which file it goes in, and
which Angular concept it exercises — then let them write it and review the result afterwards.

- Introduce one new concept at a time; keep steps small.
- Direct edits by Claude are fine for `CLAUDE.md`, `ROADMAP.md`, and config — or when explicitly asked.
- The user is new to git and asked to be taught it and reminded to use it. End responses with the
  concrete next git action (branch to create, what to commit, when to push/PR).
- Workflow is one branch per milestone → commit → push → pull request → merge to `main`.

## Commands

Run all commands from the project root (`C:\Projects\Personal_Calendar`).

- `npm start` / `ng serve` — run the dev server at `http://localhost:4200/` with live reload.
- `ng build` — production build, output to `dist/`.
- `npm run watch` — development-mode build with `--watch`.
- `npm test` / `ng test` — run unit tests via **Vitest** (not Karma/Jasmine).
- `ng generate component <name>` — scaffold a new standalone component (SCSS styles by default, per `angular.json` schematics config).

There is no e2e test setup and no lint script configured yet.

## Architecture

- **Angular 22, standalone APIs only** — no `NgModule`s. Bootstrapping happens in [src/main.ts](src/main.ts) via `bootstrapApplication(App, appConfig)`.
- **App config** ([src/app/app.config.ts](src/app/app.config.ts)) is the central place for providers (router, error listeners, etc.) — this is where app-wide providers (HTTP client, future state management, etc.) should be registered.
- **Routing** is defined in [src/app/app.routes.ts](src/app/app.routes.ts) as a flat `Routes` array, currently empty. Add feature routes here as views are built.
- **Root component** is [src/app/app.ts](src/app/app.ts) (class `App`, selector `app-root`), using Angular **signals** for state (e.g. `signal(...)`). Prefer signals over RxJS/BehaviorSubject for local component state to stay consistent with the generated code.
- **Build system**: the new `@angular/build:application` / `@angular/build:dev-server` builders (esbuild-based), configured in [angular.json](angular.json) — not the legacy `@angular-devkit/build-angular` webpack builders.
- Global styles: [src/styles.scss](src/styles.scss); component styles use SCSS (`styleUrl`, not inline `styles`).
- Static assets live in `public/` and are copied to the build output as-is.
