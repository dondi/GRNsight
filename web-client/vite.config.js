/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/GRNsight/react-thesis-4081/",
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
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
