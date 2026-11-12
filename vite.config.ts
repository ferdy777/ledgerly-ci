import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Deployed modes must always ship with an API base URL.
const DEPLOYED_MODES = ["develop", "main"];

export default defineConfig(({ mode, command }) => {
  if (command === "build" && DEPLOYED_MODES.includes(mode)) {
    const env = loadEnv(mode, process.cwd(), "VITE_");
    if (!env.VITE_APP_TITLE) {
      throw new Error(
        `VITE_APP_TITLE is missing for mode "${mode}". Set it in .env.${mode} or as a CI/Render environment variable.`,
      );
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { "@": path.resolve(import.meta.dirname, "./src") },
    },
    server: {
      port: process.env.PORT ? Number(process.env.PORT) : 5173,
    },
    test: {
      coverage: {
        provider: "v8",
        include: ["src/**/*.{ts,tsx}"],
        exclude: ["src/**/*.test.{ts,tsx}", "src/test/**", "src/types/**"],
        reporter: ["text-summary", "lcov"],
      },
      projects: [
        {
          extends: true,
          test: {
            name: "unit",
            environment: "jsdom",
            include: ["src/**/*.test.ts"],
          },
        },
        {
          extends: true,
          test: {
            name: "component",
            environment: "jsdom",
            include: ["src/**/*.test.tsx"],
            setupFiles: ["./src/test/setup.ts"],
          },
        },
      ],
    },
  };
});
