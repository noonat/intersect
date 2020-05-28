import * as assert from "assert";
import { AABB, EPSILON, Hit, Point, Sweep } from "../src/intersect";

function almostEqual(actual: number, expected: number, message?: string) {
  if (Math.abs(actual - expected) > 1e-8) {
    assert.equal(actual, expected, message);
  }
}

function assertNotNull<T>(value: T | null): T {
  if (value === null) {
    throw new Error("value is unexpectedly null");
  }
  return value;
}

describe("AABB", () => {
  describe("intersectPoint", () => {
    test("should return null when not colliding", () => {
      const aabb = new AABB(new Point(0, 0), new Point(8, 8));
      const points = [
        new Point(-16, -16),
        new Point(0, -16),
        new Point(16, -16),
        new Point(16, 0),
        new Point(16, 16),
        new Point(0, 16),
        new Point(-16, 16),
        new Point(-16, 0)
      ];
      points.forEach(point => {
        assert.equal(aabb.intersectPoint(point), null);
      });
    });

    test("should return hit when colliding", () => {
      const aabb = new AABB(new Point(0, 0), new Point(8, 8));
      const point = new Point(4, 4);
      const hit = assertNotNull(aabb.intersectPoint(point));
      assert.ok(hit instanceof Hit);
    });

    test("should set hit pos and normal to nearest edge of box", () => {
      const aabb = new AABB(new Point(0, 0), new Point(8, 8));
      let hit = assertNotNull(aabb.intersectPoint(new Point(-4, -2)));
      almostEqual(hit.pos.x, -8);
      almostEqual(hit.pos.y, -2);
      almostEqual(hit.delta.x, -4);
      almostEqual(hit.delta.y, 0);
      almostEqual(hit.normal.x, -1);
      almostEqual(hit.normal.y, 0);
      hit = assertNotNull(aabb.intersectPoint(new Point(4, -2)));
      almostEqual(hit.pos.x, 8);
      almostEqual(hit.pos.y, -2);
      almostEqual(hit.delta.x, 4);
      almostEqual(hit.delta.y, 0);
      almostEqual(hit.normal.x, 1);
      almostEqual(hit.normal.y, 0);
      hit = assertNotNull(aabb.intersectPoint(new Point(2, -4)));
      almostEqual(hit.pos.x, 2);
      almostEqual(hit.pos.y, -8);
      almostEqual(hit.delta.x, 0);
      almostEqual(hit.delta.y, -4);
      almostEqual(hit.normal.x, 0);
      almostEqual(hit.normal.y, -1);
      hit = assertNotNull(aabb.intersectPoint(new Point(2, 4)));
      almostEqual(hit.pos.x, 2);
      almostEqual(hit.pos.y, 8);
      almostEqual(hit.delta.x, 0);
      almostEqual(hit.delta.y, 4);
      almostEqual(hit.normal.x, 0);
      almostEqual(hit.normal.y, 1);
    });
  });

  describe("intersectSegment", () => {
    test("should return null when not colliding", () => {
      const aabb = new AABB(new Point(0, 0), new Point(8, 8));
      assert.equal(
        aabb.intersectSegment(new Point(-16, -16), new Point(32, 0)),
        null
      );
    });

    test("should return hit when colliding", () => {
      const aabb = new AABB(new Point(0, 0), new Point(8, 8));
      const point = new Point(-16, 4);
      const delta = new Point(32, 0);
      const hit = assertNotNull(aabb.intersectSegment(point, delta));
      assert.ok(hit instanceof Hit);
      const time = 0.25;
      assert.equal(hit.collider, aabb);
      almostEqual(hit.time, time);
      almostEqual(hit.pos.x, point.x + delta.x * time);
      almostEqual(hit.pos.y, point.y + delta.y * time);
      almostEqual(hit.delta.x, (1.0 - time) * -delta.x);
      almostEqual(hit.delta.y, (1.0 - time) * -delta.y);
      almostEqual(hit.normal.x, -1);
      almostEqual(hit.normal.y, 0);
    });

    test("should set hit.time to zero when segment starts inside box", () => {
      const aabb = new AABB(new Point(0, 0), new Point(8, 8));
      const point = new Point(-4, 4);
      const delta = new Point(32, 0);
      const hit = assertNotNull(aabb.intersectSegment(point, delta));
      almostEqual(hit.time, 0);
      almostEqual(hit.pos.x, -4);
      almostEqual(hit.pos.y, 4);
      almostEqual(hit.delta.x, -delta.x);
      almostEqual(hit.delta.y, -delta.y);
      almostEqual(hit.normal.x, -1);
      almostEqual(hit.normal.y, 0);
    });

    test("should add padding to half size of box", () => {
      const aabb = new AABB(new Point(0, 0), new Point(8, 8));
      const point = new Point(-16, 4);
      const delta = new Point(32, 0);
      const padding = 4;
      const hit = assertNotNull(
        aabb.intersectSegment(point, delta, padding, padding)
      );
      const time = 0.125;
      assert.equal(hit.collider, aabb);
      almostEqual(hit.time, time);
      almostEqual(hit.pos.x, point.x + delta.x * time);
      almostEqual(hit.pos.y, point.y + delta.y * time);
      almostEqual(hit.delta.x, (1.0 - time) * -delta.x);
      almostEqual(hit.delta.y, (1.0 - time) * -delta.y);
      almostEqual(hit.normal.x, -1);
      almostEqual(hit.normal.y, 0);
    });

    test("should have consistent results in both directions", () => {
      // If moving from far away to the near edge of the box doesn't cause a
      // collision, then moving away from the near edge shouldn't either.
      const aabb = new AABB(new Point(0, 0), new Point(32, 32));
      const farPos = new Point(64, 0);
      const farToNearDelta = new Point(-32, 0);
      assert.equal(aabb.intersectSegment(farPos, farToNearDelta), null);
      const nearPos = new Point(32, 0);
      const nearToFarDelta = new Point(32, 0);
      assert.equal(aabb.intersectSegment(nearPos, nearToFarDelta), null);
    });

    test("should work when segment is axis aligned", () => {
      // When the segment is axis aligned, it will cause the near and far values
      // to be Infinity and -Infinity. Make sure that this case works.
      const aabb = new AABB(new Point(0, 0), new Point(16, 16));
      const pos = new Point(-32, 0);
      const delta = new Point(64, 0);
      const hit = assertNotNull(aabb.intersectSegment(pos, delta));
      assert.equal(hit.time, 0.25);
      assert.equal(hit.normal.x, -1);
      assert.equal(hit.normal.y, 0);
    });

    test("should return null when line is aligned with box top Y", () => {
      const aabb = new AABB(new Point(907.5, 318.5), new Point(7.5, 17.5));
      assert.equal(
        aabb.intersectSegment(new Point(531, 301), new Point(16, 0)),
        null
      );
    });

  });

  describe("intersectAABB", () => {
    test("should return null when not colliding", () => {
      const aabb1 = new AABB(new Point(0, 0), new Point(8, 8));
      const aabb2 = new AABB(new Point(32, 0), new Point(8, 8));
      assert.equal(aabb1.intersectAABB(aabb2), null);
      aabb2.pos = new Point(-32, 0);
      assert.equal(aabb1.intersectAABB(aabb2), null);
      aabb2.pos = new Point(0, 32);
      assert.equal(aabb1.intersectAABB(aabb2), null);
      aabb2.pos = new Point(0, -32);
      assert.equal(aabb1.intersectAABB(aabb2), null);
      aabb2.pos = new Point(0, -32);
      assert.equal(aabb1.intersectAABB(aabb2), null);
    });

    test("should return null when edges are flush", () => {
      const aabb1 = new AABB(new Point(0, 0), new Point(8, 8));
      const aabb2 = new AABB(new Point(16, 0), new Point(8, 8));
      assert.equal(aabb1.intersectAABB(aabb2), null);
      aabb2.pos = new Point(-16, 0);
      assert.equal(aabb1.intersectAABB(aabb2), null);
      aabb2.pos = new Point(0, 16);
      assert.equal(aabb1.intersectAABB(aabb2), null);
      aabb2.pos = new Point(0, -16);
      assert.equal(aabb1.intersectAABB(aabb2), null);
      aabb2.pos = new Point(0, -16);
      assert.equal(aabb1.intersectAABB(aabb2), null);
    });

    test("should return hit when colliding", () => {
      const aabb1 = new AABB(new Point(0, 0), new Point(8, 8));
      const aabb2 = new AABB(new Point(8, 0), new Point(8, 8));
      const hit = aabb1.intersectAABB(aabb2);
      assert.notEqual(hit, null);
      assert.ok(hit instanceof Hit);
    });

    test("should set hit.pos and hit.normal to nearest edge of box 1", () => {
      const aabb1 = new AABB(new Point(0, 0), new Point(8, 8));
      const aabb2 = new AABB(new Point(4, 0), new Point(8, 8));
      let hit = assertNotNull(aabb1.intersectAABB(aabb2));
      almostEqual(hit.pos.x, 8);
      almostEqual(hit.pos.y, 0);
      almostEqual(hit.normal.x, 1);
      almostEqual(hit.normal.y, 0);

      aabb2.pos = new Point(-4, 0);
      hit = assertNotNull(aabb1.intersectAABB(aabb2));
      almostEqual(hit.pos.x, -8);
      almostEqual(hit.pos.y, 0);
      almostEqual(hit.normal.x, -1);
      almostEqual(hit.normal.y, 0);

      aabb2.pos = new Point(0, 4);
      hit = assertNotNull(aabb1.intersectAABB(aabb2));
      almostEqual(hit.pos.x, 0);
      almostEqual(hit.pos.y, 8);
      almostEqual(hit.normal.x, 0);
      almostEqual(hit.normal.y, 1);

      aabb2.pos = new Point(0, -4);
      hit = assertNotNull(aabb1.intersectAABB(aabb2));
      almostEqual(hit.pos.x, 0);
      almostEqual(hit.pos.y, -8);
      almostEqual(hit.normal.x, 0);
      almostEqual(hit.normal.y, -1);
    });

    test("should set hit.delta to move box 2 out of collision", () => {
      const aabb1 = new AABB(new Point(0, 0), new Point(8, 8));
      const aabb2 = new AABB(new Point(4, 0), new Point(8, 8));
      let hit = assertNotNull(aabb1.intersectAABB(aabb2));
      almostEqual(hit.delta.x, 12);
      almostEqual(hit.delta.y, 0);
      aabb2.pos.x += hit.delta.x;
      aabb2.pos.y += hit.delta.y;
      assert.equal(aabb1.intersectAABB(aabb2), null);

      aabb2.pos = new Point(-4, 0);
      hit = assertNotNull(aabb1.intersectAABB(aabb2));
      almostEqual(hit.delta.x, -12);
      almostEqual(hit.delta.y, 0);
      aabb2.pos.x += hit.delta.x;
      aabb2.pos.y += hit.delta.y;
      assert.equal(aabb1.intersectAABB(aabb2), null);

      aabb2.pos = new Point(0, 4);
      hit = assertNotNull(aabb1.intersectAABB(aabb2));
      almostEqual(hit.delta.x, 0);
      almostEqual(hit.delta.y, 12);
      aabb2.pos.x += hit.delta.x;
      aabb2.pos.y += hit.delta.y;
      assert.equal(aabb1.intersectAABB(aabb2), null);

      aabb2.pos = new Point(0, -4);
      hit = assertNotNull(aabb1.intersectAABB(aabb2));
      almostEqual(hit.delta.x, 0);
      almostEqual(hit.delta.y, -12);
      aabb2.pos.x += hit.delta.x;
      aabb2.pos.y += hit.delta.y;
      assert.equal(aabb1.intersectAABB(aabb2), null);
    });
  });

  describe("sweepAABB", () => {
    test("should return sweep when not colliding", () => {
      const aabb1 = new AABB(new Point(0, 0), new Point(16, 16));
      const aabb2 = new AABB(new Point(64, -64), new Point(8, 8));
      const delta = new Point(0, 128);
      const sweep = aabb1.sweepAABB(aabb2, delta);
      assert.ok(sweep instanceof Sweep);
      assert.ok(sweep.pos instanceof Point);
      assert.equal(sweep.hit, null);
      almostEqual(sweep.pos.x, aabb2.pos.x + delta.x);
      almostEqual(sweep.pos.y, aabb2.pos.y + delta.y);
    });

    test("should return sweep with sweep.hit when colliding", () => {
      const aabb1 = new AABB(new Point(0, 0), new Point(16, 16));
      const aabb2 = new AABB(new Point(0, -64), new Point(8, 8));
      const delta = new Point(0, 128);
      const sweep = aabb1.sweepAABB(aabb2, delta);
      assert.ok(sweep instanceof Sweep);
      assert.ok(sweep.hit instanceof Hit);
      assert.ok(sweep.pos instanceof Point);
    });

    test("should place sweep.pos at a non-colliding point", () => {
      const aabb1 = new AABB(new Point(0, 0), new Point(16, 16));
      const aabb2 = new AABB(new Point(0, -64), new Point(8, 8));
      const delta = new Point(0, 128);
      const sweep = aabb1.sweepAABB(aabb2, delta);
      const time = 0.3125 - EPSILON;
      almostEqual(sweep.time, time);
      almostEqual(sweep.pos.x, aabb2.pos.x + delta.x * time);
      almostEqual(sweep.pos.y, aabb2.pos.y + delta.y * time);
    });

    test("should place sweep.hit.pos on the edge of the box", () => {
      const aabb1 = new AABB(new Point(0, 0), new Point(16, 16));
      const aabb2 = new AABB(new Point(0, -64), new Point(8, 8));
      const delta = new Point(0, 128);
      const sweep = aabb1.sweepAABB(aabb2, delta);
      const time = 0.3125;
      const direction = delta.clone();
      direction.normalize();
      const hit = assertNotNull(sweep.hit);
      almostEqual(hit.time, time);
      almostEqual(
        hit.pos.x,
        aabb2.pos.x + delta.x * time + direction.x * aabb2.half.x
      );
      almostEqual(
        hit.pos.y,
        aabb2.pos.y + delta.y * time + direction.y * aabb2.half.y
      );
      almostEqual(hit.delta.x, (1.0 - time) * -delta.x);
      almostEqual(hit.delta.y, (1.0 - time) * -delta.y);
    });

    test("should set sweep.hit.normal to normals of box 1", () => {
      const aabb1 = new AABB(new Point(0, 0), new Point(16, 16));
      const aabb2 = new AABB(new Point(0, -64), new Point(8, 8));
      const delta = new Point(0, 128);
      const sweep = aabb1.sweepAABB(aabb2, delta);
      const hit = assertNotNull(sweep.hit);
      almostEqual(hit.normal.x, 0);
      almostEqual(hit.normal.y, -1);
    });

    test("should not move when the start position is colliding", () => {
      const aabb1 = new AABB(new Point(0, 0), new Point(16, 16));
      const aabb2 = new AABB(new Point(0, -4), new Point(8, 8));
      const delta = new Point(0, 128);
      const sweep = aabb1.sweepAABB(aabb2, delta);
      almostEqual(sweep.pos.x, 0);
      almostEqual(sweep.pos.y, -4);
      const hit = assertNotNull(sweep.hit);
      almostEqual(hit.time, 0);
      almostEqual(hit.delta.x, -delta.x);
      almostEqual(hit.delta.y, -delta.y);
    });
  });
});
