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


var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _intersect = __webpack_require__(1);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Example = function () {
  function Example(context, width, height) {
    _classCallCheck(this, Example);

    this.context = context;
    this.width = width;
    this.height = height;
    this.origin = new _intersect.Point(this.width * 0.5, this.height * 0.5);
    this.infiniteLength = Math.sqrt(this.width * this.width + this.height * this.height);
  }

  _createClass(Example, [{
    key: 'drawAABB',
    value: function drawAABB(box) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#fff';
      var thickness = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

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
    }
  }, {
    key: 'drawCircle',
    value: function drawCircle(circle) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#fff';
      var thickness = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      var x = Math.floor(this.origin.x + circle.pos.x);
      var y = Math.floor(this.origin.y + circle.pos.y);
      this.context.beginPath();
      this.context.arc(x, y, circle.radius, 0, 2 * Math.PI, true);
      this.context.closePath();
      this.context.lineWidth = thickness;
      this.context.strokeStyle = color;
      this.context.stroke();
    }
  }, {
    key: 'drawPoint',
    value: function drawPoint(point) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#fff';
      var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var thickness = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      var x = Math.floor(this.origin.x + point.x - thickness / 2);
      var y = Math.floor(this.origin.y + point.y - thickness / 2);
      this.context.lineWidth = thickness;
      this.context.fillStyle = color;
      this.context.strokeStyle = color;
      this.context.fillRect(x, y, thickness, thickness);
      this.context.strokeRect(x, y, thickness, thickness);
      if (text) {
        this.context.fillText(text, x + thickness * 4, y + thickness * 2);
      }
    }
  }, {
    key: 'drawRay',
    value: function drawRay(pos, dir, length) {
      var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#fff';
      var arrow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var thickness = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

      var pos2 = new _intersect.Point(pos.x + dir.x * length, pos.y + dir.y * length);
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
  }, {
    key: 'drawSegment',
    value: function drawSegment(point1, point2) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#fff';
      var thickness = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

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
    }
  }, {
    key: 'tick',
    value: function tick(elapsed) {
      this.context.fillStyle = '#000';
      this.context.fillRect(0, 0, this.width, this.height);
    }
  }]);

  return Example;
}();

var AABBPointExample = function (_Example) {
  _inherits(AABBPointExample, _Example);

  function AABBPointExample(context, width, height) {
    _classCallCheck(this, AABBPointExample);

    var _this = _possibleConstructorReturn(this, (AABBPointExample.__proto__ || Object.getPrototypeOf(AABBPointExample)).call(this, context, width, height));

    _this.angle = 0;
    _this.pos = new _intersect.Point();
    _this.box = new _intersect.AABB(new _intersect.Point(0, 0), new _intersect.Point(16, 16));
    return _this;
  }

  _createClass(AABBPointExample, [{
    key: 'tick',
    value: function tick(elapsed) {
      _get(AABBPointExample.prototype.__proto__ || Object.getPrototypeOf(AABBPointExample.prototype), 'tick', this).call(this, elapsed);
      this.angle += 0.5 * Math.PI * elapsed;
      this.pos.x = Math.cos(this.angle * 0.4) * 32;
      this.pos.y = Math.sin(this.angle) * 12;
      var hit = this.box.intersectPoint(this.pos);
      this.drawAABB(this.box, '#666');
      if (hit) {
        this.drawPoint(this.pos, '#f00');
        this.drawPoint(hit.pos, '#ff0');
      } else {
        this.drawPoint(this.pos, '#0f0');
      }
    }
  }]);

  return AABBPointExample;
}(Example);

var AABBSegmentExample = function (_Example2) {
  _inherits(AABBSegmentExample, _Example2);

  function AABBSegmentExample(context, width, height) {
    _classCallCheck(this, AABBSegmentExample);

    var _this2 = _possibleConstructorReturn(this, (AABBSegmentExample.__proto__ || Object.getPrototypeOf(AABBSegmentExample)).call(this, context, width, height));

    _this2.angle = 0;
    _this2.box = new _intersect.AABB(new _intersect.Point(0, 0), new _intersect.Point(16, 16));
    return _this2;
  }

  _createClass(AABBSegmentExample, [{
    key: 'tick',
    value: function tick(elapsed) {
      _get(AABBSegmentExample.prototype.__proto__ || Object.getPrototypeOf(AABBSegmentExample.prototype), 'tick', this).call(this, elapsed);
      this.angle += 0.5 * Math.PI * elapsed;
      var pos1 = new _intersect.Point(Math.cos(this.angle) * 64, Math.sin(this.angle) * 64);
      var pos2 = new _intersect.Point(Math.sin(this.angle) * 32, Math.cos(this.angle) * 32);
      var delta = new _intersect.Point(pos2.x - pos1.x, pos2.y - pos1.y);
      var hit = this.box.intersectSegment(pos1, delta);
      var dir = delta.clone();
      var length = dir.normalize();
      this.drawAABB(this.box, '#666');
      if (hit) {
        this.drawRay(pos1, dir, length, '#f00');
        this.drawSegment(pos1, hit.pos, '#ff0');
        this.drawPoint(hit.pos, '#ff0');
        this.drawRay(hit.pos, hit.normal, 6, '#ff0', false);
      } else {
        this.drawRay(pos1, dir, length, '#0f0');
      }
    }
  }]);

  return AABBSegmentExample;
}(Example);

