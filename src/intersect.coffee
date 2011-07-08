root = exports ? this 

abs = (value) ->
  if value < 0 then -value else value

sign = (value) ->
  if value < 0 then -1 else 1

# A 2D point.
root.Point = class Point
  constructor: (x = 0, y = 0) ->
    this.x = x
    this.y = y
  
  clone: ->
    return new Point(this.x, this.y)
  
  normalize: ->
    length = this.x * this.x + this.y * this.y
    if length > 0
      length = Math.sqrt(length)
      invLength = 1.0 / length
      this.x *= invLength
      this.y *= invLength
    return length

# An axis-aligned bounding box. The box is specified by its center and
# a half-space vector (that is, the radius of the bounding box on the
# x and y axes).
root.AABB = class AABB
  constructor: (pos, half) ->
    this.pos = pos
    this.half = half
  
  # Test whether a point is inside the box. Returns a Hit object, or null if
  # the two do not overlap. If colliding, `hit.pos` will be set to the nearest
  # edge of the box.
  intersectPoint: (point) ->
    # Find the overlap for the X axis.
    dx = point.x - this.pos.x
    px = this.half.x - abs(dx)
    return null if px <= 0
    # Find the overlap for the Y axis.
    dy = point.y - this.pos.y
    py = this.half.y - abs(dy)
    return null if py <= 0
    # Use the axis with the smallest overlap.
    hit = new Hit()
    if px < py
      sx = sign(dx)
      hit.delta.x = px * sx
      hit.normal.x = sx
      hit.pos.x = this.pos.x + (this.half.x * sx)
      hit.pos.y = point.y
    else
      sy = sign(dy)
      hit.delta.y = py * sy
      hit.normal.y = sy
      hit.pos.x = point.x
      hit.pos.y = this.pos.y + (this.half.y * sy)
    return hit
    
  # Find the intersection of the box and the given segment. Returns a Hit
  # object (with an extra `time` property), or null if the two do not overlap.
  # `paddingX` and `paddingY` will be added to the radius of the bounding box,
  # if specified.
  intersectSegment: (pos, delta, paddingX = 0, paddingY = 0) ->
    # A segment from point `A` to point `B` can be expressed with the equation
    # `S(t) = A + t * (B - A)`, for `0 <= t <= 1`. In this equation, `t` is
    # the time along the line, or percentage distance from `A` to `B`. This
    # code calculates the collision times along the line for each edge
    # of the box. This is sometimes called a slab test. Scaling is done using
    # multiplication instead of division to deal with floating point issues
    # (see [WilliamsEtAl05](http://www.cs.utah.edu/~awilliam/box/) for more).
    scaleX = 1.0 / delta.x
    scaleY = 1.0 / delta.y
    signX = sign(scaleX)
    signY = sign(scaleY)
    nearTimeX = (this.pos.x - signX * (this.half.x + paddingX) - pos.x) * scaleX
    nearTimeY = (this.pos.y - signY * (this.half.y + paddingY) - pos.y) * scaleY
    farTimeX = (this.pos.x + signX * (this.half.x + paddingX) - pos.x) * scaleX
    farTimeY = (this.pos.y + signY * (this.half.y + paddingY) - pos.y) * scaleY
    return null if nearTimeX > farTimeY or nearTimeY > farTimeX
    
    # Find the farthest near value, and the nearest far value.
    nearTime = if nearTimeX > nearTimeY then nearTimeX else nearTimeY
    farTime = if farTimeX < farTimeY then farTimeX else farTimeY
    
    # If the nearest time is greater than one, then the nearest intersection
    # did not happen until after the end of the segment.
    return null if nearTime >= 1
    
    # If both the times are less than zero, then the box is behind the start
    # of the segment.
    return null if nearTime < 0 and farTime < 0
    
    hit = new Hit()
    if nearTime >= 0
      # The segment starts outside and is entering the box.
      hit.time = nearTime
    else
      # The segment starts inside and is exiting the box.
      hit.time = 0
    hit.normal.x = if nearTimeX > nearTimeY then -signX else 0
    hit.normal.y = if nearTimeX > nearTimeY then 0 else -signY
    hit.delta.x = hit.time * delta.x
    hit.delta.y = hit.time * delta.y
    hit.pos.x = pos.x + hit.delta.x
    hit.pos.y = pos.y + hit.delta.y
    return hit
  
  # Find the intersection of the box with another (stationary) box. Returns
  # a Hit object, or null if the two do not overlap. This uses the separating
  # axis test, and gives the axis of least overlap as the contact point. This
  # can cause weird behavior for moving boxes, so you should use `sweepAABB`
  # for moving boxes.
  intersectAABB: (box) ->
    # Find the overlap for the X axis.
    dx = box.pos.x - this.pos.x
    px = (box.half.x + this.half.x) - abs(dx)
    return null if px <= 0
    # Find the overlap for the Y axis.
    dy = box.pos.y - this.pos.y
    py = (box.half.y + this.half.y) - abs(dy)
    return null if py <= 0
    # Use the axis with the smallest overlap.
    hit = new Hit()
    if px < py
      sx = sign(dx)
      hit.delta.x = px * sx
      hit.normal.x = sx
      hit.pos.x = this.pos.x + (this.half.x * sx)
      hit.pos.y = box.pos.y
    else
      sy = sign(dy)
      hit.delta.y = py * sy
      hit.normal.y = sy
      hit.pos.x = box.pos.x
      hit.pos.y = this.pos.y + (this.half.y * sy)
    return hit
  
  # Find the intersection of this box and another moving box, where the
  # `delta` argument is a point describing the movement of the box. Returns
  # a Sweep object. `sweep.hit` will be a Hit object if the two collided, or
  # null if they did not overlap.
  #
  # This test is done by inflating this box to include the size of the moving
  # box, then colliding the movement as a segment against the inflated box.
  sweepAABB: (box, delta) ->
    sweep = new Sweep()
    if delta.x == 0 and delta.y == 0
      # If the sweep isn't actually moving anywhere, just do a static test.
      sweep.pos = box.pos.clone()
      sweep.hit = this.intersectAABB(box)
      sweep.hit.time = 0 if sweep.hit?
    else
      sweep.hit = this.intersectSegment(box.pos, delta, box.half.x, box.half.y)
      if sweep.hit?
        sweep.pos = sweep.hit.pos.clone()
        # Since a segment vs box test was used, the hit pos is the center of
        # the box. This offsets it to the edge of the box.
        # FIXME: Not right, needs to be along delta vector at time + half?
        sweep.hit.pos.x -= sweep.hit.normal.x * box.half.x
        sweep.hit.pos.y -= sweep.hit.normal.y * box.half.y
      else
        sweep.pos = new Point(box.pos.x + delta.x, box.pos.y + delta.y)
    return sweep
  

# The result of intersection tests. The `hit.pos` property contains the
# contact point for the collision. `hit.delta` contains the overlap for the
# collision, and can be added to the intersecting object's position to
# resolve the collision. `hit.normal` is the surface normal of the hit edge.
#
# In the case of segment intersection, an additional `hit.time` property will
# be set (a number, from 0 to 1).
root.Hit = class Hit
  constructor: ->
    this.pos = new Point()
    this.delta = new Point()
    this.normal = new Point()

# The result of sweep tests. The `sweep.pos` property contains the furthest
# position the swept object reached without colliding. If it collided with
# something, `sweep.hit` property will be set.
root.Sweep = class Sweep
  constructor: ->
    this.hit = null
    this.pos = new Point()
