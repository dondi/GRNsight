/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import { readFileSync } from "fs";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const pkgVersion =
  process.env.npm_package_version ||
  JSON.parse(readFileSync(new URL("./package.json", import.meta.url))).version;

export default defineConfig({
  plugins: [react()],
  base: "/GRNsight/react-thesis-4081/",
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    __APP_VERSION__: JSON.stringify(pkgVersion),
  },
  test: {
    environment: "jsdom", // use this so that have access to document, window, etc. for testing components
    setupFiles: "./test/setup.js",
    globals: true, // use this to avoid having to import 'describe', 'it', etc. in every test file
    coverage: {
      enabled: true,
      provider: "v8",
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/main.jsx"],
    },
  },
});
