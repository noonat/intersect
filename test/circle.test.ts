import * as assert from "assert";
import { AABB, Circle, EPSILON, Hit, Point, Sweep } from "../src/intersect";

function almostEqual(actual: number, expected: number, message?: string) {
  if (Math.abs(actual - expected) > 1e-8) {
    assert.equal(actual, expected, message || `${actual} != ${expected}`);
  }
}

function assertNotNull<T>(value: T | null): T {
  if (value === null) {
    throw new Error("value is unexpectedly null");
  }
  return value;
}

describe("Circle", () => {
  describe("intersectPoint", () => {
    test("should return null when not colliding", () => {
      const circle = new Circle(new Point(0, 0), 16);
      assert.equal(circle.intersectPoint(new Point(32, 0)), null);
    });

    test("should return null when the point is exactly on the edge", () => {
      const circle = new Circle(new Point(0, 0), 16);
      assert.equal(circle.intersectPoint(new Point(16, 0)), null);
    });

    test("should return hit when colliding", () => {
      const circle = new Circle(new Point(0, 0), 16);
      const hit = assertNotNull(circle.intersectPoint(new Point(4, 0)));
      assert.ok(hit instanceof Hit);
      assert.equal(hit.collider, circle);
    });

    test("should put hit.pos on the edge of the circle", () => {
      const circle = new Circle(new Point(0, 0), 16);
      const hit = assertNotNull(circle.intersectPoint(new Point(4, 0)));
      almostEqual(hit.pos.x, 16);
      almostEqual(hit.pos.y, 0);
      almostEqual(hit.normal.x, 1);
      almostEqual(hit.normal.y, 0);
    });

    test("should set hit.delta to push the point out of the circle", () => {
      const circle = new Circle(new Point(0, 0), 16);
      const point = new Point(4, 0);
      const hit = assertNotNull(circle.intersectPoint(point));
      almostEqual(point.x + hit.delta.x, 16);
      almostEqual(point.y + hit.delta.y, 0);
    });

    test("should add padding to the radius of the circle", () => {
      const circle = new Circle(new Point(0, 0), 16);
      assert.equal(circle.intersectPoint(new Point(24, 0)), null);
      assert.notEqual(circle.intersectPoint(new Point(24, 0), 16), null);
    });
  });

  describe("intersectSegment", () => {
    test("should return null when not colliding", () => {
      const circle = new Circle(new Point(0, 0), 16);
      const hit = circle.intersectSegment(new Point(-32, 32), new Point(64, 0));
      assert.equal(hit, null);
    });

    test("should return null when the segment stops short", () => {
      const circle = new Circle(new Point(0, 0), 16);
      const hit = circle.intersectSegment(new Point(-32, 0), new Point(8, 0));
      assert.equal(hit, null);
    });

    test("should return hit when colliding", () => {
      const circle = new Circle(new Point(0, 0), 16);
      const pos = new Point(-32, 0);
      const delta = new Point(64, 0);
      const hit = assertNotNull(circle.intersectSegment(pos, delta));
      almostEqual(hit.time, 0.25);
      almostEqual(hit.pos.x, -16);
      almostEqual(hit.pos.y, 0);
      almostEqual(hit.normal.x, -1);
      almostEqual(hit.normal.y, 0);
    });

    test("should set hit.time to zero when starting inside the circle", () => {
      const circle = new Circle(new Point(0, 0), 16);
      const hit = assertNotNull(
        circle.intersectSegment(new Point(0, 0), new Point(64, 0))
      );
      almostEqual(hit.time, 0);
    });

    test("should add padding to the radius of the circle", () => {
      const circle = new Circle(new Point(0, 0), 16);
      const pos = new Point(-32, 0);
      const delta = new Point(64, 0);
      const hit = assertNotNull(circle.intersectSegment(pos, delta, 8));
      almostEqual(hit.time, 0.125);
      almostEqual(hit.pos.x, -24);
    });

    test("should return null when the circle is behind the segment", () => {
      // Both roots of the quadratic are negative here, which means the circle
      // is behind the start of the segment rather than in front of it.
      const circle = new Circle(new Point(0, 0), 16);
      assert.equal(
        circle.intersectSegment(new Point(64, 0), new Point(64, 0)),
        null
      );
      assert.equal(
        circle.intersectSegment(new Point(512, 0), new Point(64, 0)),
        null
      );
    });
  });

  describe("intersectAABB", () => {
    test("should return null when not colliding", () => {
      const circle = new Circle(new Point(0, 0), 16);
      const box = new AABB(new Point(64, 0), new Point(8, 8));
      assert.equal(circle.intersectAABB(box), null);
    });

    test("should return hit when colliding", () => {
      const circle = new Circle(new Point(0, 0), 16);
      const box = new AABB(new Point(20, 0), new Point(8, 8));
      const hit = assertNotNull(circle.intersectAABB(box));
      assert.equal(hit.collider, circle);
      almostEqual(hit.pos.x, 16);
      almostEqual(hit.pos.y, 0);
      almostEqual(hit.normal.x, 1);
      almostEqual(hit.normal.y, 0);
    });

    test("should use the nearest point on the box, not its center", () => {
      // The box's center is far away on the diagonal, but one of its corners
      // is inside the circle.
      const circle = new Circle(new Point(0, 0), 16);
      const box = new AABB(new Point(20, 20), new Point(12, 12));
      assert.notEqual(circle.intersectAABB(box), null);
    });
  });

  describe("intersectCircle", () => {
    test("should return null when not colliding", () => {
      const circle1 = new Circle(new Point(0, 0), 16);
      const circle2 = new Circle(new Point(64, 0), 16);
      assert.equal(circle1.intersectCircle(circle2), null);
    });

    test("should return null when the edges are flush", () => {
      const circle1 = new Circle(new Point(0, 0), 16);
      const circle2 = new Circle(new Point(32, 0), 16);
      assert.equal(circle1.intersectCircle(circle2), null);
    });

    test("should return hit when colliding", () => {
      const circle1 = new Circle(new Point(0, 0), 16);
      const circle2 = new Circle(new Point(24, 0), 16);
      const hit = assertNotNull(circle1.intersectCircle(circle2));
      almostEqual(hit.pos.x, 16);
      almostEqual(hit.pos.y, 0);
      almostEqual(hit.normal.x, 1);
      almostEqual(hit.normal.y, 0);
    });
  });

  describe("sweepCircle", () => {
    test("should return sweep when not colliding", () => {
      const circle1 = new Circle(new Point(0, 0), 16);
      const circle2 = new Circle(new Point(-64, 64), 8);
      const delta = new Point(128, 0);
      const sweep = circle1.sweepCircle(circle2, delta);
      assert.ok(sweep instanceof Sweep);
      assert.equal(sweep.hit, null);
      almostEqual(sweep.time, 1);
      almostEqual(sweep.pos.x, circle2.pos.x + delta.x);
      almostEqual(sweep.pos.y, circle2.pos.y + delta.y);
    });

    test("should stop the moving circle where it touches", () => {
      // Contact happens when the centers are radius + radius apart, so 24
      // units out. Like the other sweeps, this backs off by epsilon so that
      // the circles don't end up exactly touching.
      const circle1 = new Circle(new Point(0, 0), 16);
      const circle2 = new Circle(new Point(-64, 0), 8);
      const delta = new Point(128, 0);
      const sweep = circle1.sweepCircle(circle2, delta);
      assert.ok(sweep.hit instanceof Hit);
      const time = 0.3125 - EPSILON;
      almostEqual(sweep.time, time);
      almostEqual(sweep.pos.x, circle2.pos.x + delta.x * time);
      almostEqual(sweep.pos.y, circle2.pos.y + delta.y * time);
    });

    test("should put sweep.hit.pos on the edge of the static circle", () => {
      const circle1 = new Circle(new Point(0, 0), 16);
      const circle2 = new Circle(new Point(-64, 0), 8);
      const sweep = circle1.sweepCircle(circle2, new Point(128, 0));
      const hit = assertNotNull(sweep.hit);
      almostEqual(hit.pos.x, -16);
      almostEqual(hit.pos.y, 0);
      almostEqual(hit.normal.x, -1);
      almostEqual(hit.normal.y, 0);
    });

    test("should not move when the start position is colliding", () => {
      const circle1 = new Circle(new Point(0, 0), 16);
      const circle2 = new Circle(new Point(4, 0), 8);
      const sweep = circle1.sweepCircle(circle2, new Point(0, 0));
      assert.ok(sweep.hit instanceof Hit);
      almostEqual(sweep.time, 0);
      almostEqual(sweep.pos.x, circle2.pos.x);
      almostEqual(sweep.pos.y, circle2.pos.y);
    });

    test("should return time of 1 when standing still and not colliding", () => {
      const circle1 = new Circle(new Point(0, 0), 16);
      const circle2 = new Circle(new Point(64, 0), 8);
      const sweep = circle1.sweepCircle(circle2, new Point(0, 0));
      assert.equal(sweep.hit, null);
      almostEqual(sweep.time, 1);
    });
  });

  describe("sweepInto", () => {
    test("should return the full move when nothing is in the way", () => {
      const circle = new Circle(new Point(0, 0), 8);
      const delta = new Point(32, 0);
      const sweep = circle.sweepInto(
        [new AABB(new Point(0, 128), new Point(8, 8))],
        delta
      );
      assert.equal(sweep.hit, null);
      almostEqual(sweep.time, 1);
      almostEqual(sweep.pos.x, delta.x);
      almostEqual(sweep.pos.y, 0);
    });

    test("should return the nearest of several hits", () => {
      // Both boxes are on the path; only the first one should stop it.
      const circle = new Circle(new Point(0, 0), 8);
      const near = new AABB(new Point(64, 0), new Point(8, 8));
      const far = new AABB(new Point(128, 0), new Point(8, 8));
      const sweep = circle.sweepInto([far, near], new Point(256, 0));
      const hit = assertNotNull(sweep.hit);
      assert.equal(hit.collider, near);
      // Contact is at 64 - 8 - 8 = 48 units out of 256.
      almostEqual(sweep.time, 48 / 256 - EPSILON);
    });

    test("should sweep against boxes and circles alike", () => {
      const circle = new Circle(new Point(0, 0), 8);
      const box = new AABB(new Point(128, 0), new Point(8, 8));
      const pillar = new Circle(new Point(64, 0), 16);
      const sweep = circle.sweepInto([box, pillar], new Point(256, 0));
      const hit = assertNotNull(sweep.hit);
      assert.equal(hit.collider, pillar);
      // Contact is when the centers are 16 + 8 apart, so 40 units out.
      almostEqual(sweep.time, 40 / 256 - EPSILON);
    });
  });
});

