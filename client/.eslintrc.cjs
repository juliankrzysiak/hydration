// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2020: true },
  ignorePatterns: ["node_modules/*"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "jsx-a11y/no-autofocus": 0,
    "react-hooks/exhaustive-deps": 0,
  },
};
