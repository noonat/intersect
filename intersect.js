'use strict';

export const EPSILON = 1e-8;

export function abs(value) {
  return value < 0 ? -value : value;
}

export function clamp(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

export function sign(value) {
  return value < 0 ? -1 : 1;
}

export class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  normalize() {
    let length = this.x * this.x + this.y * this.y;
    if (length > 0) {
      length = Math.sqrt(length);
      let inverseLength = 1.0 / length;
      this.x *= inverseLength;
      this.y *= inverseLength;
    } else {
      this.x = 1;
      this.y = 0;
    }
    return length;
  }
}

export class Hit {
  constructor(collider) {
    this.collider = collider;
    this.pos = new Point();
    this.delta = new Point();
    this.normal = new Point();
  }
}

export class Sweep {
  constructor() {
    this.hit = null;
    this.pos = new Point();
    this.time = 1;
  }
}

export class AABB {
  constructor(pos, half) {
    this.pos = pos;
    this.half = half;
  }

  intersectPoint(point) {
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

    let hit = new Hit(this);
    if (px < py) {
      const sx = sign(dx);
      hit.delta.x = px * sx;
      hit.normal.x = sx;
      hit.pos.x = this.pos.x + (this.half.x * sx);
      hit.pos.y = point.y;
    } else {
      const sy = sign(dy);
      hit.delta.y = py * sy;
      hit.normal.y = sy;
      hit.pos.x = point.x;
      hit.pos.y = this.pos.y + (this.half.y * sy);
    }
    return hit;
  }

  intersectSegment(pos, delta, paddingX = 0, paddingY = 0) {
    let scaleX = 1.0 / delta.x;
    let scaleY = 1.0 / delta.y;
    let signX = sign(scaleX);
    let signY = sign(scaleY);
    let nearTimeX = (this.pos.x - signX * (this.half.x + paddingX) - pos.x) * scaleX;
    let nearTimeY = (this.pos.y - signY * (this.half.y + paddingY) - pos.y) * scaleY;
    let farTimeX = (this.pos.x + signX * (this.half.x + paddingX) - pos.x) * scaleX;
    let farTimeY = (this.pos.y + signY * (this.half.y + paddingY) - pos.y) * scaleY;
    if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
      return null;
    }

    let nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
    let farTime = farTimeX < farTimeY ? farTimeX : farTimeY;
    if (nearTime >= 1 || farTime <= 0) {
      return null;
    }

    let hit = new Hit(this);
    hit.time = clamp(nearTime, 0, 1);
    if (nearTimeX > nearTimeY) {
      hit.normal.x = -signX;
      hit.normal.y = 0;
    } else {
      hit.normal.x = 0;
      hit.normal.y = -signY;
    }
    hit.delta.x = hit.time * delta.x;
    hit.delta.y = hit.time * delta.y;
    hit.pos.x = pos.x + hit.delta.x;
    hit.pos.y = pos.y + hit.delta.y;
    return hit;
  }

  intersectAABB(box) {
    let dx = box.pos.x - this.pos.x;
    let px = (box.half.x + this.half.x) - abs(dx);
    if (px <= 0) {
      return null;
    }

    let dy = box.pos.y - this.pos.y;
    let py = (box.half.y + this.half.y) - abs(dy);
    if (py <= 0) {
      return null;
    }

    let hit = new Hit(this);
    if (px < py) {
      let sx = sign(dx);
      hit.delta.x = px * sx;
      hit.normal.x = sx;
      hit.pos.x = this.pos.x + (this.half.x * sx);
      hit.pos.y = box.pos.y;
    } else {
      let sy = sign(dy);
      hit.delta.y = py * sy;
      hit.normal.y = sy;
      hit.pos.x = box.pos.x;
      hit.pos.y = this.pos.y + (this.half.y * sy);
    }
    return hit;
  }

  sweepAABB(box, delta) {
    let sweep = new Sweep();
    if (delta.x === 0 && delta.y === 0) {
      sweep.pos.x = box.pos.x;
      sweep.pos.y = box.pos.y;
      sweep.hit = this.intersectAABB(box);
      if (sweep.hit) {
        sweep.time = sweep.hit.time = 0;
      } else {
        sweep.time = 1;
      }
      return sweep;
    }

    sweep.hit = this.intersectSegment(box.pos, delta, box.half.x, box.half.y);
    if (sweep.hit) {
      sweep.time = clamp(sweep.hit.time - EPSILON, 0, 1);
      sweep.pos.x = box.pos.x + delta.x * sweep.time;
      sweep.pos.y = box.pos.y + delta.y * sweep.time;
      let direction = delta.clone();
      direction.normalize();
      sweep.hit.pos.x = clamp(
        sweep.hit.pos.x + direction.x * box.half.x,
        this.pos.x - this.half.x,
        this.pos.x + this.half.x);
      sweep.hit.pos.y = clamp(
        sweep.hit.pos.y + direction.y * box.half.y,
        this.pos.y - this.half.y,
        this.pos.y + this.half.y);
    } else {
      sweep.pos.x = box.pos.x + delta.x;
      sweep.pos.y = box.pos.y + delta.y;
      sweep.time = 1;
    }
    return sweep;
  }

  sweepInto(staticColliders, delta) {
    let nearest = new Sweep();
    nearest.time = 1;
    nearest.pos.x = this.pos.x + delta.x;
    nearest.pos.y = this.pos.y + delta.y;
    for (let i = 0, il = staticColliders.length; i < il; i++) {
      let sweep = staticColliders[i].sweepAABB(this, delta);
      if (sweep.time < nearest.time) {
        nearest = sweep;
      }
    }
    return nearest;
  }
}

