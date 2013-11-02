Intersection Tests in 2D
========================

This library is a collection of common 2D collision detection tests. Hopefully
this saves you from the pain of hunting them down yourself, or trying to rip
them out of physics libraries.

If you're looking for further reading, you are hurting yourself if you don't
buy [Real-Time Collision Detection]. It is easily the best purchase you could
make if you are learning about collision detection. There is also an excellent
[list of different algorithms here][algorithms].

The code is written in [CoffeeScript], but it's simple and should be easily
portable to your language of choice. If you just want to see the code, take
a look at [the compiled JS file][compiled]. It's stripped of comments and
fairly readable.

1. [Helpers](#helpers)
2. [Types of Tests](#types-of-tests)
   1. [Intersection Tests](#intersection-tests)
   2. [Sweep Tests](#sweep-tests)
3. [Axis-Aligned Bounding Boxes](#axis-aligned-bounding-boxes)
   1. [AABB vs Point](#aabb-vs-point)
   2. [AABB vs Segment](#aabb-vs-segment)
   3. [AABB vs AABB](#aabb-vs-aabb)
   4. [AABB vs Swept AABB](#aabb-vs-swept-aabb)

[Real-Time Collision Detection]: http://realtimecollisiondetection.net/
[algorithms]: http://www.realtimerendering.com/intersections.html
[CoffeeScript]: http://jashkenas.github.com/coffee-script/
[compiled]: https://github.com/noonat/intersect/blob/master/lib/intersect.js


<a name="helpers"></a>
Helpers
-------

Let's define a couple helpers that we'll use through the code.

    root = exports ? this

    abs = (value) ->
      if value < 0 then -value else value

    sign = (value) ->
      if value < 0 then -1 else 1

We'll also need a 2D point. We could just use a literal `{x: 0, y: 0}` object,
but you have to normalize and copy things quite a bit when doing collision
detection, so it makes things a bit more readable to formalize it as a class.

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


<a name="types-of-tests"></a>
Types of Tests
--------------

Collision and physics libraries generally assign things to two categories:
static objects at rest, and dynamic moving objects. Full physics libraries often
solve things in more complicated (and more efficient) ways, and optimize for
cases of many objects moving at once and colliding against one another.

But, for most simple 2D games, it's usually enough to do a collision test
between the object you're moving now (while moving it in the code), and the rest
of the world. The world for this type of game rarely contains so many objects
that this hurts your performance, and it makes the problem far easier to solve.
It also makes it easier to fine tune the physics system, which is often very
important for platformers.

As such, the functions in this code are all written for *static vs static* or
*moving vs static* object tests, to keep things simple.


<a name="intersection-tests"></a>
### Intersection Tests

Intersection tests are a *static vs static* test. They check whether two static
objects are overlapping. They have a boolean result (colliding or not), with a
vector which tells you how you could move the objects so that they're no longer
overlapping.

Intersection tests will return a Hit object when a collision occurs:

    root.Hit = class Hit
      constructor: ->
        this.pos = new Point()
        this.delta = new Point()
        this.normal = new Point()

- **hit.pos** is the point of contact between the two objects.
- **hit.normal** is the surface normal at the point of contact.
- **hit.delta** is the overlap between the two objects, and is a vector that
  can be added to the colliding object's position to move it back to a
  non-colliding state.
- **hit.time** is defined for segment and sweep intersections, a fraction from
  0 to 1 indicating how far along the line the collision occurred. (This is
  the `t` value for the line equation `L(t) = A + t * (B - A)`)


<a name="sweep-tests"></a>
### Sweep Tests

Sweep tests are a *moving vs static* test. They take two objects, sweep one
along a line of movement, and determine when it first collides with the other
object along that path of movement.

Sweep tests return a `Sweep` object:

    root.Sweep = class Sweep
      constructor: ->
        this.hit = null
        this.pos = new Point()

- **sweep.hit** is a Hit object if there was a collision, or null if not.
- **sweep.pos** is the furthest point the object reached along the swept path
  before it hit something.


<a name="axis-aligned-bounding-boxes"></a>
Axis-Aligned Bounding Boxes
---------------------------

Axis-aligned bounding boxes (AABBs) are bounding rectangles that do not rotate.
This means that their edges are always aligned with the main X and Y axes, which
makes collision detection much simpler. These examples specify an AABB via a
center point and box's half size for each axis (that is, the box's "radius" on
each axis).

    root.AABB = class AABB
      constructor: (pos, half) ->
        this.pos = pos
        this.half = half

The library has four axis-aligned bounding box (AABB) tests: AABB vs point,
AABB vs segment (raycast), AABB vs AABB, and AABB vs swept AABB.


<a name="aabb-vs-point"></a>
### AABB vs Point

This test is very simple, but I've included it for completeness. If a point is
behind all of the edges of the box, it's colliding. The function returns a Hit
object, or null if the two do not collide. `hit.pos` and `hit.delta` will be
set to the nearest edge of the box.

This code first finds the overlap on the X and Y axis. If the overlap is less
than zero for either, a collision is not possible. Otherwise, we find the
axis with the smallest overlap and use that to create an intersection point
on the edge of the box.

      intersectPoint: (point) ->

        dx = point.x - this.pos.x
        px = this.half.x - abs(dx)
        return null if px <= 0

        dy = point.y - this.pos.y
        py = this.half.y - abs(dy)
        return null if py <= 0

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


<a name="aabb-vs-segment"></a>
### AABB vs Segment

Games use segment intersection tests all the time, for everything from line of
sight to checking whether a bullet hit a monster. This is the most complicated
of the four AABB tests, and is commonly known as a [slab test]. It finds the
time of the line's intersection with the near and far edges of each axis of the
AABB. If they overlap, the segment is intersecting. For further reading, I
recommend [IRT p.65,104] and [WilliamsEtAl05].

The function calculates the collision times along the line for each edge of
the box. It returns a Hit object (with an extra `time` property), or null if
the two do not overlap. `paddingX` and `paddingY` will be added to the radius
of the bounding box, if specified.

[IRT p.65,104]: http://www.siggraph.org/education/materials/HyperGraph/raytrace/rtinter3.htm
[WilliamsEtAl05]: http://www.cs.utah.edu/~awilliam/box/

      intersectSegment: (pos, delta, paddingX = 0, paddingY = 0) ->

You might notice we haven't defined a segment argument. A segment from point
`A` to point `B` can be expressed with the equation `S(t) = A + t * (B - A)`,
for `0 <= t <= 1`. In this equation, `t` is the time along the line, or
percentage distance from `A` to `B`. Instead of formalizing the concept of a
segment, we use this equation and describe it it as a start `pos` and a `delta`
vector to the end of the line.

Scaling is done here using multiplication instead of division to deal with
floating point issues.

        scaleX = 1.0 / delta.x
        scaleY = 1.0 / delta.y
        signX = sign(scaleX)
        signY = sign(scaleY)
        nearTimeX = (this.pos.x - signX * (this.half.x + paddingX) - pos.x) * scaleX
        nearTimeY = (this.pos.y - signY * (this.half.y + paddingY) - pos.y) * scaleY
        farTimeX = (this.pos.x + signX * (this.half.x + paddingX) - pos.x) * scaleX
        farTimeY = (this.pos.y + signY * (this.half.y + paddingY) - pos.y) * scaleY

Now we have to compare these times to see if a collision is possible. If the
closest time of collision on either axis is further than the far time, we can't
be colliding. Otherwise, find the greater of the near times, and the lesser of
the far times -- we want the times that got closest to the slab.

If the nearest time is greater than one, then the nearest intersection did not
happen until after the end of the segment -- remember that a valid segment has
a time of `0 <= t <= 1` in the equation above. If both of the times are less
than zero, then the whole box is behind the start of the segment. In either of
these cases, a collision is not possible

        if nearTimeX > farTimeY or nearTimeY > farTimeX
          return null

        nearTime = if nearTimeX > nearTimeY then nearTimeX else nearTimeY
        farTime = if farTimeX < farTimeY then farTimeX else farTimeY
        if nearTime >= 1
          return null
        if nearTime < 0 and farTime < 0
          return null

If we've gotten this far a collision of some sort is happening. If the near time
is greater than or equal to zero, the segment starts outside and is entering the
box. Otherwise, the segment starts inside the box, and is exiting it. If we're
entering the box, we can set the hit time to the near time, since that's the
point along the segment at which it collided. If it's inside, it's colliding at
the very starting of the line, so just set the hit time to zero.

        hit = new Hit()
        if nearTime >= 0
          hit.time = nearTime
        else
          hit.time = 0
        hit.normal.x = if nearTimeX > nearTimeY then -signX else 0
        hit.normal.y = if nearTimeX > nearTimeY then 0 else -signY
        hit.delta.x = hit.time * delta.x
        hit.delta.y = hit.time * delta.y
        hit.pos.x = pos.x + hit.delta.x
        hit.pos.y = pos.y + hit.delta.y
        return hit


<a name="aabb-vs-aabb"></a>
### AABB vs AABB

This test uses a [separating axis test], which checks for overlaps between the
two boxes on each axis. If either axis is *not* overlapping, the boxes aren't
colliding.

The function returns a Hit object, or null if the two static boxes do not
overlap, and gives the axis of least overlap as the contact point. That is, it
sets `hit.delta` so that the colliding box will be pushed out of the nearest
edge. This can cause weird behavior for moving boxes, so you should use
`sweepAABB` instead for moving boxes.

This code is very similar to the `intersectPoint` function above.

[separating axis test]: http://www.metanetsoftware.com/technique/tutorialA.html#section1

      intersectAABB: (box) ->

        dx = box.pos.x - this.pos.x
        px = (box.half.x + this.half.x) - abs(dx)
        return null if px <= 0

        dy = box.pos.y - this.pos.y
        py = (box.half.y + this.half.y) - abs(dy)
        return null if py <= 0

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


<a name="aabb-vs-swept-aabb"></a>
### AABB vs Swept AABB

Swept volume tests are awesome -- they tell you whether object A hits object
B at any point along a movement path. This problem seems hard, until someone
tells you the magic word: [Minkowski]. If you inflate the static box by the
size of the moving box, you can just test the movement *segment* against the
padded static box.

`sweepAABB` finds the intersection of this box and another moving box, where
the `delta` argument is a point describing the movement of the box. It returns
a Sweep object. `sweep.hit` will be a Hit object if the two collided, or
null if they did not overlap.

[Minkowski]: http://physics2d.com/content/gjk-algorithm

      sweepAABB: (box, delta) ->
        sweep = new Sweep()

If the sweep isn't actually moving anywhere, just do a static test. It's faster
and will give us a better result for that case.

        if delta.x == 0 and delta.y == 0
          sweep.pos = box.pos.clone()
          sweep.hit = this.intersectAABB(box)
          sweep.hit.time = 0 if sweep.hit?

Otherwise, call into `intersectSegment` instead, where the segment is the center
of the moving box, with the same delta. We pass the moving box's half size as
padding. If we get a hit, we need to adjust the hit pos. Since a segment vs box
test was used, the hit pos is the center of the box. This offsets it to the edge
of the box.

        else
          sweep.hit = this.intersectSegment(box.pos, delta, box.half.x, box.half.y)
          if sweep.hit?
            sweep.pos = sweep.hit.pos.clone()
            # FIXME: Not right, needs to be along delta vector at time + half?
            sweep.hit.pos.x -= sweep.hit.normal.x * box.half.x
            sweep.hit.pos.y -= sweep.hit.normal.y * box.half.y
          else
            sweep.pos = new Point(box.pos.x + delta.x, box.pos.y + delta.y)
        return sweep
