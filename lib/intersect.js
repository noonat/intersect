"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capsule = exports.Circle = exports.AABB = exports.Sweep = exports.Hit = exports.Point = exports.EPSILON = void 0;
exports.abs = abs;
exports.clamp = clamp;
exports.sign = sign;
exports.EPSILON = 1e-8;
function abs(value) {
    return value < 0 ? -value : value;
}
function clamp(value, min, max) {
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    else {
        return value;
    }
}
function sign(value) {
    return value < 0 ? -1 : 1;
}
class Point {
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
            const inverseLength = 1.0 / length;
            this.x *= inverseLength;
            this.y *= inverseLength;
        }
        else {
            this.x = 1;
            this.y = 0;
        }
        return length;
    }
}
exports.Point = Point;
class Hit {
    constructor(collider) {
        this.collider = collider;
        this.pos = new Point();
        this.delta = new Point();
        this.normal = new Point();
        this.time = 0;
    }
}
exports.Hit = Hit;
class Sweep {
    constructor() {
        this.hit = null;
        this.pos = new Point();
        this.time = 1;
    }
}
exports.Sweep = Sweep;
class AABB {
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
        const hit = new Hit(this);
        if (px < py) {
            const sx = sign(dx);
            hit.delta.x = px * sx;
            hit.normal.x = sx;
            hit.pos.x = this.pos.x + this.half.x * sx;
            hit.pos.y = point.y;
        }
        else {
            const sy = sign(dy);
            hit.delta.y = py * sy;
            hit.normal.y = sy;
            hit.pos.x = point.x;
            hit.pos.y = this.pos.y + this.half.y * sy;
        }
        return hit;
    }
    intersectSegment(pos, delta, paddingX = 0, paddingY = 0) {
        const scaleX = 1.0 / delta.x;
        const scaleY = 1.0 / delta.y;
        const signX = sign(scaleX);
        const signY = sign(scaleY);
        let nearTimeX = (this.pos.x - signX * (this.half.x + paddingX) - pos.x) * scaleX;
        let nearTimeY = (this.pos.y - signY * (this.half.y + paddingY) - pos.y) * scaleY;
        let farTimeX = (this.pos.x + signX * (this.half.x + paddingX) - pos.x) * scaleX;
        let farTimeY = (this.pos.y + signY * (this.half.y + paddingY) - pos.y) * scaleY;
        if (delta.x === 0) {
            if (pos.x <= this.pos.x - (this.half.x + paddingX) ||
                pos.x >= this.pos.x + (this.half.x + paddingX)) {
                return null;
            }
            nearTimeX = -Infinity;
            farTimeX = Infinity;
        }
        if (delta.y === 0) {
            if (pos.y <= this.pos.y - (this.half.y + paddingY) ||
                pos.y >= this.pos.y + (this.half.y + paddingY)) {
                return null;
            }
            nearTimeY = -Infinity;
            farTimeY = Infinity;
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
        }
        else {
            hit.normal.x = 0;
            hit.normal.y = -signY;
        }
        hit.delta.x = (1.0 - hit.time) * -delta.x;
        hit.delta.y = (1.0 - hit.time) * -delta.y;
        hit.pos.x = pos.x + delta.x * hit.time;
        hit.pos.y = pos.y + delta.y * hit.time;
        return hit;
    }
    intersectAABB(box) {
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
        }
        else {
            const sy = sign(dy);
            hit.delta.y = py * sy;
            hit.normal.y = sy;
            hit.pos.x = box.pos.x;
            hit.pos.y = this.pos.y + this.half.y * sy;
        }
        return hit;
    }
    sweepAABB(box, delta) {
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
            sweep.time = clamp(sweep.hit.time - exports.EPSILON, 0, 1);
            sweep.pos.x = box.pos.x + delta.x * sweep.time;
            sweep.pos.y = box.pos.y + delta.y * sweep.time;
            const direction = delta.clone();
            direction.normalize();
            sweep.hit.pos.x = clamp(sweep.hit.pos.x + direction.x * box.half.x, this.pos.x - this.half.x, this.pos.x + this.half.x);
            sweep.hit.pos.y = clamp(sweep.hit.pos.y + direction.y * box.half.y, this.pos.y - this.half.y, this.pos.y + this.half.y);
        }
        else {
            sweep.pos.x = box.pos.x + delta.x;
            sweep.pos.y = box.pos.y + delta.y;
            sweep.time = 1;
        }
        return sweep;
    }
    intersectCircle(circle) {
        const nearestX = clamp(circle.pos.x, this.pos.x - this.half.x, this.pos.x + this.half.x);
        const nearestY = clamp(circle.pos.y, this.pos.y - this.half.y, this.pos.y + this.half.y);
        const dx = circle.pos.x - nearestX;
        const dy = circle.pos.y - nearestY;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared >= circle.radius * circle.radius) {
            return null;
        }
        const hit = new Hit(this);
        if (distanceSquared > 0) {
            const distance = Math.sqrt(distanceSquared);
            hit.normal.x = dx / distance;
            hit.normal.y = dy / distance;
            hit.pos.x = nearestX;
            hit.pos.y = nearestY;
            const overlap = circle.radius - distance;
            hit.delta.x = hit.normal.x * overlap;
            hit.delta.y = hit.normal.y * overlap;
        }
        else {
            const px = this.half.x - abs(circle.pos.x - this.pos.x);
            const py = this.half.y - abs(circle.pos.y - this.pos.y);
            if (px < py) {
                const sx = sign(circle.pos.x - this.pos.x);
                hit.normal.x = sx;
                hit.pos.x = this.pos.x + this.half.x * sx;
                hit.pos.y = circle.pos.y;
                hit.delta.x = (px + circle.radius) * sx;
            }
            else {
                const sy = sign(circle.pos.y - this.pos.y);
                hit.normal.y = sy;
                hit.pos.x = circle.pos.x;
                hit.pos.y = this.pos.y + this.half.y * sy;
                hit.delta.y = (py + circle.radius) * sy;
            }
        }
        return hit;
    }
    sweepCircle(circle, delta) {
        const sweep = new Sweep();
        if (delta.x === 0 && delta.y === 0) {
            sweep.pos.x = circle.pos.x;
            sweep.pos.y = circle.pos.y;
            sweep.hit = this.intersectCircle(circle);
            sweep.time = sweep.hit ? (sweep.hit.time = 0) : 1;
            return sweep;
        }
        let hit = this.intersectSegment(circle.pos, delta, circle.radius, circle.radius);
        if (hit) {
            const x = circle.pos.x + delta.x * hit.time;
            const y = circle.pos.y + delta.y * hit.time;
            const cornerX = clamp(x, this.pos.x - this.half.x, this.pos.x + this.half.x);
            const cornerY = clamp(y, this.pos.y - this.half.y, this.pos.y + this.half.y);
            if (cornerX !== x && cornerY !== y) {
                const corner = new Circle(new Point(cornerX, cornerY), circle.radius);
                hit = corner.intersectSegment(circle.pos, delta);
                if (hit) {
                    hit.collider = this;
                }
            }
        }
        if (hit) {
            sweep.time = clamp(hit.time - exports.EPSILON, 0, 1);
            sweep.pos.x = circle.pos.x + delta.x * sweep.time;
            sweep.pos.y = circle.pos.y + delta.y * sweep.time;
            hit.pos.x -= hit.normal.x * circle.radius;
            hit.pos.y -= hit.normal.y * circle.radius;
            sweep.hit = hit;
        }
        else {
            sweep.pos.x = circle.pos.x + delta.x;
            sweep.pos.y = circle.pos.y + delta.y;
        }
        return sweep;
    }
    sweepInto(staticColliders, delta) {
        let nearest = new Sweep();
        nearest.time = 1;
        nearest.pos.x = this.pos.x + delta.x;
        nearest.pos.y = this.pos.y + delta.y;
        for (const collider of staticColliders) {
            const sweep = collider.sweepAABB(this, delta);
            if (sweep.time < nearest.time) {
                nearest = sweep;
            }
        }
        return nearest;
    }
}
exports.AABB = AABB;
class Circle {
    constructor(pos, radius) {
        this.pos = pos;
        this.radius = radius;
    }
    intersectPoint(point, padding = 0) {
        const dx = point.x - this.pos.x;
        const dy = point.y - this.pos.y;
        const distanceSquared = dx * dx + dy * dy;
        const minDistance = this.radius + padding;
        if (distanceSquared >= minDistance * minDistance) {
            return null;
        }
        const hit = new Hit(this);
        hit.normal.x = dx;
        hit.normal.y = dy;
        hit.normal.normalize();
        hit.pos.x = this.pos.x + hit.normal.x * this.radius;
        hit.pos.y = this.pos.y + hit.normal.y * this.radius;
        hit.delta.x = hit.pos.x + hit.normal.x * padding - point.x;
        hit.delta.y = hit.pos.y + hit.normal.y * padding - point.y;
        return hit;
    }
    intersectSegment(pos, delta, padding = 0) {
        const r = this.radius + padding;
        const mx = pos.x - this.pos.x;
        const my = pos.y - this.pos.y;
        const dx = delta.x;
        const dy = delta.y;
        const a = dx * dx + dy * dy; // D . D
        const b = 2 * (mx * dx + my * dy); // 2(M . D)
        const c = mx * mx + my * my - r * r; // (M . M) - r^2
        const discriminant = b * b - 4 * a * c; // b^2 - 4ac
        if (discriminant < 0) {
            return null;
        }
        const root = Math.sqrt(discriminant);
        let time = (-b - root) / (2 * a);
        const exitTime = (-b + root) / (2 * a);
        if (time > 1 || exitTime <= 0) {
            return null;
        }
        time = clamp(time, 0, 1);
        const hit = new Hit(this);
        hit.normal.x = mx + time * dx;
        hit.normal.y = my + time * dy;
        hit.normal.normalize();
        hit.pos.x = pos.x + time * dx;
        hit.pos.y = pos.y + time * dy;
        hit.time = time;
        return hit;
    }
    intersectCircle(circle) {
        return this.intersectPoint(circle.pos, circle.radius);
    }
    sweepCircle(circle, delta) {
        const sweep = new Sweep();
        if (delta.x === 0 && delta.y === 0) {
            sweep.pos.x = circle.pos.x;
            sweep.pos.y = circle.pos.y;
            sweep.hit = this.intersectCircle(circle);
            if (sweep.hit) {
                sweep.time = sweep.hit.time = 0;
            }
            else {
                sweep.time = 1;
            }
            return sweep;
        }
        sweep.hit = this.intersectSegment(circle.pos, delta, circle.radius);
        if (sweep.hit) {
            sweep.time = clamp(sweep.hit.time - exports.EPSILON, 0, 1);
            sweep.pos.x = circle.pos.x + delta.x * sweep.time;
            sweep.pos.y = circle.pos.y + delta.y * sweep.time;
            sweep.hit.pos.x -= sweep.hit.normal.x * circle.radius;
            sweep.hit.pos.y -= sweep.hit.normal.y * circle.radius;
        }
        else {
            sweep.pos.x = circle.pos.x + delta.x;
            sweep.pos.y = circle.pos.y + delta.y;
        }
        return sweep;
    }
    intersectAABB(box) {
        let dx = clamp(this.pos.x, box.pos.x - box.half.x, box.pos.x + box.half.x);
        let dy = clamp(this.pos.y, box.pos.y - box.half.y, box.pos.y + box.half.y);
        dx -= this.pos.x;
        dy -= this.pos.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared >= this.radius * this.radius) {
            return null;
        }
        const hit = new Hit(this);
        hit.normal.x = box.pos.x - this.pos.x;
        hit.normal.y = box.pos.y - this.pos.y;
        hit.normal.normalize();
        hit.pos.x = this.pos.x + hit.normal.x * this.radius;
        hit.pos.y = this.pos.y + hit.normal.y * this.radius;
        let px;
        let py;
        if (abs(hit.normal.x) > abs(hit.normal.y)) {
            px = box.half.x * sign(hit.normal.x);
            py = (px * hit.normal.y) / hit.normal.x;
        }
        else {
            py = box.half.y * sign(hit.normal.y);
            px = (py * hit.normal.x) / hit.normal.y;
        }
        hit.delta.x = hit.pos.x + px - box.pos.x;
        hit.delta.y = hit.pos.y + py - box.pos.y;
        return hit;
    }
    sweepAABB(box, delta) {
        const rounded = new AABB(this.pos, box.half);
        const mover = new Circle(box.pos, this.radius);
        const sweep = rounded.sweepCircle(mover, delta);
        if (sweep.hit) {
            sweep.hit.collider = this;
            sweep.hit.pos.x = this.pos.x + sweep.hit.normal.x * this.radius;
            sweep.hit.pos.y = this.pos.y + sweep.hit.normal.y * this.radius;
        }
        return sweep;
    }
    sweepInto(staticColliders, delta) {
        let nearest = new Sweep();
        nearest.time = 1;
        nearest.pos.x = this.pos.x + delta.x;
        nearest.pos.y = this.pos.y + delta.y;
        for (const collider of staticColliders) {
            const sweep = collider.sweepCircle(this, delta);
            if (sweep.time < nearest.time) {
                nearest = sweep;
            }
        }
        return nearest;
    }
}
exports.Circle = Circle;
class Capsule {
    constructor(pos, delta, radius) {
        this.pos = pos;
        this.delta = delta;
        this.radius = radius;
        this.circle = new Circle(new Point(0, 0), 0);
    }
    intersectSegmentStart(pos, delta) {
        this.circle.pos.x = this.pos.x;
        this.circle.pos.y = this.pos.y;
        this.circle.radius = this.radius;
        return this.circle.intersectSegment(pos, delta);
    }
    intersectSegmentEnd(pos, delta) {
        this.circle.pos.x = this.pos.x + this.delta.x;
        this.circle.pos.y = this.pos.y + this.delta.y;
        this.circle.radius = this.radius;
        return this.circle.intersectSegment(pos, delta);
    }
    intersectSegment(pos, delta) {
        const mx = pos.x - this.pos.x;
        const my = pos.y - this.pos.y;
        const md = mx * this.delta.x + my * this.delta.y;
        const nd = delta.x * this.delta.x + delta.y * this.delta.y;
        if (md < 0 && md + nd < 0) {
            return this.intersectSegmentStart(pos, delta);
        }
        const dd = this.delta.x * this.delta.x + this.delta.y * this.delta.y;
        if (md > dd && md + nd > dd) {
            return this.intersectSegmentEnd(pos, delta);
        }
        const nn = delta.x * delta.x + delta.y * delta.y;
        const mn = mx * delta.x + my * delta.y;
        const a = dd * nn - nd * nd;
        const k = mx * mx + my * my - this.radius * this.radius;
        const c = dd * k - md * md;
        if (abs(a) < exports.EPSILON) {
            if (c > 0) {
                return null;
            }
            if (md < 0) {
                return this.intersectSegmentStart(pos, delta);
            }
            else if (md > dd) {
                return this.intersectSegmentEnd(pos, delta);
            }
            const center = new Point(this.pos.x + this.delta.x / 2, this.pos.y + this.delta.y / 2);
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
        const b = dd * mn - nd * md;
        const discriminant = b * b - a * c;
        if (discriminant < 0) {
            return null;
        }
        const time = (-b - Math.sqrt(discriminant)) / a;
        if (md + time * nd < 0) {
            return this.intersectSegmentStart(pos, delta);
        }
        else if (md + time * nd > dd) {
            return this.intersectSegmentEnd(pos, delta);
        }
        else if (time >= 0 && time <= 1) {
            const center = new Point(this.pos.x + this.delta.x / 2, this.pos.y + this.delta.y / 2);
            const normal = new Point(this.delta.x, this.delta.y);
            normal.normalize();
            const hit = new Hit(this);
            hit.time = time;
            hit.normal.x = (pos.x - center.x) * normal.y;
            hit.normal.y = (pos.y - center.y) * normal.x;
            hit.normal.normalize();
            hit.pos.x = pos.x + time * delta.x;
            hit.pos.y = pos.y + time * delta.y;
            hit.delta.x = 0; // FIXME
            hit.delta.y = 0;
            return hit;
        }
        return null;
    }
}
exports.Capsule = Capsule;
//# sourceMappingURL=intersect.js.map