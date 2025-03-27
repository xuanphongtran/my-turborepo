import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "prefer-const": "warn",
      "import/no-duplicates": "error",
      "@typescript-eslint/no-extra-semi": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "no-constant-binary-expression": "error",
      "no-undef": "off",
      "lodash/prefer-lodash-method": "off",
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
      "prettier/prettier": [
        "warn",
        {
          arrowParens: "always",
          semi: false,
          trailingComma: "none",
          tabWidth: 2,
          endOfLine: "auto",
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true,
        },
      ],
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
