import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // Ignorera dist/build-mappar och själva konfigurationsfilen från att luntas
    ignores: ["dist/**", "eslint.config.js", "eslint.config.mjs"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node, // Talar om att detta är en Node-miljö
      },
    },
    rules: {
      "no-console": "off", // Tillåter console.log i din backend
    },
  },
);
