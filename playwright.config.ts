import { defineConfig, devices } from "@playwright/test";

// The visual tests are not part of `npm test`. That script is jest and
// eslint, which run offline in a couple of seconds, and it is worth keeping
// it that way. These need a browser and a server, and they answer a
// different question: not "is the maths right" — the unit tests cover that —
// but "does the page still look like the page".
//
// Baselines are Linux images, produced by the pinned Playwright container.
// See test/visual/README.md before regenerating them anywhere else.
export default defineConfig({
  testDir: "./test/visual",

  // A stale baseline is a failure to look at, not something to paper over
  // with a second attempt, and none of this touches the network.
  retries: 0,
  forbidOnly: !!process.env["CI"],
  fullyParallel: true,
  // Spread rather than set to undefined, so that off CI the runner picks the
  // count from the machine it is on.
  ...(process.env["CI"] ? { workers: 2 } : {}),
  reporter: process.env["CI"]
    ? [
        ["github"] as const,
        ["html", { open: "never", outputFolder: "test/visual/.report" }] as const
      ]
    : [["list"] as const],

  // Both kept out of docs/, which is published, and out of the repository.
  outputDir: "test/visual/.results",

  snapshotPathTemplate: "test/visual/__screenshots__/{testFileName}/{arg}{ext}",

  expect: {
    toHaveScreenshot: {
      // Antialiasing along a diagonal edge is the one thing that legitimately
      // differs between two machines running the same browser. A regression
      // worth catching — a shape that stopped being drawn, a role that picked
      // up the wrong colour, a box that moved — is orders of magnitude larger
      // than this.
      maxDiffPixelRatio: 0.002
    }
  },

  use: {
    baseURL: "http://127.0.0.1:4173",
    // Fixed, because the examples size their canvases from the element width
    // and the layout has breakpoints at 760px and above.
    viewport: { width: 1280, height: 900 },
    // The backing store of every canvas is multiplied by this, so it decides
    // what the animation baselines are.
    deviceScaleFactor: 1,
    // The page turns off its one transition under this, which stops a
    // screenshot from ever catching a half-finished transform. It belongs to
    // the context rather than to the test options, unlike colorScheme.
    contextOptions: { reducedMotion: "reduce" },
    trace: process.env["CI"] ? "retain-on-failure" : "off"
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 900 },
        deviceScaleFactor: 1,
        launchOptions: {
          args: [
            // Without this the rasteriser converts through whatever profile
            // the host reports, which shifts every pixel on a machine that
            // reports a different one.
            "--force-color-profile=srgb"
          ]
        }
      }
    }
  ],

  webServer: {
    command: "node test/visual/server.js",
    url: "http://127.0.0.1:4173/index.html",
    reuseExistingServer: !process.env["CI"],
    stdout: "ignore",
    stderr: "pipe"
  }
});
