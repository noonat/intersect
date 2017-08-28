'use strict';

import {AABB, Circle, Point} from './intersect';

class Example {
  constructor(context, width, height) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.origin = new Point(this.width * 0.5, this.height * 0.5);
    this.infiniteLength = Math.sqrt(this.width * this.width + this.height * this.height);
  }

  drawAABB(box, color='#fff', thickness=1) {
    let x1 = Math.floor(this.origin.x + box.pos.x - box.half.x);
    let y1 = Math.floor(this.origin.y + box.pos.y - box.half.y);
    let x2 = Math.floor(this.origin.x + box.pos.x + box.half.x);
    let y2 = Math.floor(this.origin.y + box.pos.y + box.half.y);
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

  drawCircle(circle, color='#fff', thickness=1) {
    let x = Math.floor(this.origin.x + circle.pos.x);
    let y = Math.floor(this.origin.y + circle.pos.y);
    this.context.beginPath();
    this.context.arc(x, y, circle.radius, 0, 2 * Math.PI, true);
    this.context.closePath();
    this.context.lineWidth = thickness;
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  drawPoint(point, color='#fff', text='', thickness=1) {
    let x = Math.floor(this.origin.x + point.x - (thickness / 2));
    let y = Math.floor(this.origin.y + point.y - (thickness / 2));
    this.context.lineWidth = thickness;
    this.context.fillStyle = color;
    this.context.strokeStyle = color;
    this.context.fillRect(x, y, thickness, thickness);
    this.context.strokeRect(x, y, thickness, thickness);
    if (text) {
      this.context.fillText(text, x + thickness * 4, y + thickness * 2);
    }
  }

  drawRay(pos, dir, length, color='#fff', arrow=true, thickness=1) {
    let pos2 = new Point(pos.x + dir.x * length, pos.y + dir.y * length);
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

  drawSegment(point1, point2, color='#fff', thickness=1) {
    let x1 = Math.floor(this.origin.x + point1.x);
    let y1 = Math.floor(this.origin.y + point1.y);
    let x2 = Math.floor(this.origin.x + point2.x);
    let y2 = Math.floor(this.origin.y + point2.y);
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.closePath();
    this.context.lineWidth = thickness;
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  tick(elapsed) {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.width, this.height);
  }
}

class AABBPointExample extends Example {
  constructor(context, width, height) {
    super(context, width, height);
    this.angle = 0;
    this.pos = new Point();
    this.box = new AABB(new Point(0, 0), new Point(16, 16));
  }

  tick(elapsed) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    this.pos.x = Math.cos(this.angle * 0.4) * 32;
    this.pos.y = Math.sin(this.angle) * 12;
    let hit = this.box.intersectPoint(this.pos);
    this.drawAABB(this.box, '#666');
    if (hit) {
      this.drawPoint(this.pos, '#f00');
      this.drawPoint(hit.pos, '#ff0');
    } else {
      this.drawPoint(this.pos, '#0f0');
    }
  }
}

class AABBSegmentExample extends Example {
  constructor(context, width, height) {
    super(context, width, height);
    this.angle = 0;
    this.box = new AABB(new Point(0, 0), new Point(16, 16));
  }

  tick(elapsed) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    let pos1 = new Point(Math.cos(this.angle) * 64, Math.sin(this.angle) * 64);
    let pos2 = new Point(Math.sin(this.angle) * 32, Math.cos(this.angle) * 32);
    let delta = new Point(pos2.x - pos1.x, pos2.y - pos1.y);
    let hit = this.box.intersectSegment(pos1, delta);
    let dir = delta.clone();
    let length = dir.normalize();
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
}

class AABBAABBExample extends Example {
  constructor(context, width, height) {
    super(context, width, height);
    this.angle = 0;
    this.box1 = new AABB(new Point(0, 0), new Point(64, 16));
    this.box2 = new AABB(new Point(0, 0), new Point(16, 16));
  }

  tick(elapsed) {
    super.tick(elapsed);
    this.angle += 0.2 * Math.PI * elapsed;
    this.box2.pos.x = Math.cos(this.angle) * 96;
    this.box2.pos.y = Math.sin(this.angle * 2.4) * 24;
    let hit = this.box1.intersectAABB(this.box2);
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
}

class AABBSweptAABBExample extends Example {
  constructor(context, width, height) {
    super(context, width, height);
    this.angle = 0;
    this.staticBox = new AABB(new Point(0, 0), new Point(112, 16));
    this.sweepBoxes = [
      new AABB(new Point(-152, 24), new Point(16, 16)),
      new AABB(new Point(128, -48), new Point(16, 16)),
    ];
    this.sweepDeltas = [
      new Point(64, -12),
      new Point(-32, 96),
    ];
    this.tempBox = new AABB(new Point(0, 0), new Point(16, 16));
  }

  tick(elapsed) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    this.drawAABB(this.staticBox, '#666');
    let factor = ((Math.cos(this.angle) + 1) * 0.5) || 1e-8;
    this.sweepBoxes.forEach((box, i) => {
      let delta = this.sweepDeltas[i].clone();
      delta.x *= factor;
      delta.y *= factor;
      let sweep = this.staticBox.sweepAABB(box, delta);
      let dir = delta.clone();
      let length = dir.normalize();
      this.drawAABB(box, '#666');
      if (sweep.hit) {
        // Draw a red box at the point where it was trying to move to
        this.drawRay(box.pos, dir, length, '#f00');
        this.tempBox.pos.x = box.pos.x + delta.x;
        this.tempBox.pos.y = box.pos.y + delta.y;
        this.drawAABB(this.tempBox, '#f00');
        // Draw a yellow box at the point it actually got to
        this.tempBox.pos.x = sweep.pos.x;
        this.tempBox.pos.y = sweep.pos.y;
        this.drawAABB(this.tempBox, '#ff0');
        this.drawPoint(sweep.hit.pos, '#ff0');
        this.drawRay(sweep.hit.pos, sweep.hit.normal, 4, '#ff0', false);
      } else {
        this.tempBox.pos.x = sweep.pos.x;
        this.tempBox.pos.y = sweep.pos.y;
        this.drawAABB(this.tempBox, '#0f0');
        this.drawRay(box.pos, dir, length, '#0f0');
      }
    });
  }
}

class MultipleAABBSweptAABBExample extends Example {
  constructor(context, width, height) {
    super(context, width, height);
    this.delta = new Point();
    this.velocity = new Point(48, 48);
    this.movingBox = new AABB(new Point(0, 0), new Point(8, 8));
    this.staticBoxes = [
      new AABB(new Point(-96, 0), new Point(8, 48)),
      new AABB(new Point( 96, 0), new Point(8, 48)),
      new AABB(new Point(0, -56), new Point(104, 8)),
      new AABB(new Point(0,  56), new Point(104, 8)),
    ];
  }

  reflect(velocity, normal, out) {
    let dot = velocity.x * normal.x + velocity.y * normal.y;
    let ux = normal.x * dot;
    let uy = normal.y * dot;
    let wx = velocity.x - ux;
    let wy = velocity.y - uy;
    out.x = wx - ux;
    out.y = wy - uy;
  }

  tick(elapsed) {
    super.tick(elapsed);
    this.delta.x = this.velocity.x * elapsed;
    this.delta.y = this.velocity.y * elapsed;
    let sweep = this.movingBox.sweepInto(this.staticBoxes, this.delta);
    if (sweep.hit) {
      // This should really attempt to slide along the hit normal, and use up
      // the rest of the velocity, but that's a bit much for this example
      this.reflect(this.velocity, sweep.hit.normal, this.velocity);
    }
    this.staticBoxes.forEach((staticBox) => {
      if (sweep.hit && sweep.hit.collider === staticBox) {
        this.drawAABB(staticBox, '#aaa');
      } else {
        this.drawAABB(staticBox, '#666');
      }
    });
    this.movingBox.pos = sweep.pos;
    this.drawAABB(this.movingBox, sweep.hit ? '#ff0' : '#0f0');
  }
}

class CirclePointExample extends Example {
  constructor(context, width, height) {
    super(context, width, height);
    this.angle = 0;
    this.pos = new Point();
    this.circle = new Circle(new Point(0, 0), 24);
  }

  tick(elapsed) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    this.pos.x = Math.cos(this.angle * 0.4) * 32;
    this.pos.y = Math.sin(this.angle) * 12;
    let hit = this.circle.intersectPoint(this.pos);
    this.drawCircle(this.circle, '#666');
    if (hit) {
      this.drawPoint(this.pos, '#f00');
      this.drawPoint(hit.pos, '#ff0');
    } else {
      this.drawPoint(this.pos, '#0f0');
    }
  }
}

