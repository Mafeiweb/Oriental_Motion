import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "tmp/**",
      "coverage/**",
      "dist/**",
      "out/**",
      "tsconfig.tsbuildinfo"
    ]
  }
];

export default config;
