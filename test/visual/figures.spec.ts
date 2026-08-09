import { expect, test } from "@playwright/test";
import { FIGURE_NAMES, figureFor, openPage } from "./helpers";

// One image per inlined figure, per theme.
//
// These are the smallest useful baselines in the suite: a figure is a few
// hundred pixels of geometry, and almost everything that can go wrong with
// one — a role that resolved to the wrong token, a marker that stopped being
// referenced, a hatch that lost its pattern, a label that moved — shows up
// here as an obvious difference. The structure tests cover the cases that can
// be named; this covers the rest.
//
// Both themes are recorded because the figures, unlike the examples, follow
// the page. That is the property the inlining step exists for.
for (const theme of ["light", "dark"] as const) {
  test.describe(theme, () => {
    for (const name of FIGURE_NAMES) {
      test(name, async ({ page }) => {
        await openPage(page, { theme });

        const figure = figureFor(page, name);
        await expect(figure).toBeVisible();

        // The element, not the page: a figure is unaffected by the prose
        // around it reflowing, and this keeps the baseline to its own box.
        await expect(figure).toHaveScreenshot(`${name}-${theme}.png`);
      });
    }
  });
}
