"use strict";

import "katex";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";
import { AABB, Point } from "./intersect";

// The diagram palette lives in template/docco.css so that the figures,
// the canvases and the page itself cannot drift apart. A canvas can't
// read a custom property directly, so resolve them once and drop the
// cache whenever the theme changes.
type Role =
  | "ground"
  | "world"
  | "edge"
  | "query"
  | "clear"
  | "correct"
  | "collide";

const PROPERTIES: { [key in Role]: string } = {
  ground: "--d-ground",
  world: "--d-world",
  edge: "--d-edge",
  query: "--d-query",
  clear: "--d-clear",
  correct: "--d-correct",
  collide: "--d-collide"
};

let cache: { [key in Role]: string } | null = null;

function color(role: Role): string {
  if (!cache) {
    const styles = getComputedStyle(document.documentElement);
    const resolved = {} as { [key in Role]: string };
    (Object.keys(PROPERTIES) as Role[]).forEach(key => {
      resolved[key] = styles.getPropertyValue(PROPERTIES[key]).trim();
    });
    cache = resolved;
  }
  return cache[role];
}

function forgetColors() {
  cache = null;
}

function reflect(velocity: Point, normal: Point, out: Point) {
  const dot = velocity.x * normal.x + velocity.y * normal.y;
  const ux = normal.x * dot;
  const uy = normal.y * dot;
  const wx = velocity.x - ux;
  const wy = velocity.y - uy;
  out.x = wx - ux;
  out.y = wy - uy;
}

