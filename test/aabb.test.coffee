assert = require('assert')
intersect = require('../lib/intersect')
AABB = intersect.AABB
Point = intersect.Point

assert.almostEqual = (actual, expected, message) ->
  if Math.abs(actual - expected) >= 1e-8
    assert.equal(actual, expected, message)

module.exports =
  'intersectPoint should return null when not colliding': (test) ->
    b = new AABB(new Point(0, 0), new Point(8, 8))
    points = [
      new Point(-16, -16),
      new Point(  0, -16),
      new Point( 16, -16),
      new Point( 16,   0),
      new Point( 16,  16),
      new Point(  0,  16),
      new Point(-16,  16),
      new Point(-16,   0)]
    for p in points
      assert.equal(b.intersectPoint(p), null)
    test.finish()
  
  'intersectPoint should return hit when colliding': (test) ->
    b = new AABB(new Point(0, 0), new Point(8, 8))
    p = new Point(4, 4)
    hit = b.intersectPoint(p)
    assert.notEqual(hit, null)
    assert.ok(hit instanceof intersect.Hit)
    test.finish()
  
  'intersectPoint should set hit pos and normal to nearest edge of box': (test) ->
    b = new AABB(new Point(0, 0), new Point(8, 8))
    hit = b.intersectPoint(new Point(-4, -2))
    assert.almostEqual(hit.pos.x, -8)
    assert.almostEqual(hit.pos.y, -2)
    assert.almostEqual(hit.delta.x, -4)
    assert.almostEqual(hit.delta.y, 0)
    assert.almostEqual(hit.normal.x, -1)
    assert.almostEqual(hit.normal.y, 0)
    hit = b.intersectPoint(new Point(4, -2))
    assert.almostEqual(hit.pos.x, 8)
    assert.almostEqual(hit.pos.y, -2)
    assert.almostEqual(hit.delta.x, 4)
    assert.almostEqual(hit.delta.y, 0)
    assert.almostEqual(hit.normal.x, 1)
    assert.almostEqual(hit.normal.y, 0)
    hit = b.intersectPoint(new Point(2, -4))
    assert.almostEqual(hit.pos.x, 2)
    assert.almostEqual(hit.pos.y, -8)
    assert.almostEqual(hit.delta.x, 0)
    assert.almostEqual(hit.delta.y, -4)
    assert.almostEqual(hit.normal.x, 0)
    assert.almostEqual(hit.normal.y, -1)
    hit = b.intersectPoint(new Point(2, 4))
    assert.almostEqual(hit.pos.x, 2)
    assert.almostEqual(hit.pos.y, 8)
    assert.almostEqual(hit.delta.x, 0)
    assert.almostEqual(hit.delta.y, 4)
    assert.almostEqual(hit.normal.x, 0)
    assert.almostEqual(hit.normal.y, 1)
    test.finish()
  
  'intersectSegment should return null when not colliding': (test) ->
    b = new AABB(new Point(0, 0), new Point(8, 8))
    assert.equal(b.intersectSegment(new Point(-16, -16), new Point(32, 0)), null)
    test.finish()
  
  'intersectSegment should return hit when colliding': (test) ->
    b = new AABB(new Point(0, 0), new Point(8, 8))
    hit = b.intersectSegment(new Point(-16, 4), new Point(32, 0))
    assert.notEqual(hit, null)
    assert.ok(hit instanceof intersect.Hit)
    assert.almostEqual(hit.time, 0.25)
    assert.almostEqual(hit.pos.x, -8)
    assert.almostEqual(hit.pos.y, 4)
    assert.almostEqual(hit.delta.x, 8)
    assert.almostEqual(hit.delta.y, 0)
    assert.almostEqual(hit.normal.x, -1)
    assert.almostEqual(hit.normal.y, 0)
    test.finish()
  
  'intersectSegment should set hit.time to zero when segment starts inside box': (test) ->
    b = new AABB(new Point(0, 0), new Point(8, 8))
    hit = b.intersectSegment(new Point(-4, 4), new Point(32, 0))
    assert.almostEqual(hit.time, 0)
    assert.almostEqual(hit.pos.x, -4)
    assert.almostEqual(hit.pos.y, 4)
    assert.almostEqual(hit.delta.x, 0)
    assert.almostEqual(hit.delta.y, 0)
    assert.almostEqual(hit.normal.x, -1)
    assert.almostEqual(hit.normal.y, 0)
    test.finish()
  
  'intersectSegment should add padding to half size of box': (test) ->
    b = new AABB(new Point(0, 0), new Point(8, 8))
    hit = b.intersectSegment(new Point(-16, 4), new Point(32, 0), 4, 4)
    assert.almostEqual(hit.time, 0.125)
    assert.almostEqual(hit.pos.x, -12)
    assert.almostEqual(hit.pos.y, 4)
    assert.almostEqual(hit.delta.x, 4)
    assert.almostEqual(hit.delta.y, 0)
    assert.almostEqual(hit.normal.x, -1)
    assert.almostEqual(hit.normal.y, 0)
    test.finish()
  
  'intersectAABB should return null when not colliding': (test) ->
    b1 = new AABB(new Point(0, 0), new Point(8, 8))
    b2 = new AABB(new Point(32, 0), new Point(8, 8))
    assert.equal(b1.intersectAABB(b2), null)
    b2.pos = new Point(-32, 0)
    assert.equal(b1.intersectAABB(b2), null)
    b2.pos = new Point(0, 32)
    assert.equal(b1.intersectAABB(b2), null)
    b2.pos = new Point(0, -32)
    assert.equal(b1.intersectAABB(b2), null)
    b2.pos = new Point(0, -32)
    assert.equal(b1.intersectAABB(b2), null)
    test.finish()

  'intersectAABB should return null when edges are flush': (test) ->
    b1 = new AABB(new Point(0, 0), new Point(8, 8))
    b2 = new AABB(new Point(16, 0), new Point(8, 8))
    assert.equal(b1.intersectAABB(b2), null)
    b2.pos = new Point(-16, 0)
    assert.equal(b1.intersectAABB(b2), null)
    b2.pos = new Point(0, 16)
    assert.equal(b1.intersectAABB(b2), null)
    b2.pos = new Point(0, -16)
    assert.equal(b1.intersectAABB(b2), null)
    b2.pos = new Point(0, -16)
    assert.equal(b1.intersectAABB(b2), null)
    test.finish()
  
  'intersectAABB should return hit when colliding': (test) ->
    b1 = new AABB(new Point(0, 0), new Point(8, 8))
    b2 = new AABB(new Point(8, 0), new Point(8, 8))
    hit = b1.intersectAABB(b2)
    assert.notEqual(hit, null)
    assert.ok(hit instanceof intersect.Hit)
    test.finish()
  
  'intersectAABB should set hit.pos and hit.normal to nearest edge of box 1': (test) ->
    b1 = new AABB(new Point(0, 0), new Point(8, 8))
    b2 = new AABB(new Point(4, 0), new Point(8, 8))
    hit = b1.intersectAABB(b2)
    assert.almostEqual(hit.pos.x, 8)
    assert.almostEqual(hit.pos.y, 0)
    assert.almostEqual(hit.normal.x, 1)
    assert.almostEqual(hit.normal.y, 0)
    
    b2.pos = new Point(-4, 0)
    hit = b1.intersectAABB(b2)
    assert.almostEqual(hit.pos.x, -8)
    assert.almostEqual(hit.pos.y, 0)
    assert.almostEqual(hit.normal.x, -1)
    assert.almostEqual(hit.normal.y, 0)
    
    b2.pos = new Point(0, 4)
    hit = b1.intersectAABB(b2)
    assert.almostEqual(hit.pos.x, 0)
    assert.almostEqual(hit.pos.y, 8)
    assert.almostEqual(hit.normal.x, 0)
    assert.almostEqual(hit.normal.y, 1)
    
    b2.pos = new Point(0, -4)
    hit = b1.intersectAABB(b2)
    assert.almostEqual(hit.pos.x, 0)
    assert.almostEqual(hit.pos.y, -8)
    assert.almostEqual(hit.normal.x, 0)
    assert.almostEqual(hit.normal.y, -1)
    test.finish()
  
  'intersectAABB should set hit.delta to move box 2 out of collision': (test) ->
    b1 = new AABB(new Point(0, 0), new Point(8, 8))
    b2 = new AABB(new Point(4, 0), new Point(8, 8))
    hit = b1.intersectAABB(b2)
    assert.almostEqual(hit.delta.x, 12)
    assert.almostEqual(hit.delta.y, 0)
    b2.pos.x += hit.delta.x
    b2.pos.y += hit.delta.y
    assert.equal(b1.intersectAABB(b2), null)
    
    b2.pos = new Point(-4, 0)
    hit = b1.intersectAABB(b2)
    assert.almostEqual(hit.delta.x, -12)
    assert.almostEqual(hit.delta.y, 0)
    b2.pos.x += hit.delta.x
    b2.pos.y += hit.delta.y
    assert.equal(b1.intersectAABB(b2), null)
    
    b2.pos = new Point(0, 4)
    hit = b1.intersectAABB(b2)
    assert.almostEqual(hit.delta.x, 0)
    assert.almostEqual(hit.delta.y, 12)
    b2.pos.x += hit.delta.x
    b2.pos.y += hit.delta.y
    assert.equal(b1.intersectAABB(b2), null)
    
    b2.pos = new Point(0, -4)
    hit = b1.intersectAABB(b2)
    assert.almostEqual(hit.delta.x, 0)
    assert.almostEqual(hit.delta.y, -12)
    b2.pos.x += hit.delta.x
    b2.pos.y += hit.delta.y
    assert.equal(b1.intersectAABB(b2), null)
    
    test.finish()
  
  'sweepAABB should return sweep when not colliding': (test) ->
    b1 = new AABB(new Point(0, 0), new Point(16, 16))
    b2 = new AABB(new Point(64, -64), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = b1.sweepAABB(b2, delta)
    assert.ok(sweep instanceof intersect.Sweep)
    assert.ok(sweep.pos instanceof intersect.Point)
    assert.equal(sweep.hit, null)
    assert.almostEqual(sweep.pos.x, b2.pos.x + delta.x)
    assert.almostEqual(sweep.pos.y, b2.pos.y + delta.y)
    test.finish()
  
  'sweepAABB should return sweep with sweep.hit when colliding': (test) ->
    b1 = new AABB(new Point(0, 0), new Point(16, 16))
    b2 = new AABB(new Point(0, -64), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = b1.sweepAABB(b2, delta)
    assert.ok(sweep instanceof intersect.Sweep)
    assert.ok(sweep.hit instanceof intersect.Hit)
    assert.ok(sweep.pos instanceof intersect.Point)
    test.finish()
  
  'sweepAABB should place sweep.pos at a non-colliding point': (test) ->
    b1 = new AABB(new Point(0, 0), new Point(16, 16))
    b2 = new AABB(new Point(0, -64), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = b1.sweepAABB(b2, delta)
    assert.almostEqual(sweep.pos.x, 0)
    assert.almostEqual(sweep.pos.y, -24)
    assert.almostEqual(sweep.time, 0.3125)
    test.finish()

  'sweepAABB should place sweep.hit.pos on the edge of the box': (test) ->
    b1 = new AABB(new Point(0, 0), new Point(16, 16))
    b2 = new AABB(new Point(0, -64), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = b1.sweepAABB(b2, delta)
    assert.almostEqual(sweep.hit.pos.x, 0)
    assert.almostEqual(sweep.hit.pos.y, -16)
    assert.almostEqual(sweep.hit.delta.x, 0)
    assert.almostEqual(sweep.hit.delta.y, 40)
    test.finish()
  
  'sweepAABB should set sweep.hit.normal to normals of box 1': (test) ->
    b1 = new AABB(new Point(0, 0), new Point(16, 16))
    b2 = new AABB(new Point(0, -64), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = b1.sweepAABB(b2, delta)
    assert.almostEqual(sweep.hit.normal.x, 0)
    assert.almostEqual(sweep.hit.normal.y, -1)
    test.finish()
  
  'sweepAABB should not move when the start position is colliding': (test) ->
    b1 = new AABB(new Point(0, 0), new Point(16, 16))
    b2 = new AABB(new Point(0, -4), new Point(8, 8))
    delta = new Point(0, 128)
    sweep = b1.sweepAABB(b2, delta)
    assert.almostEqual(sweep.pos.x, 0)
    assert.almostEqual(sweep.pos.y, -4)
    assert.almostEqual(sweep.hit.time, 0)
    assert.almostEqual(sweep.hit.delta.x, 0)
    assert.almostEqual(sweep.hit.delta.y, 0)
    test.finish()