export class Circle {
  constructor(pos, radius) {
    this.pos = pos;
    this.radius = radius;
  }

  intersectPoint(point, padding=0) {
    let dx = point.x - this.pos.x;
    let dy = point.y - this.pos.y;
    let distanceSquared = dx * dx + dy * dy;
    let minDistance = this.radius + padding;
    if (distanceSquared >= (minDistance * minDistance)) {
      return null;
    }
    let hit = new Hit(this);
    hit.normal.x = dx;
    hit.normal.y = dy;
    hit.normal.normalize();
    hit.pos.x = this.pos.x + hit.normal.x * this.radius;
    hit.pos.y = this.pos.y + hit.normal.y * this.radius;
    hit.delta.x = (hit.pos.x + hit.normal.x * padding) - point.x;
    hit.delta.y = (hit.pos.y + hit.normal.y * padding) - point.y;
    return hit;
  }

  intersectSegment(pos, delta, padding=0) {
    let r = this.radius + padding;
    let mx = pos.x - this.pos.x;
    let my = pos.y - this.pos.y;
    let dx = delta.x;
    let dy = delta.y;
    let a = dx * dx + dy * dy;              // D . D
    let b = 2 * (mx * dx + my * dy);        // 2(M . D)
    let c = (mx * mx + my * my) - (r * r);  // (M . M) - r^2
    let discr = (b * b) - (4 * a * c);      // b^2 - 4ac
    if (discr < 0) {
      return null;
    }

    let time = (-b - Math.sqrt(discr)) / (2 * a);
    if (time > 1) {
      return null;
    }

    time = clamp(time, 0, 1);
    let hit = new Hit(this);
    hit.normal.x = mx + time * dx;
    hit.normal.y = my + time * dy;
    hit.normal.normalize();
    hit.pos.x = pos.x + time * dx;
    hit.pos.y = pos.y + time * dy;
    hit.time = time;
    return hit;
  }

  intersectAABB(box) {
    let dx = clamp(this.pos.x, box.pos.x - box.half.x, box.pos.x + box.half.x);
    let dy = clamp(this.pos.y, box.pos.y - box.half.y, box.pos.y + box.half.y);
    dx -= this.pos.x;
    dy -= this.pos.y;
    let distanceSquared = dx * dx + dy * dy;
    if (distanceSquared >= this.radius * this.radius) {
      return null;
    }

    let hit = new Hit(this);
    hit.normal.x = box.pos.x - this.pos.x;
    hit.normal.y = box.pos.y - this.pos.y;
    hit.normal.normalize();
    hit.pos.x = this.pos.x + (hit.normal.x * this.radius);
    hit.pos.y = this.pos.y + (hit.normal.y * this.radius);
    let px, py;
    if (abs(hit.normal.x) > abs(hit.normal.y)) {
      px = box.half.x * sign(hit.normal.x);
      py = px * (hit.normal.y) / hit.normal.x;
    } else {
      py = box.half.y * sign(hit.normal.y);
      px = (py * hit.normal.x) / hit.normal.y;
    }
    hit.delta.x = (hit.pos.x + px) - box.pos.x;
    hit.delta.y = (hit.pos.y + py) - box.pos.y;
    return hit;
  }

  intersectCircle(circle) {
    return this.intersectPoint(circle.pos, circle.radius);
  }