class CircleSegmentExample extends Example {
  constructor(context, width, height) {
    super(context, width, height);
    this.angle = 0;
    this.circle = new Circle(new Point(0, 0), 24);
  }

  tick(elapsed) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    let pos1 = new Point(Math.cos(this.angle) * 64, Math.sin(this.angle) * 64);
    let pos2 = new Point(Math.sin(this.angle) * 32, Math.cos(this.angle) * 32);
    let delta = new Point(pos2.x - pos1.x, pos2.y - pos1.y);
    let hit = this.circle.intersectSegment(pos1, delta);
    let dir = delta.clone();
    let length = dir.normalize();
    this.drawCircle(this.circle, '#666');
    if (hit) {
      this.drawRay(pos1, dir, length, '#f00');
      this.drawSegment(pos1, hit.pos, '#ff0');
      this.drawPoint(hit.pos, '#ff0');
      this.drawRay(hit.pos, hit.normal, 6, '#ff0', false);
    } else {
      this.drawRay(pos1, dir, length, '#0f0');
    }
  }
}

class CircleAABBExample extends Example {
  constructor(context, width, height) {
    super(context, width, height);
    this.angle = 0;
    this.circle = new Circle(new Point(0, 0), 32);
    this.box = new AABB(new Point(0, 0), new Point(16, 16));
  }

