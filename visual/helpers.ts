import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

// The examples mounted by src/examples.ts, in document order. Each id is the
// id of the heading the example is inserted after. Listed rather than
// discovered, so that an example which silently stops mounting — a renamed
// heading, a constructor that throws — fails here instead of quietly
// reducing the coverage below.
export const EXAMPLE_IDS = [
  "aabb-vs-point",
  "aabb-vs-segment",
  "aabb-vs-aabb",
  "aabb-vs-swept-aabb",
  "aabb-vs-circle",
  "aabb-vs-swept-circle",
  "sweeping-an-aabb-through-multiple-objects",
  "circle-vs-point",
  "circle-vs-segment",
  "circle-vs-circle",
  "circle-vs-swept-circle",
  "circle-vs-aabb",
  "circle-vs-swept-aabb",
  "sweeping-a-circle-through-multiple-objects"
] as const;

export const EXAMPLE_COUNT = EXAMPLE_IDS.length;

// The figures inlined into the page by build.js, in document order.
export const FIGURE_NAMES = [
  "box-intersection-test",
  "box-bad-intersection-test",
  "box-near-far-x",
  "box-near-far-y",
  "box-outside",
  "box-front",
  "box-behind",
  "box-sweep-test",
  "box-sweep-padded-test",
  "circle-sweep-padded-test",
  "circle-sweep-corner-test"
] as const;

// Every class build.js is expected to leave inside a figure: the semantic
// names it maps the source ones onto, plus the two modifiers the stylesheet
// reads and the class on the root element. Anything else means a class in the
// source SVG fell through that mapping and is now styled by nothing.
export const FIGURE_CLASSES = [
  "figure",
  "d-clear",
  "d-collide",
  "d-correct",
  "d-edge",
  "d-query",
  "d-quiet",
  "d-text",
  "d-world",
  "no-start",
  "no-end"
] as const;

// The ids defined once in template/docco.jst and referenced from the
// stylesheet. A copy of each used to arrive with every figure, all sharing
// one document and one set of ids.
export const DEFS_IDS = [
  "fig-arrow",
  "fig-dot",
  "fig-hatch",
  "fig-hatch-quiet"
] as const;

// The diagram palette, as the examples resolve it. These are the values
// .example pins in template/docco.css, which are deliberately the dark ones
// in both themes.
export const PLATE_PALETTE = {
  ground: "#16191c",
  world: "#eef1f3",
  edge: "#5b646a",
  quiet: "#3f464b",
  query: "#67cffe",
  clear: "#82d185",
  correct: "#e7b552",
  collide: "#ff5c87"
} as const;

export type Theme = "light" | "dark";

// src/examples.ts assumes 1/60 for its first frame, so driving it at the
// same rate keeps every step the same size.
const FRAME_MS = 1000 / 60;

declare global {
  interface Window {
    __advanceFrames?: (count: number) => void;
    __frameCount?: () => number;
  }
}

// The page animates from requestAnimationFrame timestamps, and every example
// derives its state by accumulating those deltas — there is no randomness and
// no wall clock anywhere in src/examples.ts. Replacing the queue with one we
// pump by hand therefore makes frame N of every example exactly reproducible,
// which is what makes screenshots of an animation a reasonable idea at all.
//
// Playwright's own clock could drive rAF instead. This is a dozen lines and
// pins the delta to the value the page already assumes, rather than to
// whatever interval that emulation happens to use.
export async function stubAnimationFrames(page: Page): Promise<void> {
  await page.addInitScript((step: number) => {
    const queue: { handle: number; callback: FrameRequestCallback }[] = [];
    let nextHandle = 0;
    let frame = 0;

    window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
      nextHandle += 1;
      queue.push({ handle: nextHandle, callback });
      return nextHandle;
    };

    window.cancelAnimationFrame = (handle: number): void => {
      const index = queue.findIndex(entry => entry.handle === handle);
      if (index >= 0) {
        queue.splice(index, 1);
      }
    };

    window.__advanceFrames = (count: number): void => {
      for (let i = 0; i < count; i++) {
        frame += 1;
        // Multiplied rather than accumulated, so the timestamps are the same
        // doubles however many times the page is stepped.
        const now = frame * step;
        // Drained before dispatch: each callback re-registers itself, and
        // those belong to the next frame.
        const due = queue.splice(0, queue.length);
        due.forEach(entry => entry.callback(now));
      }
    };

    window.__frameCount = (): number => frame;
  }, FRAME_MS);
}

// Advancing frame by frame in the browser, in one call, rather than one
// round trip per frame.
export async function advanceFrames(page: Page, count: number): Promise<void> {
  await page.evaluate(n => {
    if (!window.__advanceFrames) {
      throw new Error("requestAnimationFrame was not stubbed before load");
    }
    window.__advanceFrames(n);
  }, count);
}

export type OpenOptions = {
  theme?: Theme;
  // Loads with #animate-all, which src/examples.ts reads to skip the
  // IntersectionObserver gating. Without it only the canvases near the top of
  // the viewport ever tick.
  animateAll?: boolean;
};

