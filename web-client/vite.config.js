/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/GRNsight/react-thesis-4081/",
  test: {
    coverage: {
      enabled: true,
      provider: "v8",
      include: ["src/**/*.{js,jsx}"],
    },
  },
});