class Example {
  public context: CanvasRenderingContext2D;
  public width: number;
  public height: number;
  public origin: Point;
  public infiniteLength: number;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.origin = new Point(this.width * 0.5, this.height * 0.5);
    this.infiniteLength = Math.sqrt(
      this.width * this.width + this.height * this.height
    );
  }

  public drawAABB(box: AABB, color: string = "#fff", thickness: number = 1) {
    const x1 = Math.floor(this.origin.x + box.pos.x - box.half.x);
    const y1 = Math.floor(this.origin.y + box.pos.y - box.half.y);
    const x2 = Math.floor(this.origin.x + box.pos.x + box.half.x);
    const y2 = Math.floor(this.origin.y + box.pos.y + box.half.y);
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y1);
    this.context.lineTo(x2, y2);
    this.context.lineTo(x1, y2);
    this.context.lineTo(x1, y1);
    this.context.closePath();
    this.context.lineWidth = thickness;
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  public drawCircle(
    circle: { pos: Point; radius: number },
    color: string = "#fff",
    thickness: number = 1
  ) {
    const x = Math.floor(this.origin.x + circle.pos.x);
    const y = Math.floor(this.origin.y + circle.pos.y);
    this.context.beginPath();
    this.context.arc(x, y, circle.radius, 0, 2 * Math.PI, true);
    this.context.closePath();
    this.context.lineWidth = thickness;
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  public drawPoint(
    point: Point,
    color: string = "#fff",
    text: string = "",
    thickness: number = 1
  ) {
    const x = Math.floor(this.origin.x + point.x - thickness / 2);
    const y = Math.floor(this.origin.y + point.y - thickness / 2);
    this.context.lineWidth = thickness;
    this.context.fillStyle = color;
    this.context.strokeStyle = color;
    this.context.fillRect(x, y, thickness, thickness);
    this.context.strokeRect(x, y, thickness, thickness);
    if (text) {
      this.context.fillText(text, x + thickness * 4, y + thickness * 2);
    }
  }

  public drawRay(
    pos: Point,
    dir: Point,
    length: number,
    color: string = "#fff",
    arrow: boolean = true,
    thickness: number = 1
  ) {
    const pos2 = new Point(pos.x + dir.x * length, pos.y + dir.y * length);
    this.drawSegment(pos, pos2, color, thickness);
    if (arrow) {
      pos = pos2.clone();
      pos2.x = pos.x - dir.x * 4 + dir.y * 4;
      pos2.y = pos.y - dir.y * 4 - dir.x * 4;
      this.drawSegment(pos, pos2, color, thickness);
      pos2.x = pos.x - dir.x * 4 - dir.y * 4;
      pos2.y = pos.y - dir.y * 4 + dir.x * 4;
      this.drawSegment(pos, pos2, color, thickness);
    }
  }

  public drawSegment(
    point1: Point,
    point2: Point,
    color: string = "#fff",
    thickness: number = 1
  ) {
    const x1 = Math.floor(this.origin.x + point1.x);
    const y1 = Math.floor(this.origin.y + point1.y);
    const x2 = Math.floor(this.origin.x + point2.x);
    const y2 = Math.floor(this.origin.y + point2.y);
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.closePath();
    this.context.lineWidth = thickness;
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  // The rejected state is hatched as well as coloured, so that it stays
  // distinguishable from the clear one without relying on hue.
  public drawAABBHatched(box: AABB, color: string, thickness: number = 1) {
    const x1 = Math.floor(this.origin.x + box.pos.x - box.half.x);
    const y1 = Math.floor(this.origin.y + box.pos.y - box.half.y);
    const x2 = Math.floor(this.origin.x + box.pos.x + box.half.x);
    const y2 = Math.floor(this.origin.y + box.pos.y + box.half.y);

    this.context.save();
    this.context.beginPath();
    this.context.rect(x1, y1, x2 - x1, y2 - y1);
    this.context.clip();
    this.context.lineWidth = 1;
    this.context.strokeStyle = color;
    this.context.beginPath();
    for (let x = x1 - (y2 - y1); x < x2; x += 6) {
      this.context.moveTo(x, y2);
      this.context.lineTo(x + (y2 - y1), y1);
    }
    this.context.stroke();
    this.context.restore();

    this.drawAABB(box, color, thickness);
  }

  public tick(_elapsed: number) {
    const ground = color("ground");
    // In light mode the diagrams have no ground of their own: they draw
    // straight onto the page.
    if (!ground || ground === "transparent") {
      this.context.clearRect(0, 0, this.width, this.height);
    } else {
      this.context.fillStyle = ground;
      this.context.fillRect(0, 0, this.width, this.height);
    }
  }
}

class AABBPointExample extends Example {
  public angle: number;
  public pos: Point;
  public box: AABB;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.angle = 0;
    this.pos = new Point();
    this.box = new AABB(new Point(0, 0), new Point(16, 16));
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    this.pos.x = Math.cos(this.angle * 0.4) * 32;
    this.pos.y = Math.sin(this.angle) * 12;
    const hit = this.box.intersectPoint(this.pos);
    this.drawAABB(this.box, color("edge"));
    if (hit) {
      this.drawPoint(this.pos, color("collide"));
      this.drawPoint(hit.pos, color("correct"));
    } else {
      this.drawPoint(this.pos, color("clear"));
    }
  }
}

class AABBSegmentExample extends Example {
  public angle: number;
  public box: AABB;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.angle = 0;
    this.box = new AABB(new Point(0, 0), new Point(16, 16));
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    const pos1 = new Point(
      Math.cos(this.angle) * 64,
      Math.sin(this.angle) * 64
    );
    const pos2 = new Point(
      Math.sin(this.angle) * 32,
      Math.cos(this.angle) * 32
    );
    const delta = new Point(pos2.x - pos1.x, pos2.y - pos1.y);
    const hit = this.box.intersectSegment(pos1, delta);
    const dir = delta.clone();
    const length = dir.normalize();
    this.drawAABB(this.box, color("edge"));
    if (hit) {
      this.drawRay(pos1, dir, length, color("collide"));
      this.drawSegment(pos1, hit.pos, color("correct"));
      this.drawPoint(hit.pos, color("correct"));
      this.drawRay(hit.pos, hit.normal, 6, color("correct"), false);
    } else {
      this.drawRay(pos1, dir, length, color("clear"));
    }
  }
}

