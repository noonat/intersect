import { expect, test } from "@playwright/test";
import type { CanvasRole } from "./helpers";
import {
  advanceFrames,
  canvasFor,
  openPage,
  rolesOnCanvas
} from "./helpers";

// Screenshots of the animated examples, at chosen frames.
//
// This is only a reasonable thing to do because the animations are
// deterministic: src/examples.ts has no clock and no randomness in it, and
// every example derives its state by accumulating requestAnimationFrame
// deltas. helpers.ts replaces the frame queue with one the test pumps by
// hand, so "frame 240" means the same picture every time, on any machine.
//
// The canvases are recorded in one theme, because .example pins the dark
// palette in both — asserted in structure.spec.ts, so this stays true or
// something says so.

type State = {
  name: string;
  frame: number;
  // What should be on screen, as roles from the diagram palette. Asserted
  // alongside the image so that an example which drifts into a different
  // state fails by saying so, rather than as a rectangle of changed pixels.
  roles: CanvasRole[];
};

const CLEAR: CanvasRole[] = ["clear", "edge"];
const HIT: CanvasRole[] = ["clear", "collide", "correct", "edge"];
const COLLIDING: CanvasRole[] = ["collide", "correct", "edge"];
// The multiple-object sweeps draw the walls they are cast at in world.
const STOPPED: CanvasRole[] = ["correct", "edge", "world"];

// Frame numbers were chosen by stepping each example through six hundred
// frames and classifying what it had drawn, then taking a frame from the
// middle of a long run in each state it reaches. They are not arbitrary, and
// they are not tuned to the images: change the motion and these want
// recomputing, which the role assertions will say.
const EXAMPLES: { id: string; states: State[] }[] = [
  {
    id: "aabb-vs-point",
    states: [
      { name: "clear", frame: 300, roles: CLEAR },
      { name: "colliding", frame: 150, roles: COLLIDING }
    ]
  },
  {
    id: "aabb-vs-segment",
    states: [
      { name: "clear", frame: 150, roles: CLEAR },
      { name: "colliding", frame: 90, roles: COLLIDING }
    ]
  },
  {
    id: "aabb-vs-aabb",
    states: [
      { name: "clear", frame: 300, roles: CLEAR },
      { name: "colliding", frame: 150, roles: COLLIDING }
    ]
  },
  {
    id: "aabb-vs-swept-aabb",
    states: [
      { name: "clear", frame: 120, roles: CLEAR },
      { name: "colliding", frame: 240, roles: COLLIDING },
      // The fan of swept boxes, some stopping short and some not, which is
      // the frame the example exists to show.
      { name: "mixed", frame: 79, roles: HIT }
    ]
  },
  {
    id: "aabb-vs-circle",
    states: [
      { name: "clear", frame: 300, roles: CLEAR },
      { name: "colliding", frame: 449, roles: COLLIDING }
    ]
  },
  {
    id: "aabb-vs-swept-circle",
    states: [
      { name: "clear", frame: 120, roles: CLEAR },
      { name: "colliding", frame: 240, roles: COLLIDING },
      { name: "mixed", frame: 77, roles: HIT }
    ]
  },
  {
    id: "sweeping-an-aabb-through-multiple-objects",
    states: [
      { name: "clear", frame: 202, roles: CLEAR },
      // This one only corrects for a frame at a time as it rounds a wall.
      { name: "stopped", frame: 51, roles: STOPPED }
    ]
  },
  {
    id: "circle-vs-point",
    states: [
      { name: "clear", frame: 300, roles: CLEAR },
      { name: "colliding", frame: 188, roles: COLLIDING }
    ]
  },
  {
    id: "circle-vs-segment",
    states: [
      { name: "clear", frame: 150, roles: CLEAR },
      { name: "colliding", frame: 90, roles: COLLIDING }
    ]
  },
  {
    id: "circle-vs-circle",
    states: [
      { name: "clear", frame: 298, roles: CLEAR },
      { name: "colliding", frame: 130, roles: COLLIDING }
    ]
  },
  {
    id: "circle-vs-swept-circle",
    states: [
      { name: "clear", frame: 120, roles: CLEAR },
      { name: "colliding", frame: 240, roles: COLLIDING },
      { name: "mixed", frame: 79, roles: HIT }
    ]
  },
  {
    id: "circle-vs-aabb",
    states: [
      { name: "clear", frame: 300, roles: CLEAR },
      { name: "colliding", frame: 450, roles: COLLIDING }
    ]
  },
  {
    id: "circle-vs-swept-aabb",
    states: [
      { name: "clear", frame: 120, roles: CLEAR },
      { name: "colliding", frame: 240, roles: COLLIDING },
      { name: "mixed", frame: 84, roles: HIT }
    ]
  },
  {
    id: "sweeping-a-circle-through-multiple-objects",
    states: [
      { name: "clear", frame: 273, roles: CLEAR },
      { name: "stopped", frame: 41, roles: STOPPED }
    ]
  }
];

for (const { id, states } of EXAMPLES) {
  test(id, async ({ page }) => {
    // Without the hash only the examples near the top of the viewport tick,
    // and every canvas below the fold would be recorded blank.
    await openPage(page, { animateAll: true });
    const canvas = canvasFor(page, id);

    // Stepped in one direction through the frames this example cares about,
    // so the page is loaded once rather than once per image.
    let at = 0;
    for (const state of [...states].sort((a, b) => a.frame - b.frame)) {
      await advanceFrames(page, state.frame - at);
      at = state.frame;

      expect(
        (await rolesOnCanvas(canvas)).sort(),
        `${id} at frame ${state.frame} should be ${state.name}`
      ).toEqual([...state.roles].sort());

      await expect(canvas).toHaveScreenshot(`${id}-${state.name}.png`);
    }
  });
}
