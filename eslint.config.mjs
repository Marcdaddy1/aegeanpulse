import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // design-sync working files: `.ds-sync/` is the staged copy of the skill's
    // own scripts and `ds-bundle/` is generated, minified output. Both are
    // gitignored but ESLint still walks them, and linting a vendored bundle
    // produced 1300+ meaningless findings. See .design-sync/NOTES.md.
    ".ds-sync/**",
    "ds-bundle/**",
    ".design-sync/**",
  ]),
]);

export default eslintConfig;