// Loads the page and waits for everything that changes what it looks like:
// the bundled fonts, the injected examples, and the KaTeX pass over the
// formulas. Console errors are collected so a test can insist there were
// none — a bundle that throws halfway through still renders a page, and it
// would be a shame to screenshot it and call that a pass.
//
// Call this once per page. Going from /index.html to /index.html#animate-all
// is a same-document navigation, so the bundle would not re-run and the hash
// would not be read; a test that wants both needs two pages.
export async function openPage(
  page: Page,
  options: OpenOptions = {}
): Promise<string[]> {
  const errors: string[] = [];
  page.on("console", message => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", error => {
    errors.push(String(error));
  });

  // The page follows prefers-color-scheme unless data-theme is set, and
  // template/docco.css defines the same tokens for both routes. Emulating the
  // preference therefore exercises the path a reader arrives on.
  await page.emulateMedia({ colorScheme: options.theme ?? "light" });

  await stubAnimationFrames(page);

  await page.goto(options.animateAll ? "/index.html#animate-all" : "/index.html");

  // Webfonts, not system fonts: every family in the stylesheet lists a
  // bundled face first. Their metrics decide the layout.
  await page.evaluate(() => document.fonts.ready);

  // The examples are inserted after their headings once the bundle runs.
  await expect(page.locator("figure.example")).toHaveCount(EXAMPLE_COUNT);

  // KaTeX replaces the delimited source in place; until it has, the page is
  // showing raw TeX at the wrong size.
  await expect(page.locator(".katex").first()).toBeAttached();

  return errors;
}

// The roles the example canvases actually draw with. quiet is a figure-only
// role, and world is only used by the multiple-object sweeps.
export type CanvasRole = "edge" | "world" | "clear" | "correct" | "collide";

// Which roles are visible on a canvas, by colour rather than by asking the
// page — nothing in src/examples.ts exposes whether a test hit.
//
// Most of what the examples draw is a one pixel stroke, which is never the
// palette colour anywhere: a hairline centred on a pixel boundary covers half
// of each neighbour, so it arrives as a blend with the plate behind it. So
// rather than looking for the colour, look for pixels lying on the line from
// the plate to it, which is where any coverage of that stroke has to land.
const CANVAS_ROLES: readonly CanvasRole[] = [
  "edge",
  "world",
  "clear",
  "correct",
  "collide"
];

function toRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16)
  ];
}

export async function rolesOnCanvas(
  canvas: ReturnType<Page["locator"]>,
  minimumPixels = 4
): Promise<CanvasRole[]> {
  // Resolved out here, where the palette still has its keys: inside the
  // browser it would arrive as a plain object and every lookup would have to
  // be widened.
  const ground = toRgb(PLATE_PALETTE.ground);
  const roles = CANVAS_ROLES.map(role => {
    const to = toRgb(PLATE_PALETTE[role]);
    const axis = to.map((v, i) => v - ground[i]!);
    return {
      role,
      axis,
      // Squared length of ground -> role, to normalise the projection below.
      length: axis.reduce((sum, v) => sum + v * v, 0)
    };
  });

  return canvas.evaluate(
    (el, { ground, roles, minimum }) => {
      const c = el as HTMLCanvasElement;
      const { data } = c.getContext("2d")!.getImageData(0, 0, c.width, c.height);

      const counts: Record<string, number> = {};
      for (let p = 0; p < data.length; p += 4) {
        if (data[p + 3]! < 200) continue;
        const pixel = [data[p]!, data[p + 1]!, data[p + 2]!];
        const offset = pixel.map((v, i) => v - ground[i]!);
        for (const target of roles) {
          // How far along ground -> role this pixel sits.
          const coverage =
            offset.reduce((sum, v, i) => sum + v * target.axis[i]!, 0) /
            target.length;
          // Faint coverage is the tail of an antialiased edge and says
          // nothing about which role drew it.
          if (coverage < 0.35 || coverage > 1.2) continue;
          // ...and it has to be on that line, not merely projecting onto it.
          const residual = offset.reduce((sum, v, i) => {
            const d = v - coverage * target.axis[i]!;
            return sum + d * d;
          }, 0);
          if (residual < 20 * 20) {
            counts[target.role] = (counts[target.role] || 0) + 1;
            break;
          }
        }
      }
      return Object.keys(counts).filter(
        role => counts[role]! >= minimum
      ) as CanvasRole[];
    },
    { ground, roles, minimum: minimumPixels }
  );
}

// Whether anything has been drawn at all. An example that has never ticked
// is a canvas that was never touched, so every pixel is still transparent —
// .example pins an opaque plate colour, so the first tick fills it.
export async function canvasHasDrawn(
  canvas: ReturnType<Page["locator"]>
): Promise<boolean> {
  return canvas.evaluate(el => {
    const c = el as HTMLCanvasElement;
    const { data } = c.getContext("2d")!.getImageData(0, 0, c.width, c.height);
    for (let p = 3; p < data.length; p += 4) {
      if (data[p]! > 0) return true;
    }
    return false;
  });
}

// src/examples.ts inserts each example immediately after its heading, so the
// heading id addresses it without the source needing a hook of its own. That
// the sibling selector matches at all is part of what these tests check.
export function exampleFor(page: Page, id: string) {
  return page.locator(`#${id} + figure.example`);
}

// Screenshots of a canvas are compared against the element, not the page, so
// they are unaffected by anything above or beside it moving.
export function canvasFor(page: Page, id: string) {
  return exampleFor(page, id).locator("canvas");
}

// Likewise for the figures: build.js labels each inlined svg with the name of
// the file it came from, which is the only handle they have.
export function figureFor(page: Page, name: string) {
  return page.locator(
    `svg.figure[aria-label="Diagram: ${name.replace(/-/g, " ")}"]`
  );
}
