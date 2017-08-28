'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.abs = abs;
exports.clamp = clamp;
exports.sign = sign;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EPSILON = exports.EPSILON = 1e-8;

function abs(value) {
  return value < 0 ? -value : value;
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

function sign(value) {
  return value < 0 ? -1 : 1;
}

var Point = exports.Point = function () {
  function Point() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: 'clone',
    value: function clone() {
      return new Point(this.x, this.y);
    }
  }, {
    key: 'normalize',
    value: function normalize() {
      var length = this.x * this.x + this.y * this.y;
      if (length > 0) {
        length = Math.sqrt(length);
        var inverseLength = 1.0 / length;
        this.x *= inverseLength;
        this.y *= inverseLength;
      } else {
        this.x = 1;
        this.y = 0;
      }
      return length;
    }
  }]);

  return Point;
}();

var Hit = exports.Hit = function Hit(collider) {
  _classCallCheck(this, Hit);

  this.collider = collider;
  this.pos = new Point();
  this.delta = new Point();
  this.normal = new Point();
};

var Sweep = exports.Sweep = function Sweep() {
  _classCallCheck(this, Sweep);

  this.hit = null;
  this.pos = new Point();
  this.time = 1;
};

var AABB = exports.AABB = function () {
  function AABB(pos, half) {
    _classCallCheck(this, AABB);

    this.pos = pos;
    this.half = half;
  }

  _createClass(AABB, [{
    key: 'intersectPoint',
    value: function intersectPoint(point) {
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
        hit.pos.x = this.pos.x + this.half.x * sx;
        hit.pos.y = point.y;
      } else {
        var sy = sign(dy);
        hit.delta.y = py * sy;
        hit.normal.y = sy;
        hit.pos.x = point.x;
        hit.pos.y = this.pos.y + this.half.y * sy;
      }
      return hit;
    }
  }, {
    key: 'intersectSegment',
    value: function intersectSegment(pos, delta) {
      var paddingX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var paddingY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

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
  }, {
    key: 'intersectAABB',
    value: function intersectAABB(box) {
      var dx = box.pos.x - this.pos.x;
      var px = box.half.x + this.half.x - abs(dx);
      if (px <= 0) {
        return null;
      }

      var dy = box.pos.y - this.pos.y;
      var py = box.half.y + this.half.y - abs(dy);
      if (py <= 0) {
        return null;
      }

      var hit = new Hit(this);
      if (px < py) {
        var sx = sign(dx);
        hit.delta.x = px * sx;
        hit.normal.x = sx;
        hit.pos.x = this.pos.x + this.half.x * sx;
        hit.pos.y = box.pos.y;
      } else {
        var sy = sign(dy);
        hit.delta.y = py * sy;
        hit.normal.y = sy;
        hit.pos.x = box.pos.x;
        hit.pos.y = this.pos.y + this.half.y * sy;
      }
      return hit;
    }
  }, {
    key: 'sweepAABB',
    value: function sweepAABB(box, delta) {
      var sweep = new Sweep();
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
        var direction = delta.clone();
        direction.normalize();
        sweep.hit.pos.x = clamp(sweep.hit.pos.x + direction.x * box.half.x, this.pos.x - this.half.x, this.pos.x + this.half.x);
        sweep.hit.pos.y = clamp(sweep.hit.pos.y + direction.y * box.half.y, this.pos.y - this.half.y, this.pos.y + this.half.y);
      } else {
        sweep.pos.x = box.pos.x + delta.x;
        sweep.pos.y = box.pos.y + delta.y;
        sweep.time = 1;
      }
      return sweep;
    }
  }, {
    key: 'sweepInto',
    value: function sweepInto(staticColliders, delta) {
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
    }
  }]);

  return AABB;
}();

var Circle = exports.Circle = function () {
  function Circle(pos, radius) {
    _classCallCheck(this, Circle);

    this.pos = pos;
    this.radius = radius;
  }

  _createClass(Circle, [{
    key: 'intersectPoint',
    value: function intersectPoint(point) {
      var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var dx = point.x - this.pos.x;
      var dy = point.y - this.pos.y;
      var distanceSquared = dx * dx + dy * dy;
      var minDistance = this.radius + padding;
      if (distanceSquared >= minDistance * minDistance) {
        return null;
      }
      var hit = new Hit(this);
      hit.normal.x = dx;
      hit.normal.y = dy;
      hit.normal.normalize();
      hit.pos.x = this.pos.x + hit.normal.x * this.radius;
      hit.pos.y = this.pos.y + hit.normal.y * this.radius;
      hit.delta.x = hit.pos.x + hit.normal.x * padding - point.x;
      hit.delta.y = hit.pos.y + hit.normal.y * padding - point.y;
      return hit;
    }
  }, {
    key: 'intersectSegment',
    value: function intersectSegment(pos, delta) {
      var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var r = this.radius + padding;
      var mx = pos.x - this.pos.x;
      var my = pos.y - this.pos.y;
      var dx = delta.x;
      var dy = delta.y;
      var a = dx * dx + dy * dy; // D . D
      var b = 2 * (mx * dx + my * dy); // 2(M . D)
      var c = mx * mx + my * my - r * r; // (M . M) - r^2
      var discr = b * b - 4 * a * c; // b^2 - 4ac
      if (discr < 0) {
        return null;
      }

      var time = (-b - Math.sqrt(discr)) / (2 * a);
      if (time > 1) {
        return null;
      }

      time = clamp(time, 0, 1);
      var hit = new Hit(this);
      hit.normal.x = mx + time * dx;
      hit.normal.y = my + time * dy;
      hit.normal.normalize();
      hit.pos.x = pos.x + time * dx;
      hit.pos.y = pos.y + time * dy;
      hit.time = time;
      return hit;
    }
  }, {
    key: 'intersectAABB',
    value: function intersectAABB(box) {
      var dx = clamp(this.pos.x, box.pos.x - box.half.x, box.pos.x + box.half.x);
      var dy = clamp(this.pos.y, box.pos.y - box.half.y, box.pos.y + box.half.y);
      dx -= this.pos.x;
      dy -= this.pos.y;
      var distanceSquared = dx * dx + dy * dy;
      if (distanceSquared >= this.radius * this.radius) {
        return null;
      }

      var hit = new Hit(this);
      hit.normal.x = box.pos.x - this.pos.x;
      hit.normal.y = box.pos.y - this.pos.y;
      hit.normal.normalize();
      hit.pos.x = this.pos.x + hit.normal.x * this.radius;
      hit.pos.y = this.pos.y + hit.normal.y * this.radius;
      var px = void 0,
          py = void 0;
      if (abs(hit.normal.x) > abs(hit.normal.y)) {
        px = box.half.x * sign(hit.normal.x);
        py = px * hit.normal.y / hit.normal.x;
      } else {
        py = box.half.y * sign(hit.normal.y);
        px = py * hit.normal.x / hit.normal.y;
      }
      hit.delta.x = hit.pos.x + px - box.pos.x;
      hit.delta.y = hit.pos.y + py - box.pos.y;
      return hit;
    }
  }, {
    key: 'intersectCircle',
    value: function intersectCircle(circle) {
      return this.intersectPoint(circle.pos, circle.radius);
    }
  }, {
    key: 'sweepCircle',
    value: function sweepCircle(circle, delta) {
      var sweep = new Sweep();
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
  }]);

  return Circle;
}();
//# sourceMappingURL=intersect.js.map