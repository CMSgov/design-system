# Copilot Instructions for `CMSgov/design-system`

## Big picture (monorepo + package boundaries)

- This is an npm workspaces monorepo (`package.json` workspaces: `packages/*`, `examples/*`).
- Core implementation lives in `packages/design-system` (CSS/Sass assets, React/Preact components, web components).
- Brand packages (`packages/ds-healthcare-gov`, `packages/ds-medicare-gov`, `packages/ds-cms-gov`) are child design systems that layer on top of core assets.
- Design tokens are the dependency root in `packages/design-system-tokens`; other packages consume generated token outputs from `dist/`.
- Docs site is a separate package in `packages/docs`, with Storybook docs build integrated via root scripts.

## Build and data-flow facts that matter

- Build order is important and encoded at root: `build` runs tokens first, then core, then child packages, then CDN index.
- `gulpfile.js` is the main build pipeline for core/child DS packages (`npm run build:core`, `build:{healthcare,medicare,cmsgov}`).
- Non-core package builds pull shared assets from core `dist` (fonts/images/scss), so stale core artifacts cause downstream issues.
- Web component bundles are generated from Preact ESM output (see `gulpfile.js` + `webpack.config.js`).
- Webpack bundling differs by target: React/Preact bundles externalize framework runtimes; web components produce `all`, `base`, and `ds-*` bundles.

## Runtime/test modes and toggles

- Unit tests use env toggles in `tests/unit/jest.config.js`:
  - default: React mode (`npm run test:unit`)
  - `PREACT=true` mode (`npm run test:unit:preact`)
  - `WC=true` mode for web-component tests only (`npm run test:unit:wc`)
- Browser/VRT tests run via `scripts/browser-tests.ts` and default to Docker Playwright (`mcr.microsoft.com/playwright:v1.49.1-noble`).
- Use `--no-build` only when Storybook/examples artifacts are already current.
- Useful targeted loops:
  - `npm run test:unit -- --watch`
  - `npm run test:browser -- --grep "ComponentName"`
  - `npm run test:browser:interaction -- --no-build --no-docker --headed --debug --ignore-snapshots`

## Project-specific coding conventions

- Preserve design-system namespacing and compatibility rules from `CONTRIBUTING.md`:
  - avoid styling raw base elements for DS behavior (`body`, `h1`, etc.)
  - prefer namespaced/selective classes such as `.ds-base`, `.ds-c-button`, `.ds-u-margin-right--1`
- Favor clear, generalized naming over terse or color-specific names (`primary` over `blue`, descriptive utility names over abbreviations).
- Before adding component variants, check whether utility classes can achieve the same result.
- Keep changes scoped to the relevant package/theme; child design systems should not duplicate core logic unless intentionally overriding.

## High-signal paths for AI agents

- Core components: `packages/design-system/src/components/*`
- Web components: `packages/design-system/src/components/web-components/*`
- Core styles/assets: `packages/design-system/src/styles`, `fonts`, `images`
- Token source-of-truth: `packages/design-system-tokens/src/tokens`
- Build scripts: root `gulpfile.js`, `webpack.config.js`, `scripts/*.ts`
- Tests: `tests/unit/*`, `tests/browser/*`
- Usage references: `examples/*` (React, Preact, CDN HTML/CSS, web components, Astro)

## Practical workflow defaults

- Start with `npm run build` after fresh installs or cross-package changes.
- For component changes, run targeted unit tests first, then broader suite as needed.
- For visual/UI-affecting changes, run the relevant Playwright suite and only update snapshots when visual diffs are expected.
- If touching docs behavior or Storybook docs stories, validate with `npm run storybook` and/or `npm run build:storybook:docs`.

## How to work

1. Create a plan.md file for the proposed changes. The plan.md file should contain granular checkboxes for each change that must happen in order to accomplish the goal. These checkboxes reflect must have changes that are non-negotiable to accomplish the task.
2. Refine the plan in a loop with the user. Prompt the user for feedback after the initial draft and do not proceed with the plan until the user explicitly states you may.
3. After completing the work for a checkbox, meaning that a meaningful change to the code base has occurred. You must run the following commands:
   1. npm run build
   2. npm run test
   3. npm run test:browser:smoke
   4. npm run type-check
4. Surface errors to the human you are working with. Do not propose fixes or attempt to fix at this time. If the human tells you to begin working on a test failure, you are allowed a maximum of 3 (three) iterations over that failure before you must return control to the human in charge. Be sure to summarize what you tried and what the outcomes were for each attempt.
5. When a checkbox has been checked, meaning the work is done and all necessary npm scripts from step 3 have completed without issue, the AI must stop and prompt the human to perform the commit manually. The AI should provide the exact suggested commit command(s), a proposed commit message, and a summary of files expected to be committed. The AI must not attempt to run git commit itself.
6. Upon completion of all steps in the plan, create a pull request that follows the template in the .github folder. Include information from the plan.md file and make sure to ask the human in charge for the Milestone, and appropriate labels. Offer the changes for review to the human and do not proceed with creation of the pull request until the human has explicitly signed off. Do not commit the plan.md, but replicate the checkboxes from the plan.md file within the pull request template and note any deviations from those checkboxes.