describe("AABB vs Circle", () => {
  describe("intersectCircle", () => {
    test("should return null when not colliding", () => {
      const box = new AABB(new Point(0, 0), new Point(16, 16));
      assert.equal(box.intersectCircle(new Circle(new Point(64, 0), 8)), null);
    });

    test("should return null when only the corner square overlaps", () => {
      // The circle's center is diagonally past the corner, close enough that
      // an inflated box would call it a hit, but too far for the real corner.
      const box = new AABB(new Point(0, 0), new Point(16, 16));
      const circle = new Circle(new Point(16 + 7, 16 + 7), 8);
      assert.equal(box.intersectCircle(circle), null);
    });

    test("should return hit when colliding through a face", () => {
      const box = new AABB(new Point(0, 0), new Point(16, 16));
      const circle = new Circle(new Point(20, 0), 8);
      const hit = assertNotNull(box.intersectCircle(circle));
      assert.equal(hit.collider, box);
      almostEqual(hit.normal.x, 1);
      almostEqual(hit.normal.y, 0);
      almostEqual(hit.pos.x, 16);
      almostEqual(hit.pos.y, 0);
    });

    test("should set hit.delta to push the circle out of the box", () => {
      const box = new AABB(new Point(0, 0), new Point(16, 16));
      const circle = new Circle(new Point(20, 0), 8);
      const hit = assertNotNull(box.intersectCircle(circle));
      circle.pos.x += hit.delta.x;
      circle.pos.y += hit.delta.y;
      assert.equal(box.intersectCircle(circle), null);
    });

    test("should push out through the nearest face from inside", () => {
      const box = new AABB(new Point(0, 0), new Point(16, 16));
      const circle = new Circle(new Point(12, 0), 4);
      const hit = assertNotNull(box.intersectCircle(circle));
      almostEqual(hit.normal.x, 1);
      almostEqual(hit.normal.y, 0);
      circle.pos.x += hit.delta.x;
      assert.equal(box.intersectCircle(circle), null);
    });
  });

  describe("sweepCircle", () => {
    test("should return sweep when not colliding", () => {
      const box = new AABB(new Point(0, 0), new Point(16, 16));
      const circle = new Circle(new Point(-64, 64), 8);
      const delta = new Point(128, 0);
      const sweep = box.sweepCircle(circle, delta);
      assert.equal(sweep.hit, null);
      almostEqual(sweep.time, 1);
      almostEqual(sweep.pos.x, circle.pos.x + delta.x);
    });

    test("should stop the circle against a face", () => {
      const box = new AABB(new Point(0, 0), new Point(16, 16));
      const circle = new Circle(new Point(-64, 0), 8);
      const delta = new Point(128, 0);
      const sweep = box.sweepCircle(circle, delta);
      assert.ok(sweep.hit instanceof Hit);
      // Contact when the center is half + radius from the box's center.
      const time = 0.3125 - EPSILON;
      almostEqual(sweep.time, time);
      almostEqual(sweep.pos.x, circle.pos.x + delta.x * time);
      almostEqual(sweep.hit.pos.x, -16);
      almostEqual(sweep.hit.normal.x, -1);
    });

    test("should not collide with the empty square past a corner", () => {
      // A diagonal path that clips the far corner of the inflated box while
      // staying clear of the rounded corner itself. The first assertion is
      // the point of the test: the inflated box alone calls this a hit.
      const box = new AABB(new Point(0, 0), new Point(16, 16));
      const circle = new Circle(new Point(26, 20), 8);
      const delta = new Point(-6, 6);
      assert.notEqual(box.intersectSegment(circle.pos, delta, 8, 8), null);
      assert.equal(box.sweepCircle(circle, delta).hit, null);
    });

    test("should collide against a rounded corner", () => {
      const box = new AABB(new Point(0, 0), new Point(16, 16));
      const circle = new Circle(new Point(-64, 16 + 4), 8);
      const sweep = box.sweepCircle(circle, new Point(128, 0));
      const hit = assertNotNull(sweep.hit);
      assert.equal(hit.collider, box);
      // The contact is on the corner itself.
      almostEqual(hit.pos.x, -16);
      almostEqual(hit.pos.y, 16);
    });

    test("should do a static test when the delta is zero", () => {
      const box = new AABB(new Point(0, 0), new Point(16, 16));
      const circle = new Circle(new Point(20, 0), 8);
      const sweep = box.sweepCircle(circle, new Point(0, 0));
      assert.ok(sweep.hit instanceof Hit);
      almostEqual(sweep.time, 0);
      almostEqual(sweep.pos.x, circle.pos.x);
    });
  });

  describe("sweepInto", () => {
    test("should stop a moving box against a static circle", () => {
      const mover = new AABB(new Point(0, 0), new Point(8, 8));
      const wall = new AABB(new Point(128, 0), new Point(8, 8));
      const pillar = new Circle(new Point(64, 0), 16);
      const sweep = mover.sweepInto([wall, pillar], new Point(256, 0));
      const hit = assertNotNull(sweep.hit);
      assert.equal(hit.collider, pillar);
      // The box's face meets the circle 64 - 16 - 8 = 40 units out.
      almostEqual(sweep.time, 40 / 256 - EPSILON);
    });
  });
});

