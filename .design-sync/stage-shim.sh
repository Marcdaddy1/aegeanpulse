#!/usr/bin/env bash
# Stage the self-package shim that design-sync's converter builds against.
#
# WHY THIS EXISTS
# The converter resolves everything relative to a *package root* inside
# node_modules — but this repo is a Next.js app, not a published package, so
# there is nothing at node_modules/aegeanpulse. This script fabricates one:
# a package.json, a tsconfig, a junction to ./src, and the two asset files the
# converter refuses to read from outside the package root (the compiled
# Tailwind CSS and the two woff2 files its @font-face rules point at).
#
# RUN THIS AFTER EVERY `npm install` — npm sees the shim as an extraneous
# package and deletes it ("removed 1 package"), which makes the next build
# fail with ENOENT on node_modules/aegeanpulse/package.json.
#
# Prereq: .design-sync/compiled-tailwind.css must exist (see NOTES.md for how
# it is produced) and .next/static/media must hold the built font files.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SHIM="$REPO/node_modules/aegeanpulse"

# The two woff2 files actually referenced by @font-face in the compiled CSS
# (Inter and Fraunces). The other eight are dead rules the converter drops.
FONT_INTER="2c55a0e60120577a-s.0-dom-5bn10r2.woff2"
FONT_FRAUNCES="167cd0713aa75522-s.1nzccunaoxsdm.woff2"

# A junction must never be removed with `rm -rf` on Windows — that follows the
# link and deletes the TARGET, i.e. the entire src/ tree. rmdir unlinks it.
if [ -d "$SHIM/src" ]; then cmd //c rmdir "$(cygpath -w "$SHIM/src")" 2>/dev/null || true; fi
rm -rf "$SHIM"
mkdir -p "$SHIM/fonts"

cat > "$SHIM/package.json" <<'JSON'
{ "name": "aegeanpulse", "version": "0.1.0", "main": "src/index.ts" }
JSON

# next/link shim. Button is the only component that imports it, and it passes
# only href + className — so a plain <a> is behaviourally identical here. The
# real import drags Next's client router into the bundle, which then throws
# "process is not defined" in the browser (it reads process.env.__NEXT_*), and
# Claude Design renders these components standalone with no Next runtime.
# The shipped .d.ts still documents href, so the component's API is unchanged.
mkdir -p "$SHIM/ds-shims"
cat > "$SHIM/ds-shims/next-link.tsx" <<'TSX'
import * as React from "react";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function Link({ href, children, ...rest }: LinkProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
TSX

# Bundle entry. Without this the converter synthesises an entry from srcDir
# alone (src/components/ui), so Reveal/Stagger/StaggerItem — pinned via
# componentSrcMap and living in src/components/motion — got a .d.ts and a
# preview but never landed on window.AegeanPulseDS ([BUNDLE_EXPORT]).
# Widening srcDir to src/components instead would drag in the hero's Three.js
# vendor bundle, so name the modules explicitly.
cat > "$SHIM/ds-shims/ds-entry.ts" <<'TS'
export * from "../src/components/ui/badge";
export * from "../src/components/ui/button";
export * from "../src/components/ui/card";
export * from "../src/components/ui/container";
export * from "../src/components/ui/linkedin-icon";
export * from "../src/components/ui/price";
export * from "../src/components/ui/section";
export * from "../src/components/motion/reveal";
export * from "../src/components/motion/stagger";
TS

# tsconfig + a paths rule pointing next/link at the shim. The converter's
# esbuild tsconfig-paths plugin builds its filter from the paths keys, so a
# bare package specifier is remapped the same way "@/*" is.
node -e '
  const fs = require("fs");
  // Plain JSON.parse on purpose: the repo tsconfig carries no comments, and a
  // comment-stripping pass would corrupt globs like "**/*.ts" (the "/*" reads
  // as the start of a block comment).
  const tc = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
  tc.compilerOptions.paths = {
    ...tc.compilerOptions.paths,
    "next/link": ["./ds-shims/next-link.tsx"],
  };
  fs.writeFileSync(process.argv[2], JSON.stringify(tc, null, 2));
' "$REPO/tsconfig.json" "$SHIM/tsconfig.json"

cp "$REPO/.design-sync/compiled-tailwind.css" "$SHIM/compiled-tailwind.css"
cp "$REPO/.next/static/media/$FONT_INTER"    "$SHIM/fonts/$FONT_INTER"
cp "$REPO/.next/static/media/$FONT_FRAUNCES" "$SHIM/fonts/$FONT_FRAUNCES"

# Absolute target — a relative one resolves against the CWD, not the link.
powershell.exe -NoProfile -Command \
  "New-Item -ItemType Junction -Path '$(cygpath -w "$SHIM/src")' -Target '$(cygpath -w "$REPO/src")' | Out-Null"

echo "staged $SHIM"
ls -la "$SHIM"