var AABBAABBExample = function (_Example3) {
  _inherits(AABBAABBExample, _Example3);

  function AABBAABBExample(context, width, height) {
    _classCallCheck(this, AABBAABBExample);

    var _this3 = _possibleConstructorReturn(this, (AABBAABBExample.__proto__ || Object.getPrototypeOf(AABBAABBExample)).call(this, context, width, height));

    _this3.angle = 0;
    _this3.box1 = new _intersect.AABB(new _intersect.Point(0, 0), new _intersect.Point(64, 16));
    _this3.box2 = new _intersect.AABB(new _intersect.Point(0, 0), new _intersect.Point(16, 16));
    return _this3;
  }

  _createClass(AABBAABBExample, [{
    key: 'tick',
    value: function tick(elapsed) {
      _get(AABBAABBExample.prototype.__proto__ || Object.getPrototypeOf(AABBAABBExample.prototype), 'tick', this).call(this, elapsed);
      this.angle += 0.2 * Math.PI * elapsed;
      this.box2.pos.x = Math.cos(this.angle) * 96;
      this.box2.pos.y = Math.sin(this.angle * 2.4) * 24;
      var hit = this.box1.intersectAABB(this.box2);
      this.drawAABB(this.box1, '#666');
      if (hit) {
        this.drawAABB(this.box2, '#f00');
        this.box2.pos.x += hit.delta.x;
        this.box2.pos.y += hit.delta.y;
        this.drawAABB(this.box2, '#ff0');
        this.drawPoint(hit.pos, '#ff0');
        this.drawRay(hit.pos, hit.normal, 4, '#ff0', false);
      } else {
        this.drawAABB(this.box2, '#0f0');
      }
    }
  }]);

  return AABBAABBExample;
}(Example);

var AABBSweptAABBExample = function (_Example4) {
  _inherits(AABBSweptAABBExample, _Example4);

  function AABBSweptAABBExample(context, width, height) {
    _classCallCheck(this, AABBSweptAABBExample);

    var _this4 = _possibleConstructorReturn(this, (AABBSweptAABBExample.__proto__ || Object.getPrototypeOf(AABBSweptAABBExample)).call(this, context, width, height));

    _this4.angle = 0;
    _this4.staticBox = new _intersect.AABB(new _intersect.Point(0, 0), new _intersect.Point(112, 16));
    _this4.sweepBoxes = [new _intersect.AABB(new _intersect.Point(-152, 24), new _intersect.Point(16, 16)), new _intersect.AABB(new _intersect.Point(128, -48), new _intersect.Point(16, 16))];
    _this4.sweepDeltas = [new _intersect.Point(64, -12), new _intersect.Point(-32, 96)];
    _this4.tempBox = new _intersect.AABB(new _intersect.Point(0, 0), new _intersect.Point(16, 16));
    return _this4;
  }

  _createClass(AABBSweptAABBExample, [{
    key: 'tick',
    value: function tick(elapsed) {
      var _this5 = this;

      _get(AABBSweptAABBExample.prototype.__proto__ || Object.getPrototypeOf(AABBSweptAABBExample.prototype), 'tick', this).call(this, elapsed);
      this.angle += 0.5 * Math.PI * elapsed;
      this.drawAABB(this.staticBox, '#666');
      var factor = (Math.cos(this.angle) + 1) * 0.5 || 1e-8;
      this.sweepBoxes.forEach(function (box, i) {
        var delta = _this5.sweepDeltas[i].clone();
        delta.x *= factor;
        delta.y *= factor;
        var sweep = _this5.staticBox.sweepAABB(box, delta);
        var dir = delta.clone();
        var length = dir.normalize();
        _this5.drawAABB(box, '#666');
        if (sweep.hit) {
          // Draw a red box at the point where it was trying to move to
          _this5.drawRay(box.pos, dir, length, '#f00');
          _this5.tempBox.pos.x = box.pos.x + delta.x;
          _this5.tempBox.pos.y = box.pos.y + delta.y;
          _this5.drawAABB(_this5.tempBox, '#f00');
          // Draw a yellow box at the point it actually got to
          _this5.tempBox.pos.x = sweep.pos.x;
          _this5.tempBox.pos.y = sweep.pos.y;
          _this5.drawAABB(_this5.tempBox, '#ff0');
          _this5.drawPoint(sweep.hit.pos, '#ff0');
          _this5.drawRay(sweep.hit.pos, sweep.hit.normal, 4, '#ff0', false);
        } else {
          _this5.tempBox.pos.x = sweep.pos.x;
          _this5.tempBox.pos.y = sweep.pos.y;
          _this5.drawAABB(_this5.tempBox, '#0f0');
          _this5.drawRay(box.pos, dir, length, '#0f0');
        }
      });
    }
  }]);

  return AABBSweptAABBExample;
}(Example);