  tick(elapsed) {
    super.tick(elapsed);
    this.angle += 0.2 * Math.PI * elapsed;
    this.box.pos.x = Math.cos(this.angle) * 96;
    this.box.pos.y = Math.sin(this.angle * 2.4) * 24;
    let hit = this.circle.intersectAABB(this.box);
    this.drawCircle(this.circle, '#666');
    if (hit) {
      this.drawAABB(this.box, '#f00');
      this.box.pos.x += hit.delta.x;
      this.box.pos.y += hit.delta.y;
      this.drawAABB(this.box, '#ff0');
      this.drawPoint(hit.pos, '#ff0');
      this.drawRay(hit.pos, hit.normal, 4, '#ff0', false);
    } else {
      this.drawAABB(this.box, '#0f0');
    }
  }
}

class CircleCircleExample extends Example {
  constructor(context, width, height) {
    super(context, width, height);
    this.angle = 0;
    this.circle1 = new Circle(new Point(0, 0), 32);
    this.circle2 = new Circle(new Point(0, 0), 16);
  }

  tick(elapsed) {
    super.tick(elapsed);
    this.angle += 0.2 * Math.PI * elapsed;
    this.circle2.pos.x = Math.cos(this.angle) * 96;
    this.circle2.pos.y = Math.sin(this.angle * 2.4) * 24;
    let hit = this.circle1.intersectCircle(this.circle2);
    this.drawCircle(this.circle1, '#666');
    if (hit) {
      this.drawCircle(this.circle2, '#f00');
      this.circle2.pos.x += hit.delta.x;
      this.circle2.pos.y += hit.delta.y;
      this.drawCircle(this.circle2, '#ff0');
      this.drawPoint(hit.pos, '#ff0');
      this.drawRay(hit.pos, hit.normal, 4, '#ff0', false);
    } else {
      this.drawCircle(this.circle2, '#0f0');
    }
  }
}

