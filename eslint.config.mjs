import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});
const eslintConfig = [
  ...compat.config({
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module"
    },
    extends: ["next", "prettier"],
  }),
];
export default eslintConfig;
