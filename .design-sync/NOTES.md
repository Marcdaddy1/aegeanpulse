# design-sync notes — aegeanpulse

Target: Claude Design project `8a4a1c78-bf90-48e7-9486-111a28ce6608` ("Design System").
Shape: `package`. 12 exports from 9 files (`src/components/ui/*` + `src/components/motion/*`).

## Run this before every build

```bash
bash .design-sync/stage-shim.sh
```

This repo is a **Next.js app, not a published package**, so there is nothing at
`node_modules/aegeanpulse` for the converter to build against. `stage-shim.sh`
fabricates that package root. Everything below explains why each piece is there.

**Re-run it after every `npm install`** — npm treats the shim as an extraneous
package and deletes it (`removed 1 package`), and the next build then dies with
`ENOENT … node_modules/aegeanpulse/package.json`. This bit us once already, when
installing Playwright mid-run silently wiped the shim.

## Regenerating `compiled-tailwind.css`

Tailwind v4 has no config file and the tokens only exist once Tailwind has
compiled `src/app/globals.css`, so the design system needs the **built**
stylesheet. It is committed here, but regenerate it after any change to
`globals.css` or the theme:

```bash
npm run build
cp "$(ls -S .next/static/chunks/*.css | head -1)" .design-sync/compiled-tailwind.css
```

The chunk filename is content-hashed and changes every build — hence
`ls -S` (largest first) rather than a fixed name. Then re-run `stage-shim.sh`,
which copies it into the package root where `cssEntry` can reach it.

## Config field resolution — the thing that cost the most time

**Every `cfg.*` path resolves relative to `PKG_DIR`** (`node_modules/aegeanpulse`),
not the repo root — see `cfgPath()` in `package-build.mjs`. Consequences:

- `cssEntry` must live *inside* the shim. A repo-root path is rejected outright
  ("resolves outside the package — skipped"), and a `../../` escape is rejected
  too. The compiled Tailwind is therefore **copied into the shim**.
- A repo-relative value like `node_modules/aegeanpulse/tsconfig.json` resolves to
  `PKG_DIR/node_modules/aegeanpulse/…`, which doesn't exist. It is then **skipped
  with only a warning** and the build still succeeds — so a wrong path here fails
  silently rather than loudly. `cfg.entry` is the exception: it is cwd-relative.

## Component discovery

Auto-detection assumes `<Name>.tsx`; this repo uses kebab-case (`button.tsx` →
`Button`), so it found **0 of them** — the first build discovered only the 2
components explicitly pinned. **Every component is therefore pinned in
`componentSrcMap`**, including the multi-export files (`price.tsx` →
`Price` + `StarterPrice`, `section.tsx` → `Section` + `SectionHeading`,
`stagger.tsx` → `Stagger` + `StaggerItem`). Add new components there.

## Why there is an explicit `cfg.entry`

Without it the converter synthesises an entry from `srcDir` only
(`src/components/ui`), so the three `src/components/motion` components got a
`.d.ts` and a preview but never reached `window.AegeanPulseDS` — validate failed
with `[BUNDLE_EXPORT] 3/12 not a component`. `ds-shims/ds-entry.ts` names all
nine modules explicitly. Widening `srcDir` to `src/components` would "fix" it by
dragging the hero's Three.js vendor bundle into the design system — don't.

## Why `lib/bundle.mjs` is forked

`Button` imports `next/link`, which pulls Next's **client router** into the
bundle. That router reads `process.env.__NEXT_*` at module scope, so every one of
the 12 components threw `ReferenceError: process is not defined` in the render
check — and would have thrown in every design the agent builds.

`.design-sync/overrides/bundle.mjs` aliases `next/link` to a plain `<a>` shim.
`Button` passes Link only `href` + `className`, so the shim is behaviourally
identical for a standalone render, and the shipped `.d.ts` still documents
`href` — the component's API is unchanged. Bundle went 487 KB → 335 KB.

Two things had to be repointed in the fork, because it loads from
`.design-sync/overrides/` rather than the staged lib dir: the `esbuild` import
(it lives in `.ds-sync/node_modules`, not on the resolution path) and the
`./common.mjs` sibling import.

**tsconfig `paths` cannot substitute for this fork.** Two independent reasons:
esbuild ignores `paths` for files under `node_modules`, and — verified by
deleting the `@/*` mapping and watching the build still succeed — esbuild
auto-discovers the **repo's own** tsconfig for files under `src/` and ignores the
one passed via `cfg.tsconfig`. Putting the alias in the repo tsconfig would
redirect `next/link` in the real Next.js app, which is not acceptable.
(Separately, the converter's own `tsconfigPathsPlugin` returns `null` on this
repo: its comment-stripping regex treats the `/*` inside globs like `"**/*.ts"`
as a block-comment opener and corrupts the JSON. Harmless here, since esbuild's
native handling covers `@/*`.)

## Fonts

`cssEntry`'s `@font-face` rules point at Next's hashed build output
(`../media/<hash>.woff2`). Only **two** of the 20 rules are real — Inter and
Fraunces; the other 18 are dead and the converter drops them. Those two woff2
files are copied into the shim and named in `cfg.extraFonts`, otherwise validate
reports `[FONT_DANGLING]` and designs render in system fonts.

The filenames contain content hashes, so **they change whenever the fonts or
Next's build change**. If validate reports `FONT_DANGLING` again, re-read the
`url()`s in `.design-sync/compiled-tailwind.css` and update the two filenames at
the top of `stage-shim.sh`.

## Windows: never `rm -rf` the shim's `src`

It is a **junction**. `rm -rf` follows it and deletes the *target* — the entire
`src/` tree of this repo. `stage-shim.sh` unlinks it with `cmd //c rmdir` first.
Junctions also need an **absolute** target: a relative one resolves against the
current directory, not the link's location.

## Render check

`package-validate.mjs` needs Playwright (`npm i -D playwright && npx playwright
install chromium`) or it skips the render check and exits non-zero. Note the
validator takes its output dir as a **positional** arg, not `--dir`.