  sweepCircle(circle, delta) {
    let sweep = new Sweep();
    if (delta.x === 0 && delta.y === 0) {
      sweep.pos.x = circle.pos.x;
      sweep.pos.y = circle.pos.y;
      sweep.hit = this.intersectCircle(circle);
      if (sweep.hit) {
        sweep.time = sweep.hit.time = 0;
      } else {
        sweep.time = 1;
      }
      return sweep;
    }
    sweep.hit = this.intersectSegment(circle.pos, delta, circle.radius);
    if (sweep.hit) {
      sweep.time = clamp(sweep.hit.time - EPSILON, 0, 1);
      sweep.pos.x = circle.pos.x + delta.x * sweep.time;
      sweep.pos.y = circle.pos.y + delta.y * sweep.time;
      sweep.hit.pos.x -= sweep.hit.normal.x * circle.radius;
      sweep.hit.pos.y -= sweep.hit.normal.y * circle.radius;
    } else {
      sweep.pos.x = circle.pos.x + delta.x;
      sweep.pos.y = circle.pos.y + delta.y;
    }
    return sweep;
  }
}

export class Capsule {
  constructor(pos, delta, radius) {
    this.pos = pos;
    this.delta = delta;
    this.radius = radius;
    this._circle = new Circle(new Point(0, 0), 0);
  }

  _intersectSegmentCircle1(pos, delta) {
    this._circle.pos.x = this.pos.x;
    this._circle.pos.y = this.pos.y;
    this._circle.radius = this.radius;
    return this._circle.intersectSegment(pos, delta);
  }

  _intersectSegmentCircle2(pos, delta) {
    this._circle.pos.x = this.pos.x + this.delta.x;
    this._circle.pos.y = this.pos.y + this.delta.y;
    this._circle.radius = this.radius;
    return this._circle.intersectSegment(pos, delta);
  }

  intersectSegment(pos, delta) {
    const mx = pos.x - this.pos.x;
    const my = pos.y - this.pos.y;
    const md = mx * this.delta.x + my * this.delta.y;
    const nd = delta.x * this.delta.x + delta.y * this.delta.y;
    if (md < 0 && md + nd < 0) {
      // Segment is outside the start end of the capsule's box.
      // Intersect it with the circle at that end of the capsule.
      return this._intersectSegmentCircle1(pos, delta);
    }
    const dd = this.delta.x * this.delta.x + this.delta.y * this.delta.y;
    if (md > dd && md + nd > dd) {
      // Segment is outside the other end of the capsule's box.
      // Intersect it with the circle at that end of the capsule.
      return this._intersectSegmentCircle2(pos, delta);
    }
    const nn = delta.x * delta.x + delta.y * delta.y;
    const mn = mx * delta.x + my * delta.y;
    const a = dd * nn - nd * nd;
    const k = (mx * mx + my * my) - (this.radius * this.radius);
    const c = (dd * k) - (md * md);
    if (abs(a) < EPSILON) {
      // Segment runs parallel to the capsule axis
      if (c > 0) {
        // 'a' and thus the segment lie outside the capsule.
        return null;
      }
      // Segment intersects the capsule. Figure out how.
      if (md < 0) {
        return this._intersectSegmentCircle1(pos, delta);
      } else if (md > dd) {
        return this._intersectSegmentCircle2(pos, delta);
      }
      const center = new Point(this.pos.x + this.delta.x / 2,
                               this.pos.y + this.delta.y / 2);
      const normal = new Point(this.delta.x, this.delta.y);
      normal.normalize();
      const hit = new Hit(this);
      hit.time = 0;
      hit.normal.x = (pos.x - center.x) * normal.y;
      hit.normal.y = (pos.y - center.y) * normal.x;
      hit.normal.normalize();
      hit.pos.x = pos.x;
      hit.pos.y = pos.y;
      hit.delta.x = 0;
      hit.delta.y = 0;
      return hit;
    }

    const b = (dd * mn) - (nd * md);
    const discr = (b * b) - (a * c);
    if (discr < 0) {
      // No real roots; no intersection.
      return null;
    }

    const time = (-b - Math.sqrt(discr)) / a;
    if (md + time * nd < 0) {
      return this._intersectSegmentCircle1(pos, delta);
    } else if (md + time * nd > dd) {
      return this._intersectSegmentCircle2(pos, delta);
    } else if (time >= 0 && time <= 1) {
      const center = new Point(this.pos.x + this.delta.x / 2,
                               this.pos.y + this.delta.y / 2);
      const normal = new Point(this.delta.x, this.delta.y);
      normal.normalize();
      const hit = new Hit(this);
      hit.time = time;
      hit.normal.x = (pos.x - center.x) * normal.y;
      hit.normal.y = (pos.y - center.y) * normal.x;
      hit.normal.normalize();
      hit.pos.x = pos.x + time * delta.x;
      hit.pos.y = pos.y + time * delta.y;
      hit.delta.x = 0;  // FIXME
      hit.delta.y = 0;
      return hit;
    }
    return null;
  }
}
