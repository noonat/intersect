assert = require('assert')
intersect = require('../intersect')
AABB = intersect.AABB
Point = intersect.Point

assert.almostEqual = (actual, expected, message) ->
  if Math.abs(actual - expected) > 1e-8
    assert.equal(actual, expected, message)

module.exports =
  'intersectPoint should return null when not colliding': (test) ->
    aabb = new AABB(new Point(0, 0), new Point(8, 8))
    points = [
      new Point(-16, -16)
      new Point(  0, -16)
      new Point( 16, -16)
      new Point( 16,   0)
      new Point( 16,  16)
      new Point(  0,  16)
      new Point(-16,  16)
      new Point(-16,   0)
    ]
    for point in points
      assert.equal(aabb.intersectPoint(point), null)
    test.done()

  'intersectPoint should return hit when colliding': (test) ->
    aabb = new AABB(new Point(0, 0), new Point(8, 8))
    point = new Point(4, 4)
    hit = aabb.intersectPoint(point)
    assert.notEqual(hit, null)
    assert.ok(hit instanceof intersect.Hit)
    test.done()

  'intersectPoint should set hit pos and normal to nearest edge of box': (test) ->
    aabb = new AABB(new Point(0, 0), new Point(8, 8))
    hit = aabb.intersectPoint(new Point(-4, -2))
    assert.almostEqual(hit.pos.x, -8)
    assert.almostEqual(hit.pos.y, -2)
    assert.almostEqual(hit.delta.x, -4)
    assert.almostEqual(hit.delta.y, 0)
    assert.almostEqual(hit.normal.x, -1)
    assert.almostEqual(hit.normal.y, 0)
    hit = aabb.intersectPoint(new Point(4, -2))
    assert.almostEqual(hit.pos.x, 8)
    assert.almostEqual(hit.pos.y, -2)
    assert.almostEqual(hit.delta.x, 4)
    assert.almostEqual(hit.delta.y, 0)
    assert.almostEqual(hit.normal.x, 1)
    assert.almostEqual(hit.normal.y, 0)
    hit = aabb.intersectPoint(new Point(2, -4))
    assert.almostEqual(hit.pos.x, 2)
    assert.almostEqual(hit.pos.y, -8)
    assert.almostEqual(hit.delta.x, 0)
    assert.almostEqual(hit.delta.y, -4)
    assert.almostEqual(hit.normal.x, 0)
    assert.almostEqual(hit.normal.y, -1)
    hit = aabb.intersectPoint(new Point(2, 4))
    assert.almostEqual(hit.pos.x, 2)
    assert.almostEqual(hit.pos.y, 8)
    assert.almostEqual(hit.delta.x, 0)
    assert.almostEqual(hit.delta.y, 4)
    assert.almostEqual(hit.normal.x, 0)
    assert.almostEqual(hit.normal.y, 1)
    test.done()

  'intersectSegment should return null when not colliding': (test) ->
    aabb = new AABB(new Point(0, 0), new Point(8, 8))
    assert.equal(aabb.intersectSegment(new Point(-16, -16), new Point(32, 0)), null)
    test.done()

  'intersectSegment should return hit when colliding': (test) ->
    aabb = new AABB(new Point(0, 0), new Point(8, 8))
    point = new Point(-16, 4)
    delta = new Point(32, 0)
    hit = aabb.intersectSegment(point, delta)
    assert.notEqual(hit, null)
    assert.ok(hit instanceof intersect.Hit)
    time = 0.25
    assert.equal(hit.collider, aabb)
    assert.almostEqual(hit.time, time)
    assert.almostEqual(hit.pos.x, point.x + delta.x * time)
    assert.almostEqual(hit.pos.y, point.y + delta.y * time)
    assert.almostEqual(hit.delta.x, delta.x * time)
    assert.almostEqual(hit.delta.y, delta.y * time)
    assert.almostEqual(hit.normal.x, -1)
    assert.almostEqual(hit.normal.y, 0)
    test.done()

  'intersectSegment should set hit.time to zero when segment starts inside box': (test) ->
    aabb = new AABB(new Point(0, 0), new Point(8, 8))
    point = new Point(-4, 4)
    delta = new Point(32, 0)
    hit = aabb.intersectSegment(point, delta)
    assert.almostEqual(hit.time, 0)
    assert.almostEqual(hit.pos.x, -4)
    assert.almostEqual(hit.pos.y, 4)
    assert.almostEqual(hit.delta.x, 0)
    assert.almostEqual(hit.delta.y, 0)
    assert.almostEqual(hit.normal.x, -1)
    assert.almostEqual(hit.normal.y, 0)
    test.done()

  'intersectSegment should add padding to half size of box': (test) ->
    aabb = new AABB(new Point(0, 0), new Point(8, 8))
    point = new Point(-16, 4)
    delta = new Point(32, 0)
    padding = 4
    hit = aabb.intersectSegment(point, delta, padding, padding)
    time = 0.125
    assert.equal(hit.collider, aabb)
    assert.almostEqual(hit.time, time)
    assert.almostEqual(hit.pos.x, point.x + delta.x * time)
    assert.almostEqual(hit.pos.y, point.y + delta.y * time)
    assert.almostEqual(hit.delta.x, delta.x * time)
    assert.almostEqual(hit.delta.y, delta.y * time)
    assert.almostEqual(hit.normal.x, -1)
    assert.almostEqual(hit.normal.y, 0)
    test.done()

  'intersectAABB should return null when not colliding': (test) ->
    aabb1 = new AABB(new Point(0, 0), new Point(8, 8))
    aabb2 = new AABB(new Point(32, 0), new Point(8, 8))
    assert.equal(aabb1.intersectAABB(aabb2), null)
    aabb2.pos = new Point(-32, 0)
    assert.equal(aabb1.intersectAABB(aabb2), null)
    aabb2.pos = new Point(0, 32)
    assert.equal(aabb1.intersectAABB(aabb2), null)
    aabb2.pos = new Point(0, -32)
    assert.equal(aabb1.intersectAABB(aabb2), null)
    aabb2.pos = new Point(0, -32)
    assert.equal(aabb1.intersectAABB(aabb2), null)
    test.done()

  'intersectAABB should return null when edges are flush': (test) ->
    aabb1 = new AABB(new Point(0, 0), new Point(8, 8))
    aabb2 = new AABB(new Point(16, 0), new Point(8, 8))
    assert.equal(aabb1.intersectAABB(aabb2), null)
    aabb2.pos = new Point(-16, 0)
    assert.equal(aabb1.intersectAABB(aabb2), null)
    aabb2.pos = new Point(0, 16)
    assert.equal(aabb1.intersectAABB(aabb2), null)
    aabb2.pos = new Point(0, -16)
    assert.equal(aabb1.intersectAABB(aabb2), null)
    aabb2.pos = new Point(0, -16)
    assert.equal(aabb1.intersectAABB(aabb2), null)
    test.done()

  'intersectAABB should return hit when colliding': (test) ->
    aabb1 = new AABB(new Point(0, 0), new Point(8, 8))
    aabb2 = new AABB(new Point(8, 0), new Point(8, 8))
    hit = aabb1.intersectAABB(aabb2)
    assert.notEqual(hit, null)
    assert.ok(hit instanceof intersect.Hit)
    test.done()

  'intersectAABB should set hit.pos and hit.normal to nearest edge of box 1': (test) ->
    aabb1 = new AABB(new Point(0, 0), new Point(8, 8))
    aabb2 = new AABB(new Point(4, 0), new Point(8, 8))
    hit = aabb1.intersectAABB(aabb2)
    assert.almostEqual(hit.pos.x, 8)
    assert.almostEqual(hit.pos.y, 0)
    assert.almostEqual(hit.normal.x, 1)
    assert.almostEqual(hit.normal.y, 0)

    aabb2.pos = new Point(-4, 0)
    hit = aabb1.intersectAABB(aabb2)
    assert.almostEqual(hit.pos.x, -8)
    assert.almostEqual(hit.pos.y, 0)
    assert.almostEqual(hit.normal.x, -1)
    assert.almostEqual(hit.normal.y, 0)

    aabb2.pos = new Point(0, 4)
    hit = aabb1.intersectAABB(aabb2)
    assert.almostEqual(hit.pos.x, 0)
    assert.almostEqual(hit.pos.y, 8)
    assert.almostEqual(hit.normal.x, 0)
    assert.almostEqual(hit.normal.y, 1)

    aabb2.pos = new Point(0, -4)
    hit = aabb1.intersectAABB(aabb2)
    assert.almostEqual(hit.pos.x, 0)
    assert.almostEqual(hit.pos.y, -8)
    assert.almostEqual(hit.normal.x, 0)
    assert.almostEqual(hit.normal.y, -1)
    test.done()

  'intersectAABB should set hit.delta to move box 2 out of collision': (test) ->
    aabb1 = new AABB(new Point(0, 0), new Point(8, 8))
    aabb2 = new AABB(new Point(4, 0), new Point(8, 8))
    hit = aabb1.intersectAABB(aabb2)
    assert.almostEqual(hit.delta.x, 12)
    assert.almostEqual(hit.delta.y, 0)
    aabb2.pos.x += hit.delta.x
    aabb2.pos.y += hit.delta.y
    assert.equal(aabb1.intersectAABB(aabb2), null)

    aabb2.pos = new Point(-4, 0)
    hit = aabb1.intersectAABB(aabb2)
    assert.almostEqual(hit.delta.x, -12)
    assert.almostEqual(hit.delta.y, 0)
    aabb2.pos.x += hit.delta.x
    aabb2.pos.y += hit.delta.y
    assert.equal(aabb1.intersectAABB(aabb2), null)

    aabb2.pos = new Point(0, 4)
    hit = aabb1.intersectAABB(aabb2)
    assert.almostEqual(hit.delta.x, 0)
    assert.almostEqual(hit.delta.y, 12)
    aabb2.pos.x += hit.delta.x
    aabb2.pos.y += hit.delta.y
    assert.equal(aabb1.intersectAABB(aabb2), null)

    aabb2.pos = new Point(0, -4)
    hit = aabb1.intersectAABB(aabb2)
    assert.almostEqual(hit.delta.x, 0)
    assert.almostEqual(hit.delta.y, -12)
    aabb2.pos.x += hit.delta.x
    aabb2.pos.y += hit.delta.y
    assert.equal(aabb1.intersectAABB(aabb2), null)

    test.done()

  'sweepAABB should return sweep when not colliding': (test) ->
    aabb1 = new AABB(new Point(0, 0), new Point(16, 16))
    aabb2 = new AABB(new Point(64, -64), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = aabb1.sweepAABB(aabb2, delta)
    assert.ok(sweep instanceof intersect.Sweep)
    assert.ok(sweep.pos instanceof intersect.Point)
    assert.equal(sweep.hit, null)
    assert.almostEqual(sweep.pos.x, aabb2.pos.x + delta.x)
    assert.almostEqual(sweep.pos.y, aabb2.pos.y + delta.y)
    test.done()

  'sweepAABB should return sweep with sweep.hit when colliding': (test) ->
    aabb1 = new AABB(new Point(0, 0), new Point(16, 16))
    aabb2 = new AABB(new Point(0, -64), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = aabb1.sweepAABB(aabb2, delta)
    assert.ok(sweep instanceof intersect.Sweep)
    assert.ok(sweep.hit instanceof intersect.Hit)
    assert.ok(sweep.pos instanceof intersect.Point)
    test.done()

  'sweepAABB should place sweep.pos at a non-colliding point': (test) ->
    aabb1 = new AABB(new Point(0, 0), new Point(16, 16))
    aabb2 = new AABB(new Point(0, -64), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = aabb1.sweepAABB(aabb2, delta)
    time = 0.3125 - intersect.epsilon
    assert.almostEqual(sweep.time, time)
    assert.almostEqual(sweep.pos.x, aabb2.pos.x + delta.x * time)
    assert.almostEqual(sweep.pos.y, aabb2.pos.y + delta.y * time)
    test.done()

  'sweepAABB should place sweep.hit.pos on the edge of the box': (test) ->
    aabb1 = new AABB(new Point(0, 0), new Point(16, 16))
    aabb2 = new AABB(new Point(0, -64), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = aabb1.sweepAABB(aabb2, delta)
    time = 0.3125
    direction = delta.clone()
    direction.normalize()
    assert.almostEqual(sweep.hit.time, time)
    assert.almostEqual(sweep.hit.pos.x, aabb2.pos.x + delta.x * time + direction.x * aabb2.half.x)
    assert.almostEqual(sweep.hit.pos.y, aabb2.pos.y + delta.y * time + direction.y * aabb2.half.y)
    assert.almostEqual(sweep.hit.delta.x, delta.x * time)
    assert.almostEqual(sweep.hit.delta.y, delta.y * time)
    test.done()

  'sweepAABB should set sweep.hit.normal to normals of box 1': (test) ->
    aabb1 = new AABB(new Point(0, 0), new Point(16, 16))
    aabb2 = new AABB(new Point(0, -64), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = aabb1.sweepAABB(aabb2, delta)
    assert.almostEqual(sweep.hit.normal.x, 0)
    assert.almostEqual(sweep.hit.normal.y, -1)
    test.done()

  'sweepAABB should not move when the start position is colliding': (test) ->
    aabb1 = new AABB(new Point(0, 0), new Point(16, 16))
    aabb2 = new AABB(new Point(0, -4), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = aabb1.sweepAABB(aabb2, delta)
    assert.almostEqual(sweep.pos.x, 0)
    assert.almostEqual(sweep.pos.y, -4)
    assert.almostEqual(sweep.hit.time, 0)
    assert.almostEqual(sweep.hit.delta.x, 0)
    assert.almostEqual(sweep.hit.delta.y, 0)
    test.done()
