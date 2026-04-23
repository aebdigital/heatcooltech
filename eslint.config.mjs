import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "_source_mirror/**", "public/**"],
  },
  ...nextVitals,
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
