/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var intersect_ts_1 = __webpack_require__(1);
function reflect(velocity, normal, out) {
    var dot = velocity.x * normal.x + velocity.y * normal.y;
    var ux = normal.x * dot;
    var uy = normal.y * dot;
    var wx = velocity.x - ux;
    var wy = velocity.y - uy;
    out.x = wx - ux;
    out.y = wy - uy;
}
var Example = /** @class */ (function () {
    function Example(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.origin = new intersect_ts_1.Point(this.width * 0.5, this.height * 0.5);
        this.infiniteLength = Math.sqrt(this.width * this.width + this.height * this.height);
    }
    Example.prototype.drawAABB = function (box, color, thickness) {
        if (color === void 0) { color = "#fff"; }
        if (thickness === void 0) { thickness = 1; }
        var x1 = Math.floor(this.origin.x + box.pos.x - box.half.x);
        var y1 = Math.floor(this.origin.y + box.pos.y - box.half.y);
        var x2 = Math.floor(this.origin.x + box.pos.x + box.half.x);
        var y2 = Math.floor(this.origin.y + box.pos.y + box.half.y);
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
    };
    Example.prototype.drawCircle = function (circle, color, thickness) {
        if (color === void 0) { color = "#fff"; }
        if (thickness === void 0) { thickness = 1; }
        var x = Math.floor(this.origin.x + circle.pos.x);
        var y = Math.floor(this.origin.y + circle.pos.y);
        this.context.beginPath();
        this.context.arc(x, y, circle.radius, 0, 2 * Math.PI, true);
        this.context.closePath();
        this.context.lineWidth = thickness;
        this.context.strokeStyle = color;
        this.context.stroke();
    };
    Example.prototype.drawPoint = function (point, color, text, thickness) {
        if (color === void 0) { color = "#fff"; }
        if (text === void 0) { text = ""; }
        if (thickness === void 0) { thickness = 1; }
        var x = Math.floor(this.origin.x + point.x - (thickness / 2));
        var y = Math.floor(this.origin.y + point.y - (thickness / 2));
        this.context.lineWidth = thickness;
        this.context.fillStyle = color;
        this.context.strokeStyle = color;
        this.context.fillRect(x, y, thickness, thickness);
        this.context.strokeRect(x, y, thickness, thickness);
        if (text) {
            this.context.fillText(text, x + thickness * 4, y + thickness * 2);
        }
    };
    Example.prototype.drawRay = function (pos, dir, length, color, arrow, thickness) {
        if (color === void 0) { color = "#fff"; }
        if (arrow === void 0) { arrow = true; }
        if (thickness === void 0) { thickness = 1; }
        var pos2 = new intersect_ts_1.Point(pos.x + dir.x * length, pos.y + dir.y * length);
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
    };
    Example.prototype.drawSegment = function (point1, point2, color, thickness) {
        if (color === void 0) { color = "#fff"; }
        if (thickness === void 0) { thickness = 1; }
        var x1 = Math.floor(this.origin.x + point1.x);
        var y1 = Math.floor(this.origin.y + point1.y);
        var x2 = Math.floor(this.origin.x + point2.x);
        var y2 = Math.floor(this.origin.y + point2.y);
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.closePath();
        this.context.lineWidth = thickness;
        this.context.strokeStyle = color;
        this.context.stroke();
    };
    Example.prototype.tick = function (elapsed) {
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.width, this.height);
    };
    return Example;
}());
var AABBPointExample = /** @class */ (function (_super) {
    __extends(AABBPointExample, _super);
    function AABBPointExample(context, width, height) {
        var _this = _super.call(this, context, width, height) || this;
        _this.angle = 0;
        _this.pos = new intersect_ts_1.Point();
        _this.box = new intersect_ts_1.AABB(new intersect_ts_1.Point(0, 0), new intersect_ts_1.Point(16, 16));
        return _this;
    }
    AABBPointExample.prototype.tick = function (elapsed) {
        _super.prototype.tick.call(this, elapsed);
        this.angle += 0.5 * Math.PI * elapsed;
        this.pos.x = Math.cos(this.angle * 0.4) * 32;
        this.pos.y = Math.sin(this.angle) * 12;
        var hit = this.box.intersectPoint(this.pos);
        this.drawAABB(this.box, "#666");
        if (hit) {
            this.drawPoint(this.pos, "#f00");
            this.drawPoint(hit.pos, "#ff0");
        }
        else {
            this.drawPoint(this.pos, "#0f0");
        }
    };
    return AABBPointExample;
}(Example));
var AABBSegmentExample = /** @class */ (function (_super) {
    __extends(AABBSegmentExample, _super);
    function AABBSegmentExample(context, width, height) {
        var _this = _super.call(this, context, width, height) || this;
        _this.angle = 0;
        _this.box = new intersect_ts_1.AABB(new intersect_ts_1.Point(0, 0), new intersect_ts_1.Point(16, 16));
        return _this;
    }
    AABBSegmentExample.prototype.tick = function (elapsed) {
        _super.prototype.tick.call(this, elapsed);
        this.angle += 0.5 * Math.PI * elapsed;
        var pos1 = new intersect_ts_1.Point(Math.cos(this.angle) * 64, Math.sin(this.angle) * 64);
        var pos2 = new intersect_ts_1.Point(Math.sin(this.angle) * 32, Math.cos(this.angle) * 32);
        var delta = new intersect_ts_1.Point(pos2.x - pos1.x, pos2.y - pos1.y);
        var hit = this.box.intersectSegment(pos1, delta);
        var dir = delta.clone();
        var length = dir.normalize();
        this.drawAABB(this.box, "#666");
        if (hit) {
            this.drawRay(pos1, dir, length, "#f00");
            this.drawSegment(pos1, hit.pos, "#ff0");
            this.drawPoint(hit.pos, "#ff0");
            this.drawRay(hit.pos, hit.normal, 6, "#ff0", false);
        }
        else {
            this.drawRay(pos1, dir, length, "#0f0");
        }
    };
    return AABBSegmentExample;
}(Example));
var AABBAABBExample = /** @class */ (function (_super) {
    __extends(AABBAABBExample, _super);
    function AABBAABBExample(context, width, height) {
        var _this = _super.call(this, context, width, height) || this;
        _this.angle = 0;
        _this.box1 = new intersect_ts_1.AABB(new intersect_ts_1.Point(0, 0), new intersect_ts_1.Point(64, 16));
        _this.box2 = new intersect_ts_1.AABB(new intersect_ts_1.Point(0, 0), new intersect_ts_1.Point(16, 16));
        return _this;
    }
    AABBAABBExample.prototype.tick = function (elapsed) {
        _super.prototype.tick.call(this, elapsed);
        this.angle += 0.2 * Math.PI * elapsed;
        this.box2.pos.x = Math.cos(this.angle) * 96;
        this.box2.pos.y = Math.sin(this.angle * 2.4) * 24;
        var hit = this.box1.intersectAABB(this.box2);
        this.drawAABB(this.box1, "#666");
        if (hit) {
            this.drawAABB(this.box2, "#f00");
            this.box2.pos.x += hit.delta.x;
            this.box2.pos.y += hit.delta.y;
            this.drawAABB(this.box2, "#ff0");
            this.drawPoint(hit.pos, "#ff0");
            this.drawRay(hit.pos, hit.normal, 4, "#ff0", false);
        }
        else {
            this.drawAABB(this.box2, "#0f0");
        }
    };
    return AABBAABBExample;
}(Example));
var AABBSweptAABBExample = /** @class */ (function (_super) {
    __extends(AABBSweptAABBExample, _super);
    function AABBSweptAABBExample(context, width, height) {
        var _this = _super.call(this, context, width, height) || this;
        _this.angle = 0;
        _this.staticBox = new intersect_ts_1.AABB(new intersect_ts_1.Point(0, 0), new intersect_ts_1.Point(112, 16));
        _this.sweepBoxes = [
            new intersect_ts_1.AABB(new intersect_ts_1.Point(-152, 24), new intersect_ts_1.Point(16, 16)),
            new intersect_ts_1.AABB(new intersect_ts_1.Point(128, -48), new intersect_ts_1.Point(16, 16)),
        ];
        _this.sweepDeltas = [
            new intersect_ts_1.Point(64, -12),
            new intersect_ts_1.Point(-32, 96),
        ];
        _this.tempBox = new intersect_ts_1.AABB(new intersect_ts_1.Point(0, 0), new intersect_ts_1.Point(16, 16));
        return _this;
    }
    AABBSweptAABBExample.prototype.tick = function (elapsed) {
        var _this = this;
        _super.prototype.tick.call(this, elapsed);
        this.angle += 0.5 * Math.PI * elapsed;
        this.drawAABB(this.staticBox, "#666");
        var factor = ((Math.cos(this.angle) + 1) * 0.5) || 1e-8;
        this.sweepBoxes.forEach(function (box, i) {
            var delta = _this.sweepDeltas[i].clone();
            delta.x *= factor;
            delta.y *= factor;
            var sweep = _this.staticBox.sweepAABB(box, delta);
            var dir = delta.clone();
            var length = dir.normalize();
            _this.drawAABB(box, "#666");
            if (sweep.hit) {
                // Draw a red box at the point where it was trying to move to
                _this.drawRay(box.pos, dir, length, "#f00");
                _this.tempBox.pos.x = box.pos.x + delta.x;
                _this.tempBox.pos.y = box.pos.y + delta.y;
                _this.drawAABB(_this.tempBox, "#f00");
                // Draw a yellow box at the point it actually got to
                _this.tempBox.pos.x = sweep.pos.x;
                _this.tempBox.pos.y = sweep.pos.y;
                _this.drawAABB(_this.tempBox, "#ff0");
                _this.drawPoint(sweep.hit.pos, "#ff0");
                _this.drawRay(sweep.hit.pos, sweep.hit.normal, 4, "#ff0", false);
            }
            else {
                _this.tempBox.pos.x = sweep.pos.x;
                _this.tempBox.pos.y = sweep.pos.y;
                _this.drawAABB(_this.tempBox, "#0f0");
                _this.drawRay(box.pos, dir, length, "#0f0");
            }
        });
    };
    return AABBSweptAABBExample;
}(Example));
var MultipleAABBSweptAABBExample = /** @class */ (function (_super) {
    __extends(MultipleAABBSweptAABBExample, _super);
    function MultipleAABBSweptAABBExample(context, width, height) {
        var _this = _super.call(this, context, width, height) || this;
        _this.delta = new intersect_ts_1.Point();
        _this.velocity = new intersect_ts_1.Point(48, 48);
        _this.movingBox = new intersect_ts_1.AABB(new intersect_ts_1.Point(0, 0), new intersect_ts_1.Point(8, 8));
        _this.staticBoxes = [
            new intersect_ts_1.AABB(new intersect_ts_1.Point(-96, 0), new intersect_ts_1.Point(8, 48)),
            new intersect_ts_1.AABB(new intersect_ts_1.Point(96, 0), new intersect_ts_1.Point(8, 48)),
            new intersect_ts_1.AABB(new intersect_ts_1.Point(0, -56), new intersect_ts_1.Point(104, 8)),
            new intersect_ts_1.AABB(new intersect_ts_1.Point(0, 56), new intersect_ts_1.Point(104, 8)),
        ];
        return _this;
    }
    MultipleAABBSweptAABBExample.prototype.tick = function (elapsed) {
        var _this = this;
        _super.prototype.tick.call(this, elapsed);
        this.delta.x = this.velocity.x * elapsed;
        this.delta.y = this.velocity.y * elapsed;
        var sweep = this.movingBox.sweepInto(this.staticBoxes, this.delta);
        if (sweep.hit) {
            // This should really attempt to slide along the hit normal, and use up
            // the rest of the velocity, but that"s a bit much for this example
            reflect(this.velocity, sweep.hit.normal, this.velocity);
        }
        this.staticBoxes.forEach(function (staticBox) {
            if (sweep.hit && sweep.hit.collider === staticBox) {
                _this.drawAABB(staticBox, "#aaa");
            }
            else {
                _this.drawAABB(staticBox, "#666");
            }
        });
        this.movingBox.pos = sweep.pos;
        this.drawAABB(this.movingBox, sweep.hit ? "#ff0" : "#0f0");
    };
    return MultipleAABBSweptAABBExample;
}(Example));
function ready(callback) {
    if (document.readyState === "complete") {
        setTimeout(callback, 1);
        return;
    }
    document.addEventListener("DOMContentLoaded", function handler() {
        document.removeEventListener("DOMContentLoaded", handler, false);
        callback();
    }, false);
}
ready(function () {
    var exampleIds = {
        "aabb-vs-aabb": AABBAABBExample,
        "aabb-vs-point": AABBPointExample,
        "aabb-vs-segment": AABBSegmentExample,
        "aabb-vs-swept-aabb": AABBSweptAABBExample,
        "sweeping-an-aabb-through-multiple-objects": MultipleAABBSweptAABBExample
    };
    var examples = [];
    Object.keys(exampleIds).forEach(function (id) {
        var exampleConstructor = exampleIds[id];
        var anchor = document.getElementById(id);
        if (!anchor || !anchor.parentNode) {
            return;
        }
        var canvas = document.createElement("canvas");
        if (!canvas) {
            return;
        }
        anchor.parentNode.insertBefore(canvas, anchor.nextSibling);
        var width = canvas.width = 640;
        var height = canvas.height = 160;
        var context = canvas.getContext("2d");
        if (!context) {
            return;
        }
        context.translate(0.5, 0.5);
        var example = new exampleConstructor(context, width, height);
        if (example) {
            examples.push(example);
        }
    });
    setInterval(function () {
        examples.forEach(function (example) { return example.tick(1 / 30); });
    }, 1000 / 30);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
var Point = /** @class */ (function () {
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
var Hit = /** @class */ (function () {
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
var Sweep = /** @class */ (function () {
    function Sweep() {
        this.hit = null;
        this.pos = new Point();
        this.time = 1;
    }
    return Sweep;
}());
exports.Sweep = Sweep;
var AABB = /** @class */ (function () {
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map