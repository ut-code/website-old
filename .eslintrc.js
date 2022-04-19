module.exports = {
  extends: ["airbnb-typescript-prettier"],
  rules: {
    // Next.js の Link の仕様
    "jsx-a11y/anchor-is-valid": "off",
    // React 16 以降は不要
    "react/react-in-jsx-scope": "off",
    // TypeScript と相性が悪い
    "react/require-default-props": "off",
  },
};
