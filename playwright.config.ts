import { defineConfig, devices } from "@playwright/test"

// Matches the port of `bun run start`
const baseURL = "http://localhost:8765"

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "small-phone",
      testMatch: /-mobile\.spec\.ts$/,
      use: { ...devices["iPhone SE"], browserName: "chromium" },
    },
    {
      name: "phone",
      testMatch: /-mobile\.spec\.ts$/,
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "desktop",
      testMatch: /-desktop\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  // A production build keeps dev-only overlays from intercepting clicks
  webServer: {
    command: "bun run build && bun run start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