describe("Circle vs swept AABB", () => {
  test("should return sweep when not colliding", () => {
    const circle = new Circle(new Point(0, 0), 16);
    const box = new AABB(new Point(-64, 64), new Point(8, 8));
    const delta = new Point(128, 0);
    const sweep = circle.sweepAABB(box, delta);
    assert.equal(sweep.hit, null);
    almostEqual(sweep.time, 1);
    almostEqual(sweep.pos.x, box.pos.x + delta.x);
  });

  test("should stop the box against the circle", () => {
    const circle = new Circle(new Point(0, 0), 16);
    const box = new AABB(new Point(-64, 0), new Point(8, 8));
    const delta = new Point(128, 0);
    const sweep = circle.sweepAABB(box, delta);
    const hit = assertNotNull(sweep.hit);
    assert.equal(hit.collider, circle);
    const time = 0.3125 - EPSILON;
    almostEqual(sweep.time, time);
    almostEqual(sweep.pos.x, box.pos.x + delta.x * time);
  });

  test("should put hit.pos on the edge of the circle", () => {
    const circle = new Circle(new Point(0, 0), 16);
    const box = new AABB(new Point(-64, 0), new Point(8, 8));
    const sweep = circle.sweepAABB(box, new Point(128, 0));
    const hit = assertNotNull(sweep.hit);
    almostEqual(hit.pos.x, -16);
    almostEqual(hit.pos.y, 0);
    almostEqual(hit.normal.x, -1);
    almostEqual(hit.normal.y, 0);
  });

  test("should not collide with the empty square past a corner", () => {
    const circle = new Circle(new Point(0, 0), 16);
    const box = new AABB(new Point(26, 20), new Point(8, 8));
    const sweep = circle.sweepAABB(box, new Point(-6, 6));
    assert.equal(sweep.hit, null);
  });

  test("should do a static test when the delta is zero", () => {
    const circle = new Circle(new Point(0, 0), 16);
    const box = new AABB(new Point(20, 0), new Point(8, 8));
    const sweep = circle.sweepAABB(box, new Point(0, 0));
    assert.ok(sweep.hit instanceof Hit);
    almostEqual(sweep.time, 0);
  });
});