var MultipleAABBSweptAABBExample = function (_Example5) {
  _inherits(MultipleAABBSweptAABBExample, _Example5);

  function MultipleAABBSweptAABBExample(context, width, height) {
    _classCallCheck(this, MultipleAABBSweptAABBExample);

    var _this6 = _possibleConstructorReturn(this, (MultipleAABBSweptAABBExample.__proto__ || Object.getPrototypeOf(MultipleAABBSweptAABBExample)).call(this, context, width, height));

    _this6.delta = new _intersect.Point();
    _this6.velocity = new _intersect.Point(48, 48);
    _this6.movingBox = new _intersect.AABB(new _intersect.Point(0, 0), new _intersect.Point(8, 8));
    _this6.staticBoxes = [new _intersect.AABB(new _intersect.Point(-96, 0), new _intersect.Point(8, 48)), new _intersect.AABB(new _intersect.Point(96, 0), new _intersect.Point(8, 48)), new _intersect.AABB(new _intersect.Point(0, -56), new _intersect.Point(104, 8)), new _intersect.AABB(new _intersect.Point(0, 56), new _intersect.Point(104, 8))];
    return _this6;
  }

  _createClass(MultipleAABBSweptAABBExample, [{
    key: 'reflect',
    value: function reflect(velocity, normal, out) {
      var dot = velocity.x * normal.x + velocity.y * normal.y;
      var ux = normal.x * dot;
      var uy = normal.y * dot;
      var wx = velocity.x - ux;
      var wy = velocity.y - uy;
      out.x = wx - ux;
      out.y = wy - uy;
    }
  }, {
    key: 'tick',
    value: function tick(elapsed) {
      var _this7 = this;

      _get(MultipleAABBSweptAABBExample.prototype.__proto__ || Object.getPrototypeOf(MultipleAABBSweptAABBExample.prototype), 'tick', this).call(this, elapsed);
      this.delta.x = this.velocity.x * elapsed;
      this.delta.y = this.velocity.y * elapsed;
      var sweep = this.movingBox.sweepInto(this.staticBoxes, this.delta);
      if (sweep.hit) {
        // This should really attempt to slide along the hit normal, and use up
        // the rest of the velocity, but that's a bit much for this example
        this.reflect(this.velocity, sweep.hit.normal, this.velocity);
      }
      this.staticBoxes.forEach(function (staticBox) {
        if (sweep.hit && sweep.hit.collider === staticBox) {
          _this7.drawAABB(staticBox, '#aaa');
        } else {
          _this7.drawAABB(staticBox, '#666');
        }
      });
      this.movingBox.pos = sweep.pos;
      this.drawAABB(this.movingBox, sweep.hit ? '#ff0' : '#0f0');
    }
  }]);

  return MultipleAABBSweptAABBExample;
}(Example);

function ready(callback) {
  if (document.readyState == 'complete') {
    setTimeout(callback, 1);
    return;
  }
  document.addEventListener('DOMContentLoaded', function handler() {
    document.removeEventListener('DOMContentLoaded', handler, false);
    callback();
  }, false);
}

ready(function () {
  var exampleIds = {
    'aabb-vs-point': AABBPointExample,
    'aabb-vs-segment': AABBSegmentExample,
    'aabb-vs-aabb': AABBAABBExample,
    'aabb-vs-swept-aabb': AABBSweptAABBExample,
    'sweeping-an-aabb-through-multiple-objects': MultipleAABBSweptAABBExample
  };

  var examples = [];
  Object.keys(exampleIds).forEach(function (id) {
    var exampleConstructor = exampleIds[id];
    var anchor = document.getElementById(id);
    if (anchor) {
      var canvas = document.createElement('canvas');
      anchor.parentNode.insertBefore(canvas, anchor.nextSibling);
      var width = canvas.width = 640;
      var height = canvas.height = 160;
      var context = canvas.getContext('2d');
      context.translate(0.5, 0.5);
      var example = new exampleConstructor(context, width, height);
      if (example) {
        examples.push(example);
      }
    }
  });

  setInterval(function () {
    examples.forEach(function (example) {
      return example.tick(1 / 30);
    });
  }, 1000 / 30);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map