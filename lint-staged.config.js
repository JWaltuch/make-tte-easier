/* eslint-env node */
const path = require("path");
const formatCommand = "prettier 'app/*.{js,ts,jsx,tsx}' --check --config prettierrc.json --ignore-path .prettierignore";

module.exports = {
  "*": formatCommand,
};
