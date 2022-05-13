module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    'airbnb-typescript',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  env: {
    browser: true,
    jest: true
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    project: "./tsconfig.json",
    tsconfigRootDir: "./"
  },
  plugins: [
    "atomic-design-hierarchy",
    "@typescript-eslint",
    "import",
    "react",
    "react-hooks",
  ],
  settings: {
    "import/resolver": {
      webpack: {
        config: "webpack.dev.config.js"
      }
    }
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",

    "react/prop-types" : "off",

    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],

    "@typescript-eslint/semi": ["off"],

    "@typescript-eslint/restrict-template-expressions": "warn",

    "@typescript-eslint/ban-ts-comment": "warn",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",

    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    // "import/no-default-export": "error",
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,

    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",

    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    "react/jsx-filename-extension": "off",

    // Use function hoisting to improve code readability
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    "no-unused-vars": 0,
    "max-len": 0,
    "object-curly-newline": "off",
    "arrow-body-style": ["warn", "as-needed"],


    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/label-has-associated-control": 0
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
};
