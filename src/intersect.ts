"use strict";

export const EPSILON: number = 1e-8;

export function abs(value: number): number {
  return value < 0 ? -value : value;
}

export function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

export function sign(value: number): number {
  return value < 0 ? -1 : 1;
}

export class Point {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public clone(): Point {
    return new Point(this.x, this.y);
  }

  public normalize(): number {
    let length = this.x * this.x + this.y * this.y;
    if (length > 0) {
      length = Math.sqrt(length);
      const inverseLength = 1.0 / length;
      this.x *= inverseLength;
      this.y *= inverseLength;
    } else {
      this.x = 1;
      this.y = 0;
    }
    return length;
  }
}

type Collider = AABB;

export class Hit {
  public collider: Collider;
  public pos: Point;
  public delta: Point;
  public normal: Point;
  public time: number;

  constructor(collider: Collider) {
    this.collider = collider;
    this.pos = new Point();
    this.delta = new Point();
    this.normal = new Point();
    this.time = 0;
  }
}

export class Sweep {
  public hit: Hit | null;
  public pos: Point;
  public time: number;

  constructor() {
    this.hit = null;
    this.pos = new Point();
    this.time = 1;
  }
}

export class AABB {
  public pos: Point;
  public half: Point;

  constructor(pos: Point, half: Point) {
    this.pos = pos;
    this.half = half;
  }

  public intersectPoint(point: Point): Hit | null {
    const dx = point.x - this.pos.x;
    const px = this.half.x - abs(dx);
    if (px <= 0) {
      return null;
    }

    const dy = point.y - this.pos.y;
    const py = this.half.y - abs(dy);
    if (py <= 0) {
      return null;
    }

    const hit = new Hit(this);
    if (px < py) {
      const sx = sign(dx);
      hit.delta.x = px * sx;
      hit.normal.x = sx;
      hit.pos.x = this.pos.x + this.half.x * sx;
      hit.pos.y = point.y;
    } else {
      const sy = sign(dy);
      hit.delta.y = py * sy;
      hit.normal.y = sy;
      hit.pos.x = point.x;
      hit.pos.y = this.pos.y + this.half.y * sy;
    }
    return hit;
  }

  public intersectSegment(
    pos: Point,
    delta: Point,
    paddingX: number = 0,
    paddingY: number = 0
  ): Hit | null {
    const scaleX = 1.0 / delta.x;
    const scaleY = 1.0 / delta.y;
    const signX = sign(scaleX);
    const signY = sign(scaleY);
    const nearTimeX =
      (this.pos.x - signX * (this.half.x + paddingX) - pos.x) * scaleX;
    let nearTimeY =
      (this.pos.y - signY * (this.half.y + paddingY) - pos.y) * scaleY;
    const farTimeX =
      (this.pos.x + signX * (this.half.x + paddingX) - pos.x) * scaleX;
    const farTimeY =
      (this.pos.y + signY * (this.half.y + paddingY) - pos.y) * scaleY;

    if (Number.isNaN(nearTimeY)) {
      nearTimeY = Infinity;
    }

    if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
      return null;
    }

    const nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
    const farTime = farTimeX < farTimeY ? farTimeX : farTimeY;
    if (nearTime >= 1 || farTime <= 0) {
      return null;
    }

    const hit = new Hit(this);
    hit.time = clamp(nearTime, 0, 1);
    if (nearTimeX > nearTimeY) {
      hit.normal.x = -signX;
      hit.normal.y = 0;
    } else {
      hit.normal.x = 0;
      hit.normal.y = -signY;
    }
    hit.delta.x = (1.0 - hit.time) * -delta.x;
    hit.delta.y = (1.0 - hit.time) * -delta.y;
    hit.pos.x = pos.x + delta.x * hit.time;
    hit.pos.y = pos.y + delta.y * hit.time;
    return hit;
  }

  public intersectAABB(box: AABB): Hit | null {
    const dx = box.pos.x - this.pos.x;
    const px = box.half.x + this.half.x - abs(dx);
    if (px <= 0) {
      return null;
    }

    const dy = box.pos.y - this.pos.y;
    const py = box.half.y + this.half.y - abs(dy);
    if (py <= 0) {
      return null;
    }

    const hit = new Hit(this);
    if (px < py) {
      const sx = sign(dx);
      hit.delta.x = px * sx;
      hit.normal.x = sx;
      hit.pos.x = this.pos.x + this.half.x * sx;
      hit.pos.y = box.pos.y;
    } else {
      const sy = sign(dy);
      hit.delta.y = py * sy;
      hit.normal.y = sy;
      hit.pos.x = box.pos.x;
      hit.pos.y = this.pos.y + this.half.y * sy;
    }
    return hit;
  }

  public sweepAABB(box: AABB, delta: Point): Sweep {
    const sweep = new Sweep();
    if (delta.x === 0 && delta.y === 0) {
      sweep.pos.x = box.pos.x;
      sweep.pos.y = box.pos.y;
      sweep.hit = this.intersectAABB(box);
      sweep.time = sweep.hit ? (sweep.hit.time = 0) : 1;
      return sweep;
    }

    sweep.hit = this.intersectSegment(box.pos, delta, box.half.x, box.half.y);
    if (sweep.hit) {
      sweep.time = clamp(sweep.hit.time - EPSILON, 0, 1);
      sweep.pos.x = box.pos.x + delta.x * sweep.time;
      sweep.pos.y = box.pos.y + delta.y * sweep.time;
      const direction = delta.clone();
      direction.normalize();
      sweep.hit.pos.x = clamp(
        sweep.hit.pos.x + direction.x * box.half.x,
        this.pos.x - this.half.x,
        this.pos.x + this.half.x
      );
      sweep.hit.pos.y = clamp(
        sweep.hit.pos.y + direction.y * box.half.y,
        this.pos.y - this.half.y,
        this.pos.y + this.half.y
      );
    } else {
      sweep.pos.x = box.pos.x + delta.x;
      sweep.pos.y = box.pos.y + delta.y;
      sweep.time = 1;
    }
    return sweep;
  }

  public sweepInto(staticColliders: Collider[], delta: Point): Sweep {
    let nearest = new Sweep();
    nearest.time = 1;
    nearest.pos.x = this.pos.x + delta.x;
    nearest.pos.y = this.pos.y + delta.y;
    for (let i = 0, il = staticColliders.length; i < il; i++) {
      const sweep = staticColliders[i].sweepAABB(this, delta);
      if (sweep.time < nearest.time) {
        nearest = sweep;
      }
    }
    return nearest;
  }
}
