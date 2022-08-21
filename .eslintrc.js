module.exports = {
  // フロントは設定が特殊なので、この階層でeslintの設定を完結する
  root: true,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "2019",
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  plugins: ["@typescript-eslint", "react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    jest: true,
  },
  rules: {
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "testing-library/await-async-utils": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-namespace": "off",
  },
  overrides: [
    {
      files: ["*.spec.ts", "*.spec.tsx", "*.stories.tsx"],
      rules: {
        "@typescript-eslint/no-empty-function": "off",
      },
    },
  ],
};