class CircleSweptAABBExample extends Example {
  constructor(context, width, height) {
    super(context, width, height);
    this.angle = 0;
    this.circle = new Circle(new Point(0, 0), 112);
    this.sweepBoxes = [
      new AABB(new Point(-152, 24), new Point(16, 16)),
      new AABB(new Point(128, -48), new Point(16, 16)),
    ];
    this.sweepDeltas = [
      new Point(64, -12),
      new Point(-32, 96),
    ];
    this.tempBox = new AABB(new Point(0, 0), new Point(16, 16));
  }

  tick(elapsed) {
    super.tick(elapsed);
    this.angle += 0.5 * Math.PI * elapsed;
    this.drawCircle(this.circle, '#666');
    let factor = ((Math.cos(this.angle) + 1) * 0.5) || 1e-8;
    this.sweepBoxes.forEach((box, i) => {
      let delta = this.sweepDeltas[i].clone();
      delta.x *= factor;
      delta.y *= factor;
      let sweep = this.circle.sweepAABB(box, delta);
      let dir = delta.clone();
      let length = dir.normalize();
      this.drawAABB(box, '#666');
      if (sweep.hit) {
        // Draw a red box at the point where it was trying to move to
        this.drawRay(box.pos, dir, length, '#f00');
        this.tempBox.pos.x = box.pos.x + delta.x;
        this.tempBox.pos.y = box.pos.y + delta.y;
        this.drawAABB(this.tempBox, '#f00');
        // Draw a yellow box at the point it actually got to
        this.tempBox.pos.x = sweep.pos.x;
        this.tempBox.pos.y = sweep.pos.y;
        this.drawAABB(this.tempBox, '#ff0');
        this.drawPoint(sweep.hit.pos, '#ff0');
        this.drawRay(sweep.hit.pos, sweep.hit.normal, 4, '#ff0', false);
      } else {
        this.tempBox.pos.x = sweep.pos.x;
        this.tempBox.pos.y = sweep.pos.y;
        this.drawAABB(this.tempBox, '#0f0');
        this.drawRay(box.pos, dir, length, '#0f0');
      }
    });
  }
}

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

ready(() => {
  let exampleIds = {
    'aabb-vs-point': AABBPointExample,
    'aabb-vs-segment': AABBSegmentExample,
    'aabb-vs-aabb': AABBAABBExample,
    'aabb-vs-swept-aabb': AABBSweptAABBExample,
    'sweeping-an-aabb-through-multiple-objects': MultipleAABBSweptAABBExample,
    'circle-vs-point': CirclePointExample,
    'circle-vs-segment': CircleSegmentExample,
    'circle-vs-aabb': CircleAABBExample,
    'circle-vs-circle': CircleCircleExample,
    'circle-vs-swept-aabb': CircleSweptAABBExample,
  };

  let examples = [];
  Object.keys(exampleIds).forEach((id) => {
    let exampleConstructor = exampleIds[id];
    let anchor = document.getElementById(id);
    if (anchor) {
      let canvas = document.createElement('canvas');
      anchor.parentNode.insertBefore(canvas, anchor.nextSibling);
      let width = canvas.width = 640;
      let height = canvas.height = 160;
      let context = canvas.getContext('2d');
      context.translate(0.5, 0.5);
      let example = new exampleConstructor(context, width, height);
      if (example) {
        examples.push(example);
      }
    }
  });

  setInterval(() => {
    examples.forEach((example) => example.tick(1 / 30));
  }, 1000 / 30);
});