class AABBAABBExample extends Example {
  public angle: number;
  public box1: AABB;
  public box2: AABB;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.angle = 0;
    this.box1 = new AABB(new Point(0, 0), new Point(64, 16));
    this.box2 = new AABB(new Point(0, 0), new Point(16, 16));
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.2 * Math.PI * elapsed;
    this.box2.pos.x = Math.cos(this.angle) * 96;
    this.box2.pos.y = Math.sin(this.angle * 2.4) * 24;
    const hit = this.box1.intersectAABB(this.box2);
    this.drawAABB(this.box1, color("edge"));
    if (hit) {
      this.drawAABBHatched(this.box2, color("collide"));
      this.box2.pos.x += hit.delta.x;
      this.box2.pos.y += hit.delta.y;
      this.drawAABB(this.box2, color("correct"));
      this.drawPoint(hit.pos, color("correct"));
      this.drawRay(hit.pos, hit.normal, 4, color("correct"), false);
    } else {
      this.drawAABB(this.box2, color("clear"));
    }
  }
}

class AABBSweptAABBExample extends Example {
  public angle: number;
  public staticBox: AABB;
  public sweepBoxes: AABB[];
  public sweepDeltas: Point[];
  public tempBox: AABB;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.angle = 0;
    this.staticBox = new AABB(new Point(0, 0), new Point(112, 16));
    this.sweepBoxes = [
      new AABB(new Point(-152, 24), new Point(16, 16)),
      new AABB(new Point(128, -48), new Point(16, 16))
    ];
    this.sweepDeltas = [new Point(64, -12), new Point(-32, 96)];
    this.tempBox = new AABB(new Point(0, 0), new Point(16, 16));
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    this.drawAABB(this.staticBox, color("edge"));
    const factor = (Math.cos(this.angle) + 1) * 0.5 || 1e-8;
    this.sweepBoxes.forEach((box, i) => {
      const sweepDelta = this.sweepDeltas[i];
      if (!sweepDelta) {
        return;
      }
      const delta = sweepDelta.clone();
      delta.x *= factor;
      delta.y *= factor;
      const sweep = this.staticBox.sweepAABB(box, delta);
      const dir = delta.clone();
      const length = dir.normalize();
      this.drawAABB(box, color("edge"));
      if (sweep.hit) {
        // Draw a red box at the point where it was trying to move to
        this.drawRay(box.pos, dir, length, color("collide"));
        this.tempBox.pos.x = box.pos.x + delta.x;
        this.tempBox.pos.y = box.pos.y + delta.y;
        this.drawAABBHatched(this.tempBox, color("collide"));
        // Draw a yellow box at the point it actually got to
        this.tempBox.pos.x = sweep.pos.x;
        this.tempBox.pos.y = sweep.pos.y;
        this.drawAABB(this.tempBox, color("correct"));
        this.drawPoint(sweep.hit.pos, color("correct"));
        this.drawRay(sweep.hit.pos, sweep.hit.normal, 4, color("correct"), false);
      } else {
        this.tempBox.pos.x = sweep.pos.x;
        this.tempBox.pos.y = sweep.pos.y;
        this.drawAABB(this.tempBox, color("clear"));
        this.drawRay(box.pos, dir, length, color("clear"));
      }
    });
  }
}

class MultipleAABBSweptAABBExample extends Example {
  public delta: Point;
  public velocity: Point;
  public movingBox: AABB;
  public staticBoxes: AABB[];

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.delta = new Point();
    this.velocity = new Point(48, 48);
    this.movingBox = new AABB(new Point(0, 0), new Point(8, 8));
    this.staticBoxes = [
      new AABB(new Point(-96, 0), new Point(8, 48)),
      new AABB(new Point(96, 0), new Point(8, 48)),
      new AABB(new Point(0, -56), new Point(104, 8)),
      new AABB(new Point(0, 56), new Point(104, 8))
    ];
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.delta.x = this.velocity.x * elapsed;
    this.delta.y = this.velocity.y * elapsed;
    const sweep = this.movingBox.sweepInto(this.staticBoxes, this.delta);
    if (sweep.hit) {
      // This should really attempt to slide along the hit normal, and use up
      // the rest of the velocity, but that"s a bit much for this example
      reflect(this.velocity, sweep.hit.normal, this.velocity);
    }
    this.staticBoxes.forEach(staticBox => {
      if (sweep.hit && sweep.hit.collider === staticBox) {
        this.drawAABB(staticBox, color("world"));
      } else {
        this.drawAABB(staticBox, color("edge"));
      }
    });
    this.movingBox.pos = sweep.pos;
    this.drawAABB(this.movingBox, sweep.hit ? color("correct") : color("clear"));
  }
}

