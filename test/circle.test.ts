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
});
