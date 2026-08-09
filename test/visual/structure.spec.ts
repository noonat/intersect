import { expect, test } from "@playwright/test";
import {
  DEFS_IDS,
  EXAMPLE_COUNT,
  EXAMPLE_IDS,
  FIGURE_CLASSES,
  FIGURE_NAMES,
  advanceFrames,
  canvasFor,
  canvasHasDrawn,
  exampleFor,
  figureFor,
  openPage
} from "./helpers";

// Assertions about the built page that do not need a baseline image. Most of
// what can break here — a figure that stopped being inlined, a class that
// fell through the mapping in build.js, a KaTeX option that quietly stopped
// applying — is both easier to read and easier to fix as a named failure than
// as a rectangle of changed pixels, and none of it churns when the design
// changes.

test.describe("loading", () => {
  for (const theme of ["light", "dark"] as const) {
    test(`no console errors in ${theme}`, async ({ page }) => {
      const errors = await openPage(page, { theme, animateAll: true });
      // A bundle that throws part way through still renders a page. Taking a
      // screenshot of it and calling that a pass is the thing to avoid.
      expect(errors).toEqual([]);
    });
  }

  // A formula wider than the column has to scroll in its own box. Left to
  // itself it widens the document instead and every other element shifts
  // with it, so the interesting width is the one narrow enough to provoke
  // that. At 1280 the formulas all fit.
  for (const width of [1280, 360]) {
    test(`the page does not scroll sideways at ${width}px`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await openPage(page);

      const overflow = await page.evaluate(() => ({
        body: document.body.scrollWidth - document.body.clientWidth,
        root:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      }));
      expect(overflow).toEqual({ body: 0, root: 0 });
    });
  }

  test("a formula too wide for the column scrolls in its own box", async ({
    page
  }) => {
    await page.setViewportSize({ width: 360, height: 900 });
    await openPage(page);
    const scrollable = await page
      .locator(".katex-display")
      .evaluateAll(nodes =>
        nodes.filter(n => n.scrollWidth > n.clientWidth).length
      );
    // Otherwise the rule is being satisfied by nothing overflowing, which
    // says nothing about what happens when something does.
    expect(scrollable).toBeGreaterThan(0);
  });
});

