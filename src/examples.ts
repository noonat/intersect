"use strict";

import "katex";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";
import { AABB, Circle, Point } from "./intersect";

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

// Resolved from an example rather than from the root, because the
// examples override these tokens: they keep the dark plate in both
// themes, while the static figures follow the page.
let source: Element | null = null;

function color(role: Role): string {
  if (!cache) {
    const styles = getComputedStyle(source || document.documentElement);
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

const ARROW_LENGTH = 7;
const ARROW_HALF_WIDTH = 0.4;

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
  // World units per pixel. Applied to coordinates rather than to the
  // context transform, so that boxes scale up while line weights,
  // arrowheads and hatching stay the size they were drawn at.
  public zoom: number;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.origin = new Point(width * 0.5, height * 0.5);
    this.zoom = 1;
    this.infiniteLength = Math.sqrt(width * width + height * height);
  }

  public layout(width: number, height: number, zoom: number) {
    this.width = width;
    this.height = height;
    this.zoom = zoom;
    this.origin.x = width * 0.5;
    this.origin.y = height * 0.5;
    this.infiniteLength = Math.sqrt(width * width + height * height) / zoom;
  }

  public toX(x: number): number {
    return this.origin.x + x * this.zoom;
  }

  public toY(y: number): number {
    return this.origin.y + y * this.zoom;
  }

  public drawAABB(box: AABB, color: string = "#fff", thickness: number = 1) {
    const x1 = Math.round(this.toX(box.pos.x - box.half.x));
    const y1 = Math.round(this.toY(box.pos.y - box.half.y));
    const x2 = Math.round(this.toX(box.pos.x + box.half.x));
    const y2 = Math.round(this.toY(box.pos.y + box.half.y));
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
    this.context.beginPath();
    this.context.arc(
      this.toX(circle.pos.x),
      this.toY(circle.pos.y),
      circle.radius * this.zoom,
      0,
      2 * Math.PI,
      true
    );
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
    const x = Math.round(this.toX(point.x) - thickness / 2);
    const y = Math.round(this.toY(point.y) - thickness / 2);
    this.context.lineWidth = thickness;
    this.context.fillStyle = color;
    this.context.strokeStyle = color;
    this.context.fillRect(x, y, thickness, thickness);
    this.context.strokeRect(x, y, thickness, thickness);
    if (text) {
      this.context.fillText(text, x + thickness * 4, y + thickness * 2);
    }
  }

  // A filled triangle, the same shape the static figures use for their
  // markers. Drawn as one path so the two edges meet at the point,
  // rather than as two butt-capped strokes crossing there.
  public drawArrowhead(
    tip: Point,
    dir: Point,
    color: string,
    length: number = ARROW_LENGTH
  ) {
    const direction = dir.clone();
    direction.normalize();
    const x = this.toX(tip.x);
    const y = this.toY(tip.y);
    const baseX = x - direction.x * length;
    const baseY = y - direction.y * length;
    const half = length * ARROW_HALF_WIDTH;

    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(baseX + direction.y * half, baseY - direction.x * half);
    this.context.lineTo(baseX - direction.y * half, baseY + direction.x * half);
    this.context.closePath();
    this.context.fillStyle = color;
    this.context.fill();
  }

  public drawRay(
    pos: Point,
    dir: Point,
    length: number,
    color: string = "#fff",
    arrow: boolean = true,
    thickness: number = 1
  ) {
    // Stop the shaft just inside the head, so it cannot show through the
    // point when the two are the same color.
    const head = arrow ? Math.min(ARROW_LENGTH, length * this.zoom) : 0;
    const shaft = Math.max(0, length - (head * 0.8) / this.zoom);
    this.drawSegment(
      pos,
      new Point(pos.x + dir.x * shaft, pos.y + dir.y * shaft),
      color,
      thickness
    );
    if (arrow) {
      this.drawArrowhead(
        new Point(pos.x + dir.x * length, pos.y + dir.y * length),
        dir,
        color,
        head
      );
    }
  }

  public drawSegment(
    point1: Point,
    point2: Point,
    color: string = "#fff",
    thickness: number = 1
  ) {
    this.context.beginPath();
    this.context.moveTo(this.toX(point1.x), this.toY(point1.y));
    this.context.lineTo(this.toX(point2.x), this.toY(point2.y));
    this.context.lineWidth = thickness;
    this.context.lineCap = "round";
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  // The rejected state is hatched as well as colored, so that it stays
  // distinguishable from the clear one without relying on hue.
  public drawAABBHatched(box: AABB, color: string, thickness: number = 1) {
    const x1 = Math.round(this.toX(box.pos.x - box.half.x));
    const y1 = Math.round(this.toY(box.pos.y - box.half.y));
    const x2 = Math.round(this.toX(box.pos.x + box.half.x));
    const y2 = Math.round(this.toY(box.pos.y + box.half.y));

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

  public drawCircleHatched(
    circle: { pos: Point; radius: number },
    color: string,
    thickness: number = 1
  ) {
    const x = this.toX(circle.pos.x);
    const y = this.toY(circle.pos.y);
    const r = circle.radius * this.zoom;

    this.context.save();
    this.context.beginPath();
    this.context.arc(x, y, r, 0, 2 * Math.PI, true);
    this.context.clip();
    this.context.lineWidth = 1;
    this.context.strokeStyle = color;
    this.context.beginPath();
    for (let hx = x - r - 2 * r; hx < x + r; hx += 6) {
      this.context.moveTo(hx, y + r);
      this.context.lineTo(hx + 2 * r, y - r);
    }
    this.context.stroke();
    this.context.restore();

    this.drawCircle(circle, color, thickness);
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

class AABBCircleExample extends Example {
  public angle: number;
  public box: AABB;
  public circle: Circle;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.angle = 0;
    this.box = new AABB(new Point(0, 0), new Point(64, 16));
    this.circle = new Circle(new Point(0, 0), 16);
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.2 * Math.PI * elapsed;
    this.circle.pos.x = Math.cos(this.angle) * 96;
    this.circle.pos.y = Math.sin(this.angle * 2.4) * 24;
    const hit = this.box.intersectCircle(this.circle);
    this.drawAABB(this.box, color("edge"));
    if (hit) {
      this.drawCircleHatched(this.circle, color("collide"));
      this.circle.pos.x += hit.delta.x;
      this.circle.pos.y += hit.delta.y;
      this.drawCircle(this.circle, color("correct"));
      this.drawPoint(hit.pos, color("correct"));
      this.drawRay(hit.pos, hit.normal, 4, color("correct"), false);
    } else {
      this.drawCircle(this.circle, color("clear"));
    }
  }
}

class AABBSweptCircleExample extends Example {
  public angle: number;
  public staticBox: AABB;
  public sweepCircles: Circle[];
  public sweepDeltas: Point[];
  public tempCircle: Circle;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.angle = 0;
    this.staticBox = new AABB(new Point(0, 0), new Point(112, 16));
    this.sweepCircles = [
      new Circle(new Point(-152, 24), 16),
      new Circle(new Point(128, -48), 16)
    ];
    this.sweepDeltas = [new Point(64, -12), new Point(-32, 96)];
    this.tempCircle = new Circle(new Point(0, 0), 16);
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    this.drawAABB(this.staticBox, color("edge"));
    const factor = (Math.cos(this.angle) + 1) * 0.5 || 1e-8;
    this.sweepCircles.forEach((circle, i) => {
      const sweepDelta = this.sweepDeltas[i];
      if (!sweepDelta) {
        return;
      }
      const delta = sweepDelta.clone();
      delta.x *= factor;
      delta.y *= factor;
      const sweep = this.staticBox.sweepCircle(circle, delta);
      const dir = delta.clone();
      const length = dir.normalize();
      this.drawCircle(circle, color("edge"));
      if (sweep.hit) {
        // Draw a red circle at the point where it was trying to move to
        this.drawRay(circle.pos, dir, length, color("collide"));
        this.tempCircle.pos.x = circle.pos.x + delta.x;
        this.tempCircle.pos.y = circle.pos.y + delta.y;
        this.drawCircleHatched(this.tempCircle, color("collide"));
        // Draw a yellow circle at the point it actually got to
        this.tempCircle.pos.x = sweep.pos.x;
        this.tempCircle.pos.y = sweep.pos.y;
        this.drawCircle(this.tempCircle, color("correct"));
        this.drawPoint(sweep.hit.pos, color("correct"));
        this.drawRay(sweep.hit.pos, sweep.hit.normal, 4, color("correct"), false);
      } else {
        this.tempCircle.pos.x = sweep.pos.x;
        this.tempCircle.pos.y = sweep.pos.y;
        this.drawCircle(this.tempCircle, color("clear"));
        this.drawRay(circle.pos, dir, length, color("clear"));
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

class CirclePointExample extends Example {
  public angle: number;
  public pos: Point;
  public circle: Circle;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.angle = 0;
    this.pos = new Point();
    this.circle = new Circle(new Point(0, 0), 24);
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    this.pos.x = Math.cos(this.angle * 0.4) * 32;
    this.pos.y = Math.sin(this.angle) * 12;
    const hit = this.circle.intersectPoint(this.pos);
    this.drawCircle(this.circle, color("edge"));
    if (hit) {
      this.drawPoint(this.pos, color("collide"));
      this.drawPoint(hit.pos, color("correct"));
    } else {
      this.drawPoint(this.pos, color("clear"));
    }
  }
}

class CircleSegmentExample extends Example {
  public angle: number;
  public circle: Circle;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.angle = 0;
    this.circle = new Circle(new Point(0, 0), 24);
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
    const hit = this.circle.intersectSegment(pos1, delta);
    const dir = delta.clone();
    const length = dir.normalize();
    this.drawCircle(this.circle, color("edge"));
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

class CircleCircleExample extends Example {
  public angle: number;
  public circle1: Circle;
  public circle2: Circle;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.angle = 0;
    this.circle1 = new Circle(new Point(0, 0), 32);
    this.circle2 = new Circle(new Point(0, 0), 16);
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.2 * Math.PI * elapsed;
    this.circle2.pos.x = Math.cos(this.angle) * 96;
    this.circle2.pos.y = Math.sin(this.angle * 2.4) * 24;
    const hit = this.circle1.intersectCircle(this.circle2);
    this.drawCircle(this.circle1, color("edge"));
    if (hit) {
      this.drawCircleHatched(this.circle2, color("collide"));
      this.circle2.pos.x += hit.delta.x;
      this.circle2.pos.y += hit.delta.y;
      this.drawCircle(this.circle2, color("correct"));
      this.drawPoint(hit.pos, color("correct"));
      this.drawRay(hit.pos, hit.normal, 4, color("correct"), false);
    } else {
      this.drawCircle(this.circle2, color("clear"));
    }
  }
}

class CircleSweptCircleExample extends Example {
  public angle: number;
  public circle: Circle;
  public sweepCircles: Circle[];
  public sweepDeltas: Point[];
  public tempCircle: Circle;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.angle = 0;
    this.circle = new Circle(new Point(0, 0), 112);
    this.sweepCircles = [
      new Circle(new Point(-152, 24), 16),
      new Circle(new Point(128, -48), 16)
    ];
    this.sweepDeltas = [new Point(64, -12), new Point(-32, 96)];
    this.tempCircle = new Circle(new Point(0, 0), 16);
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    this.drawCircle(this.circle, color("edge"));
    const factor = (Math.cos(this.angle) + 1) * 0.5 || 1e-8;
    this.sweepCircles.forEach((circle, i) => {
      const sweepDelta = this.sweepDeltas[i];
      if (!sweepDelta) {
        return;
      }
      const delta = sweepDelta.clone();
      delta.x *= factor;
      delta.y *= factor;
      const sweep = this.circle.sweepCircle(circle, delta);
      const dir = delta.clone();
      const length = dir.normalize();
      this.drawCircle(circle, color("edge"));
      if (sweep.hit) {
        // Draw a red circle at the point where it was trying to move to
        this.drawRay(circle.pos, dir, length, color("collide"));
        this.tempCircle.pos.x = circle.pos.x + delta.x;
        this.tempCircle.pos.y = circle.pos.y + delta.y;
        this.drawCircleHatched(this.tempCircle, color("collide"));
        // Draw a yellow circle at the point it actually got to
        this.tempCircle.pos.x = sweep.pos.x;
        this.tempCircle.pos.y = sweep.pos.y;
        this.drawCircle(this.tempCircle, color("correct"));
        this.drawPoint(sweep.hit.pos, color("correct"));
        this.drawRay(sweep.hit.pos, sweep.hit.normal, 4, color("correct"), false);
      } else {
        this.tempCircle.pos.x = sweep.pos.x;
        this.tempCircle.pos.y = sweep.pos.y;
        this.drawCircle(this.tempCircle, color("clear"));
        this.drawRay(circle.pos, dir, length, color("clear"));
      }
    });
  }
}

class CircleAABBExample extends Example {
  public angle: number;
  public circle: Circle;
  public box: AABB;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.angle = 0;
    this.circle = new Circle(new Point(0, 0), 32);
    this.box = new AABB(new Point(0, 0), new Point(16, 16));
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.2 * Math.PI * elapsed;
    this.box.pos.x = Math.cos(this.angle) * 96;
    this.box.pos.y = Math.sin(this.angle * 2.4) * 24;
    const hit = this.circle.intersectAABB(this.box);
    this.drawCircle(this.circle, color("edge"));
    if (hit) {
      this.drawAABBHatched(this.box, color("collide"));
      this.box.pos.x += hit.delta.x;
      this.box.pos.y += hit.delta.y;
      this.drawAABB(this.box, color("correct"));
      this.drawPoint(hit.pos, color("correct"));
      this.drawRay(hit.pos, hit.normal, 4, color("correct"), false);
    } else {
      this.drawAABB(this.box, color("clear"));
    }
  }
}

class CircleSweptAABBExample extends Example {
  public angle: number;
  public circle: Circle;
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
    this.circle = new Circle(new Point(0, 0), 112);
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
    this.drawCircle(this.circle, color("edge"));
    const factor = (Math.cos(this.angle) + 1) * 0.5 || 1e-8;
    this.sweepBoxes.forEach((box, i) => {
      const sweepDelta = this.sweepDeltas[i];
      if (!sweepDelta) {
        return;
      }
      const delta = sweepDelta.clone();
      delta.x *= factor;
      delta.y *= factor;
      const sweep = this.circle.sweepAABB(box, delta);
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

class MultipleColliderSweptCircleExample extends Example {
  public delta: Point;
  public velocity: Point;
  public movingCircle: Circle;
  public staticColliders: (AABB | Circle)[];

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(context, width, height);
    this.delta = new Point();
    this.velocity = new Point(48, 48);
    this.movingCircle = new Circle(new Point(-56, -32), 8);
    this.staticColliders = [
      new AABB(new Point(-96, 0), new Point(8, 48)),
      new AABB(new Point(96, 0), new Point(8, 48)),
      new AABB(new Point(0, -56), new Point(104, 8)),
      new AABB(new Point(0, 56), new Point(104, 8)),
      new Circle(new Point(0, 0), 16)
    ];
  }

  public override tick(elapsed: number) {
    super.tick(elapsed);
    this.delta.x = this.velocity.x * elapsed;
    this.delta.y = this.velocity.y * elapsed;
    const sweep = this.movingCircle.sweepInto(this.staticColliders, this.delta);
    if (sweep.hit) {
      // Same caveat as the box version: a real game would slide along the
      // normal and spend the rest of the velocity.
      reflect(this.velocity, sweep.hit.normal, this.velocity);
    }
    this.staticColliders.forEach(collider => {
      const hit = sweep.hit && sweep.hit.collider === collider;
      const stroke = hit ? color("world") : color("edge");
      if (collider instanceof Circle) {
        this.drawCircle(collider, stroke);
      } else {
        this.drawAABB(collider, stroke);
      }
    });
    this.movingCircle.pos = sweep.pos;
    this.drawCircle(
      this.movingCircle,
      sweep.hit ? color("correct") : color("clear")
    );
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
  // The math colors a few terms to tie them to the prose. \color takes a
  // literal, which would then be wrong in one theme or the other, so the
  // highlights are class names resolved against the palette in the
  // stylesheet instead. That command needs trust, granted only to itself.
  renderMathInElement(document.body, {
    trust: (context: { command: string }) => context.command === "\\htmlClass",
    // Trusting it is not enough on its own; strict mode warns about the
    // extension separately, once per formula.
    strict: (code: string) => (code === "htmlExtension" ? "ignore" : "warn")
  });

  // Each example declares the extent it actually draws into, so the view
  // can be scaled to fill its frame. Left at the canvas size, the first
  // example drew into about five per cent of it.
  const EXAMPLES: {
    id: string;
    constructor: ExampleConstructor;
    content: [number, number];
    caption: string;
  }[] = [
    {
      id: "aabb-vs-point",
      constructor: AABBPointExample,
      content: [64, 32],
      caption:
        "The point is red while it is inside the box. Amber marks where it " +
        "would be pushed out to."
    },
    {
      id: "aabb-vs-segment",
      constructor: AABBSegmentExample,
      content: [128, 128],
      caption:
        "The ray is red when it hits. Amber marks the contact point and the " +
        "surface normal there."
    },
    {
      id: "aabb-vs-aabb",
      constructor: AABBAABBExample,
      content: [224, 80],
      caption:
        "Where the boxes overlap the moving one is hatched, with the " +
        "corrected position beside it in amber."
    },
    {
      id: "aabb-vs-swept-aabb",
      constructor: AABBSweptAABBExample,
      content: [312, 128],
      caption:
        "Sweeping stops each box at first contact rather than letting it " +
        "reach the hatched position it was aiming for."
    },
    {
      id: "aabb-vs-circle",
      constructor: AABBCircleExample,
      content: [224, 80],
      caption:
        "Where the circle overlaps the box it is hatched, with the " +
        "corrected position beside it in amber."
    },
    {
      id: "aabb-vs-swept-circle",
      constructor: AABBSweptCircleExample,
      content: [312, 128],
      caption:
        "Inflating the box by the circle rounds off its corners, so the " +
        "circle rolls around them instead of catching on a square edge."
    },
    {
      id: "sweeping-an-aabb-through-multiple-objects",
      constructor: MultipleAABBSweptAABBExample,
      content: [208, 128],
      caption:
        "The box is swept against every wall in turn, so it never passes " +
        "through one."
    },
    {
      id: "circle-vs-point",
      constructor: CirclePointExample,
      content: [64, 48],
      caption:
        "The point is red while it is inside the circle. Amber marks the " +
        "nearest point on the edge."
    },
    {
      id: "circle-vs-segment",
      constructor: CircleSegmentExample,
      content: [128, 128],
      caption:
        "The ray is red when it hits. Amber marks the contact point and the " +
        "surface normal there."
    },
    {
      id: "circle-vs-circle",
      constructor: CircleCircleExample,
      content: [224, 80],
      caption:
        "Overlapping circles are hatched, with the corrected position " +
        "beside them in amber."
    },
    {
      id: "circle-vs-swept-circle",
      constructor: CircleSweptCircleExample,
      content: [312, 128],
      caption:
        "Sweeping stops each circle at first contact rather than letting it " +
        "reach the hatched position it was aiming for."
    },
    {
      id: "circle-vs-aabb",
      constructor: CircleAABBExample,
      content: [224, 80],
      caption:
        "Where the box overlaps the circle it is hatched, with the " +
        "corrected position beside it in amber."
    },
    {
      id: "circle-vs-swept-aabb",
      constructor: CircleSweptAABBExample,
      content: [312, 128],
      caption:
        "The same test from the other side: the box stops against the " +
        "circle, on its faces and on its corners alike."
    },
    {
      id: "sweeping-a-circle-through-multiple-objects",
      constructor: MultipleColliderSweptCircleExample,
      content: [208, 128],
      caption:
        "The list of static objects can mix shapes; the circle is swept " +
        "against the walls and the pillar alike."
    }
  ];

  const PLATE_ASPECT = 3;
  const FILL = 0.82;
  // Past this the boxes read as oversized rather than clearer.
  const MAX_ZOOM = 5;

  const LEGEND: ReadonlyArray<readonly [string, string]> = [
    ["clear", "Clear"],
    ["collide", "Colliding"],
    ["correct", "Corrected"]
  ];

  function frame(canvas: HTMLCanvasElement, caption: string): HTMLElement {
    const figure = document.createElement("figure");
    figure.className = "example";

    const plate = document.createElement("div");
    plate.className = "example-plate";
    plate.appendChild(canvas);

    const bar = document.createElement("div");
    bar.className = "example-bar";
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
    plate.appendChild(bar);
    figure.appendChild(plate);

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = caption;
    figure.appendChild(figcaption);

    return figure;
  }

  type Mounted = {
    example: Example;
    canvas: HTMLCanvasElement;
    content: [number, number];
    visible: boolean;
  };

  const mounted: Mounted[] = [];

  EXAMPLES.forEach(spec => {
    const anchor = document.getElementById(spec.id);
    if (!anchor || !anchor.parentNode) {
      return;
    }
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    anchor.parentNode.insertBefore(
      frame(canvas, spec.caption),
      anchor.nextSibling
    );
    if (!source) {
      source = canvas;
      cache = null;
    }
    mounted.push({
      example: new spec.constructor(context, canvas.clientWidth, 0),
      canvas,
      content: spec.content,
      visible: true
    });
  });

  // The backing store follows the element and the display density; the
  // context is scaled once so the drawing code can work in CSS pixels.
  function resize() {
    const ratio = window.devicePixelRatio || 1;
    mounted.forEach(item => {
      const width = item.canvas.clientWidth || 640;
      const height = Math.round(width / PLATE_ASPECT);
      item.canvas.style.height = height + "px";
      item.canvas.width = Math.round(width * ratio);
      item.canvas.height = Math.round(height * ratio);
      const context = item.canvas.getContext("2d");
      if (context) {
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      }
      const zoom = Math.min(
        (width * FILL) / item.content[0],
        (height * FILL) / item.content[1],
        MAX_ZOOM
      );
      item.example.layout(width, height, zoom);
    });
  }

  let pending = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(pending);
    pending = window.setTimeout(resize, 100);
  });
  resize();

  // Nothing is gained by animating a canvas that is not on screen, and
  // there are five of them.
  //
  // Except when something is looking at the page without scrolling it, like
  // a screenshot of a section further down, where the examples would sit
  // there unstarted. Loading with #animate-all leaves them all running. It's
  // read once, on load, because the point is to set it up front rather than
  // to toggle it while reading.
  const animateAll = window.location.hash === "#animate-all";

  if (!animateAll && typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const item = mounted.find(m => m.canvas === entry.target);
          if (item) {
            item.visible = entry.isIntersecting;
          }
        });
      },
      { rootMargin: "100px" }
    );
    mounted.forEach(item => observer.observe(item.canvas));
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", forgetColors);
  document.documentElement.addEventListener("themechange", forgetColors);

  // requestAnimationFrame rather than a fixed interval, so the motion
  // runs at the display's rate instead of drifting against it. The step
  // is clamped so returning to a backgrounded tab does not jump.
  let last = 0;
  function loop(now: number) {
    const elapsed = last ? Math.min((now - last) / 1000, 1 / 15) : 1 / 60;
    last = now;
    mounted.forEach(item => {
      if (item.visible) {
        item.example.tick(elapsed);
      }
    });
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
});