function ready(callback: () => void) {
  if (document.readyState === "complete") {
    setTimeout(callback, 1);
    return;
  }
  document.addEventListener(
    "DOMContentLoaded",
    function handler() {
      document.removeEventListener("DOMContentLoaded", handler, false);
      callback();
    },
    false
  );
}

type ExampleConstructor = new (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => Example;

ready(() => {
  renderMathInElement(document.body);

  const exampleIds: { [key: string]: ExampleConstructor } = {
    "aabb-vs-aabb": AABBAABBExample,
    "aabb-vs-point": AABBPointExample,
    "aabb-vs-segment": AABBSegmentExample,
    "aabb-vs-swept-aabb": AABBSweptAABBExample,
    "sweeping-an-aabb-through-multiple-objects": MultipleAABBSweptAABBExample
  };

  // Every example is authored against this coordinate space. The canvas
  // is laid out at whatever width the column gives it and the context is
  // scaled to match, so the drawing code never has to care.
  const WIDTH = 640;
  const HEIGHT = 160;

  const LEGEND: ReadonlyArray<readonly [string, string]> = [
    ["clear", "Clear"],
    ["collide", "Colliding"],
    ["correct", "Corrected"]
  ];

  function frame(): HTMLElement {
    const figure = document.createElement("figure");
    figure.className = "example";

    const bar = document.createElement("div");
    bar.className = "example-bar";

    const title = document.createElement("span");
    title.textContent = "Animated example";
    bar.appendChild(title);

    const legend = document.createElement("span");
    legend.className = "example-legend";
    LEGEND.forEach(([role, label]) => {
      const item = document.createElement("span");
      item.className = role;
      item.appendChild(document.createElement("i"));
      item.appendChild(document.createTextNode(label));
      legend.appendChild(item);
    });
    bar.appendChild(legend);

    figure.appendChild(bar);
    return figure;
  }

  const canvases: HTMLCanvasElement[] = [];
  const examples: Example[] = [];

  Object.keys(exampleIds).forEach(id => {
    const exampleConstructor = exampleIds[id];
    if (!exampleConstructor) {
      return;
    }
    const anchor = document.getElementById(id);
    if (!anchor || !anchor.parentNode) {
      return;
    }
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    const figure = frame();
    figure.appendChild(canvas);
    anchor.parentNode.insertBefore(figure, anchor.nextSibling);

    canvases.push(canvas);
    examples.push(new exampleConstructor(context, WIDTH, HEIGHT));
  });

  // Size the backing store to the element and the display density, then
  // scale the context back onto the authored coordinate space. The half
  // pixel keeps one pixel strokes crisp.
  function resize() {
    const ratio = window.devicePixelRatio || 1;
    canvases.forEach(canvas => {
      const width = canvas.clientWidth || WIDTH;
      const scale = width / WIDTH;
      const height = HEIGHT * scale;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      const context = canvas.getContext("2d");
      if (context) {
        context.setTransform(scale * ratio, 0, 0, scale * ratio, 0, 0);
        context.translate(0.5, 0.5);
      }
    });
  }

  let pending = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(pending);
    pending = window.setTimeout(resize, 100);
  });
  resize();

  // The palette differs between themes, so a change has to invalidate
  // the resolved colours; the next tick repaints with the new ones.
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", forgetColors);
  document.documentElement.addEventListener("themechange", forgetColors);

  setInterval(() => {
    examples.forEach(example => example.tick(1 / 30));
  }, 1000 / 30);
});
