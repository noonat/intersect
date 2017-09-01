"use strict";
exports.__esModule = true;
exports.EPSILON = 1e-8;
function abs(value) {
    return value < 0 ? -value : value;
}
exports.abs = abs;
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
exports.clamp = clamp;
function sign(value) {
    return value < 0 ? -1 : 1;
}
exports.sign = sign;
var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.normalize = function () {
        var length = this.x * this.x + this.y * this.y;
        if (length > 0) {
            length = Math.sqrt(length);
            var inverseLength = 1.0 / length;
            this.x *= inverseLength;
            this.y *= inverseLength;
        }
        else {
            this.x = 1;
            this.y = 0;
        }
        return length;
    };
    return Point;
}());
exports.Point = Point;
var Hit = (function () {
    function Hit(collider) {
        this.collider = collider;
        this.pos = new Point();
        this.delta = new Point();
        this.normal = new Point();
        this.time = 0;
    }
    return Hit;
}());
exports.Hit = Hit;
var Sweep = (function () {
    function Sweep() {
        this.hit = null;
        this.pos = new Point();
        this.time = 1;
    }
    return Sweep;
}());
exports.Sweep = Sweep;
var AABB = (function () {
    function AABB(pos, half) {
        this.pos = pos;
        this.half = half;
    }
    AABB.prototype.intersectPoint = function (point) {
        var dx = point.x - this.pos.x;
        var px = this.half.x - abs(dx);
        if (px <= 0) {
            return null;
        }
        var dy = point.y - this.pos.y;
        var py = this.half.y - abs(dy);
        if (py <= 0) {
            return null;
        }
        var hit = new Hit(this);
        if (px < py) {
            var sx = sign(dx);
            hit.delta.x = px * sx;
            hit.normal.x = sx;
            hit.pos.x = this.pos.x + (this.half.x * sx);
            hit.pos.y = point.y;
        }
        else {
            var sy = sign(dy);
            hit.delta.y = py * sy;
            hit.normal.y = sy;
            hit.pos.x = point.x;
            hit.pos.y = this.pos.y + (this.half.y * sy);
        }
        return hit;
    };
    AABB.prototype.intersectSegment = function (pos, delta, paddingX, paddingY) {
        if (paddingX === void 0) { paddingX = 0; }
        if (paddingY === void 0) { paddingY = 0; }
        var scaleX = 1.0 / delta.x;
        var scaleY = 1.0 / delta.y;
        var signX = sign(scaleX);
        var signY = sign(scaleY);
        var nearTimeX = (this.pos.x - signX * (this.half.x + paddingX) - pos.x) * scaleX;
        var nearTimeY = (this.pos.y - signY * (this.half.y + paddingY) - pos.y) * scaleY;
        var farTimeX = (this.pos.x + signX * (this.half.x + paddingX) - pos.x) * scaleX;
        var farTimeY = (this.pos.y + signY * (this.half.y + paddingY) - pos.y) * scaleY;
        if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
            return null;
        }
        var nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
        var farTime = farTimeX < farTimeY ? farTimeX : farTimeY;
        if (nearTime >= 1 || farTime <= 0) {
            return null;
        }
        var hit = new Hit(this);
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
    };
    AABB.prototype.intersectAABB = function (box) {
        var dx = box.pos.x - this.pos.x;
        var px = (box.half.x + this.half.x) - abs(dx);
        if (px <= 0) {
            return null;
        }
        var dy = box.pos.y - this.pos.y;
        var py = (box.half.y + this.half.y) - abs(dy);
        if (py <= 0) {
            return null;
        }
        var hit = new Hit(this);
        if (px < py) {
            var sx = sign(dx);
            hit.delta.x = px * sx;
            hit.normal.x = sx;
            hit.pos.x = this.pos.x + (this.half.x * sx);
            hit.pos.y = box.pos.y;
        }
        else {
            var sy = sign(dy);
            hit.delta.y = py * sy;
            hit.normal.y = sy;
            hit.pos.x = box.pos.x;
            hit.pos.y = this.pos.y + (this.half.y * sy);
        }
        return hit;
    };
    AABB.prototype.sweepAABB = function (box, delta) {
        var sweep = new Sweep();
        if (delta.x === 0 && delta.y === 0) {
            sweep.pos.x = box.pos.x;
            sweep.pos.y = box.pos.y;
            sweep.hit = this.intersectAABB(box);
            if (sweep.hit) {
                sweep.time = sweep.hit.time = 0;
            }
            else {
                sweep.time = 1;
            }
            return sweep;
        }
        sweep.hit = this.intersectSegment(box.pos, delta, box.half.x, box.half.y);
        if (sweep.hit) {
            sweep.time = clamp(sweep.hit.time - exports.EPSILON, 0, 1);
            sweep.pos.x = box.pos.x + delta.x * sweep.time;
            sweep.pos.y = box.pos.y + delta.y * sweep.time;
            var direction = delta.clone();
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
    };
    AABB.prototype.sweepInto = function (staticColliders, delta) {
        var nearest = new Sweep();
        nearest.time = 1;
        nearest.pos.x = this.pos.x + delta.x;
        nearest.pos.y = this.pos.y + delta.y;
        for (var i = 0, il = staticColliders.length; i < il; i++) {
            var sweep = staticColliders[i].sweepAABB(this, delta);
            if (sweep.time < nearest.time) {
                nearest = sweep;
            }
        }
        return nearest;
    };
    return AABB;
}());
exports.AABB = AABB;
//# sourceMappingURL=intersect.js.map