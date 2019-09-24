"use strict";

import "katex";
import "katex/dist/katex.min.css";
import * as renderMathInElement from "katex/dist/contrib/auto-render";
import { AABB, Point } from "./intersect";

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

  public tick(elapsed: number) {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.width, this.height);
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

  public tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    this.pos.x = Math.cos(this.angle * 0.4) * 32;
    this.pos.y = Math.sin(this.angle) * 12;
    const hit = this.box.intersectPoint(this.pos);
    this.drawAABB(this.box, "#666");
    if (hit) {
      this.drawPoint(this.pos, "#f00");
      this.drawPoint(hit.pos, "#ff0");
    } else {
      this.drawPoint(this.pos, "#0f0");
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

  public tick(elapsed: number) {
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
    this.drawAABB(this.box, "#666");
    if (hit) {
      this.drawRay(pos1, dir, length, "#f00");
      this.drawSegment(pos1, hit.pos, "#ff0");
      this.drawPoint(hit.pos, "#ff0");
      this.drawRay(hit.pos, hit.normal, 6, "#ff0", false);
    } else {
      this.drawRay(pos1, dir, length, "#0f0");
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

  public tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.2 * Math.PI * elapsed;
    this.box2.pos.x = Math.cos(this.angle) * 96;
    this.box2.pos.y = Math.sin(this.angle * 2.4) * 24;
    const hit = this.box1.intersectAABB(this.box2);
    this.drawAABB(this.box1, "#666");
    if (hit) {
      this.drawAABB(this.box2, "#f00");
      this.box2.pos.x += hit.delta.x;
      this.box2.pos.y += hit.delta.y;
      this.drawAABB(this.box2, "#ff0");
      this.drawPoint(hit.pos, "#ff0");
      this.drawRay(hit.pos, hit.normal, 4, "#ff0", false);
    } else {
      this.drawAABB(this.box2, "#0f0");
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

  public tick(elapsed: number) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    this.drawAABB(this.staticBox, "#666");
    const factor = (Math.cos(this.angle) + 1) * 0.5 || 1e-8;
    this.sweepBoxes.forEach((box, i) => {
      const delta = this.sweepDeltas[i].clone();
      delta.x *= factor;
      delta.y *= factor;
      const sweep = this.staticBox.sweepAABB(box, delta);
      const dir = delta.clone();
      const length = dir.normalize();
      this.drawAABB(box, "#666");
      if (sweep.hit) {
        // Draw a red box at the point where it was trying to move to
        this.drawRay(box.pos, dir, length, "#f00");
        this.tempBox.pos.x = box.pos.x + delta.x;
        this.tempBox.pos.y = box.pos.y + delta.y;
        this.drawAABB(this.tempBox, "#f00");
        // Draw a yellow box at the point it actually got to
        this.tempBox.pos.x = sweep.pos.x;
        this.tempBox.pos.y = sweep.pos.y;
        this.drawAABB(this.tempBox, "#ff0");
        this.drawPoint(sweep.hit.pos, "#ff0");
        this.drawRay(sweep.hit.pos, sweep.hit.normal, 4, "#ff0", false);
      } else {
        this.tempBox.pos.x = sweep.pos.x;
        this.tempBox.pos.y = sweep.pos.y;
        this.drawAABB(this.tempBox, "#0f0");
        this.drawRay(box.pos, dir, length, "#0f0");
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

  public tick(elapsed: number) {
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
        this.drawAABB(staticBox, "#aaa");
      } else {
        this.drawAABB(staticBox, "#666");
      }
    });
    this.movingBox.pos = sweep.pos;
    this.drawAABB(this.movingBox, sweep.hit ? "#ff0" : "#0f0");
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

ready(() => {
  // This call is weird because @types/katex doesn't declare this properly.
  (renderMathInElement as any)(document.body);

  const exampleIds: { [key: string]: any } = {
    "aabb-vs-aabb": AABBAABBExample,
    "aabb-vs-point": AABBPointExample,
    "aabb-vs-segment": AABBSegmentExample,
    "aabb-vs-swept-aabb": AABBSweptAABBExample,
    "sweeping-an-aabb-through-multiple-objects": MultipleAABBSweptAABBExample
  };

  const examples: Example[] = [];
  Object.keys(exampleIds).forEach(id => {
    const exampleConstructor = exampleIds[id];
    const anchor = document.getElementById(id);
    if (!anchor || !anchor.parentNode) {
      return;
    }
    const canvas = document.createElement("canvas");
    if (!canvas) {
      return;
    }
    anchor.parentNode.insertBefore(canvas, anchor.nextSibling);
    const width = (canvas.width = 640);
    const height = (canvas.height = 160);
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.translate(0.5, 0.5);
    const example = new exampleConstructor(context, width, height);
    if (example) {
      examples.push(example);
    }
  });

  setInterval(() => {
    examples.forEach(example => example.tick(1 / 30));
  }, 1000 / 30);
});
