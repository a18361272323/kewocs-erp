import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "live-uat-full-flow.spec.cjs",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 900000,
  reporter: [["line"], ["html", { open: "never" }]],
  use: {
    headless: false,
    viewport: { width: 1440, height: 900 },
    actionTimeout: 15000
  }
});
