import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Everything under these is generated, and prettier already decides how it
  // looks. src/intersect.ts is generated too, but it is generated from the
  // literate source, so linting it is really linting that.
  { ignores: ["docs/", "lib/", "index.html"] },

  eslint.configs.recommended,
  tseslint.configs.recommended,

  // Turn off the rules that would argue with prettier over formatting.
  prettier,

  // The static server for the visual tests is a CommonJS script run by node,
  // not part of the bundle, so it has node's globals rather than the
  // browser's and requires its way to them.
  {
    files: ["visual/*.js"],
    languageOptions: {
      globals: {
        URL: "readonly",
        __dirname: "readonly",
        console: "readonly",
        module: "writable",
        process: "readonly",
        require: "readonly"
      }
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off"
    }
  },

  {
    files: ["src/**/*.ts", "test/**/*.ts", "visual/**/*.ts"],
    rules: {
      // Match the compiler, which treats a leading underscore as "this
      // argument is here to satisfy the signature, not to be used".
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" }
      ]
    }
  }
);
