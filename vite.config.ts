import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: [
      "./tests/setupEnvironmentVariables.ts",
      "./tests/setupDatabase.ts",
    ],
  },
});
