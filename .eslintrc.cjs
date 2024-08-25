module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // 在 .eslintrc.js文件中找到rules 添加一行代码即可
    "@typescript-eslint/no-explicit-any": ["off"],
    // eslint(react-refresh/only-export-components)
    "react-refresh/only-export-components": ["off"],
    //
    "react-hooks/rules-of-hooks": ["off"],
    "@typescript-eslint/ban-types": ["off"],
  },
};