test.describe("figures", () => {
  test("every svg is inlined, once, and labelled", async ({ page }) => {
    await openPage(page);
    await expect(page.locator("svg.figure")).toHaveCount(FIGURE_NAMES.length);
    for (const name of FIGURE_NAMES) {
      await expect(figureFor(page, name)).toHaveCount(1);
      await expect(figureFor(page, name)).toHaveAttribute("role", "img");
    }
    // An <img> would be an isolated document, unable to read the palette or
    // follow the theme. This is the property the whole inlining step exists
    // for, so it is worth stating.
    await expect(page.locator('img[src*="docs/svg/"]')).toHaveCount(0);
  });

  test("no class falls through the mapping in build.js", async ({ page }) => {
    await openPage(page);
    const unknown = await page.evaluate(allowed => {
      const found = new Set<string>();
      document.querySelectorAll("svg.figure").forEach(figure => {
        [figure, ...figure.querySelectorAll("*")].forEach(el => {
          (el.getAttribute("class") || "")
            .split(/\s+/)
            .filter(Boolean)
            .forEach(name => {
              if (!allowed.includes(name)) found.add(name);
            });
        });
      });
      return [...found];
    }, FIGURE_CLASSES as unknown as string[]);
    // build.js maps the source names onto the semantic ones and leaves
    // anything it does not recognise alone, where it is styled by nothing.
    expect(unknown).toEqual([]);
  });

  test("every shape is classified", async ({ page }) => {
    await openPage(page);
    const unclassed = await page.evaluate(() =>
      [...document.querySelectorAll("svg.figure")]
        .flatMap(figure => [
          ...figure.querySelectorAll(
            "path,rect,circle,ellipse,line,polygon,polyline"
          )
        ])
        .filter(shape => !shape.getAttribute("class"))
        .map(
          shape =>
            `${shape.tagName} in ${shape.closest("svg")?.getAttribute("aria-label")}`
        )
    );
    // Without a d- class a shape gets the SVG defaults, which is a black fill
    // and no stroke, rather than a role from the palette.
    expect(unclassed).toEqual([]);
  });

  test("no colour is baked into an attribute", async ({ page }) => {
    await openPage(page);
    const baked = await page.evaluate(() =>
      [...document.querySelectorAll("svg.figure")]
        .flatMap(figure => [...figure.querySelectorAll("*")])
        .flatMap(el =>
          ["fill", "stroke"]
            .filter(attr => /^#|^rgb/.test(el.getAttribute(attr) || ""))
            .map(attr => `${el.tagName}[${attr}=${el.getAttribute(attr)}]`)
        )
    );
    // A presentation attribute beats the stylesheet, so one left behind would
    // pin that shape to one theme.
    expect(baked).toEqual([]);
  });

  test("the shared defs are defined exactly once", async ({ page }) => {
    await openPage(page);
    for (const id of DEFS_IDS) {
      // Eleven copies of these used to arrive, one per figure, all with the
      // same id.
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    const resolved = await page.evaluate(
      ids =>
        ids.map(id => {
          const el = document.getElementById(id);
          return el ? el.tagName.toLowerCase() : null;
        }),
      DEFS_IDS as unknown as string[]
    );
    // And they are still what the stylesheet expects to point at.
    expect(resolved).toEqual(["marker", "marker", "pattern", "pattern"]);
  });
});

test.describe("theme", () => {
  test("the toggle flips, persists, and repaints", async ({ page }) => {
    await openPage(page, { theme: "light" });
    const root = page.locator("html");

    await page.locator("#theme-toggle").click();
    await expect(root).toHaveAttribute("data-theme", "dark");
    expect(
      await page.evaluate(() => localStorage.getItem("intersect-theme"))
    ).toBe("dark");

    await page.locator("#theme-toggle").click();
    await expect(root).toHaveAttribute("data-theme", "light");
    expect(
      await page.evaluate(() => localStorage.getItem("intersect-theme"))
    ).toBe("light");
  });

  test("a saved theme survives a reload", async ({ page }) => {
    await openPage(page, { theme: "light" });
    await page.locator("#theme-toggle").click();
    await page.reload();
    // Applied by the inline script in the head, before first paint, so the
    // chosen theme never flashes.
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("the figures follow the theme but the examples do not", async ({
    page
  }) => {
    await openPage(page);
    const read = () =>
      page.evaluate(() => {
        const styles = (el: Element) => {
          const cs = getComputedStyle(el);
          return {
            ground: cs.getPropertyValue("--d-ground").trim(),
            world: cs.getPropertyValue("--d-world").trim()
          };
        };
        return {
          root: styles(document.documentElement),
          example: styles(document.querySelector("figure.example")!)
        };
      });

    const light = await read();
    await page.locator("#theme-toggle").click();
    const dark = await read();

    // The page inverts...
    expect(light.root).not.toEqual(dark.root);
    // ...but the examples keep their dark plate in both, which is why the
    // animation baselines are recorded in one theme only.
    expect(light.example).toEqual(dark.example);
    expect(light.example.ground).toBe("#16191c");
  });
});

test.describe("contents", () => {
  test("one entry per heading, numbered by section", async ({ page }) => {
    await openPage(page);
    const { headings, entries, numbered, tops } = await page.evaluate(() => {
      const headings = [...document.querySelectorAll(".page h2[id], .page h3[id]")];
      const items = [...document.querySelectorAll("#toc-list li")];
      return {
        headings: headings.map(h => h.id),
        entries: items.map(li => li.querySelector("a")?.getAttribute("href")),
        numbered: items
          .map(li => li.querySelector(".num")?.textContent)
          .filter(Boolean),
        tops: headings.filter(h => h.tagName === "H2").length
      };
    });

    expect(entries).toEqual(headings.map(id => `#${id}`));
    // Only the top level is numbered, and the numbering is dense and padded.
    expect(numbered).toEqual(
      Array.from({ length: tops }, (_, i) => String(i + 1).padStart(2, "0"))
    );
    await expect(page.locator("body")).toHaveClass(/has-toc/);
  });
});

test.describe("math", () => {
  test("every formula is rendered", async ({ page }) => {
    await openPage(page);
    await expect(page.locator(".katex").first()).toBeAttached();
    const leftovers = await page.evaluate(() => {
      const text = document.querySelector(".page")!.textContent || "";
      return (text.match(/\$[^$\n]{2,60}\$/g) || []).slice(0, 5);
    });
    // Anything KaTeX failed on is left in place, as source, at body size.
    expect(leftovers).toEqual([]);
  });

  test("the quadratic terms take their colour from the palette", async ({
    page
  }) => {
    await openPage(page);
    // \htmlClass needs trust granted to itself, and strict mode has to be
    // told not to warn about it separately. If either regressed, KaTeX would
    // drop the class and the terms would render in the body colour.
    for (const [name, token] of [
      ["m-a", "--d-collide"],
      ["m-b", "--d-clear"],
      ["m-c", "--d-query"]
    ] as const) {
      const term = page.locator(`.katex .${name}`).first();
      await expect(term).toBeAttached();
      const [color, expected] = await term.evaluate((el, property) => {
        const wanted = getComputedStyle(document.documentElement)
          .getPropertyValue(property)
          .trim();
        // Resolved through a probe so the comparison is rgb() against rgb().
        const probe = document.createElement("span");
        probe.style.color = wanted;
        document.body.appendChild(probe);
        const resolved = getComputedStyle(probe).color;
        probe.remove();
        return [getComputedStyle(el).color, resolved];
      }, token);
      expect(color).toBe(expected);
    }
  });
});

test.describe("examples", () => {
  test("each one mounts directly after its heading", async ({ page }) => {
    await openPage(page);
    await expect(page.locator("figure.example")).toHaveCount(EXAMPLE_COUNT);
    for (const id of EXAMPLE_IDS) {
      // The sibling selector is how the tests address them, and it holds only
      // because the bundle inserts each example right after its anchor.
      await expect(exampleFor(page, id)).toHaveCount(1);
      await expect(canvasFor(page, id)).toHaveCount(1);
      await expect(exampleFor(page, id).locator("figcaption")).not.toBeEmpty();
      await expect(
        exampleFor(page, id).locator(".example-legend > span")
      ).toHaveCount(3);
    }
  });

  test("the canvas backing store matches its box", async ({ page }) => {
    await openPage(page, { animateAll: true });
    const mismatched = await page.evaluate(() => {
      const ratio = window.devicePixelRatio || 1;
      return [...document.querySelectorAll("figure.example canvas")]
        .map(el => {
          const c = el as HTMLCanvasElement;
          const expected = Math.round(c.clientWidth * ratio);
          return c.width === expected ? null : `${c.width} vs ${expected}`;
        })
        .filter(Boolean);
    });
    // Drawn in CSS pixels onto a store scaled by the display density. If
    // these drift the examples are quietly soft, or cropped.
    expect(mismatched).toEqual([]);
  });

  test("only the examples on screen run", async ({ page }) => {
    const first = EXAMPLE_IDS[0]!;
    const last = EXAMPLE_IDS[EXAMPLE_IDS.length - 1]!;

    await openPage(page);
    await canvasFor(page, first).scrollIntoViewIfNeeded();
    // The observer callbacks are dispatched off the main task, and this is
    // the state they settle into rather than something the page signals.
    await page.waitForTimeout(250);
    await advanceFrames(page, 30);

    // On screen, so it runs...
    expect(await canvasHasDrawn(canvasFor(page, first))).toBe(true);
    // ...and the rest of the page does not, which is what the gating is for:
    // there are fourteen of these.
    expect(await canvasHasDrawn(canvasFor(page, last))).toBe(false);
  });

  test("#animate-all runs them anyway", async ({ page }) => {
    const last = EXAMPLE_IDS[EXAMPLE_IDS.length - 1]!;

    await openPage(page, { animateAll: true });
    await page.waitForTimeout(250);
    await advanceFrames(page, 30);

    // Never scrolled to, and running regardless, which is the whole point of
    // the hash: a screenshot of a section further down would otherwise catch
    // every example on it unstarted. The animation baselines depend on it.
    expect(await canvasHasDrawn(canvasFor(page, last))).toBe(true);
  });
});
