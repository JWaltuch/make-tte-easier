/* eslint-env node */
const path = require("path");
const formatCommand = "node --version && prettier 'app/*.{js,ts,jsx,tsx}' --check --config prettierrc.json --ignore-path .prettierignore";

module.exports = {
  "*": formatCommand,
};
