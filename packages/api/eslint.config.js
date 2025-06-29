import rootConfig from "../../eslint.config.js";

/** @type {import('typescript-eslint').Config} */
export default [
  ...rootConfig,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
