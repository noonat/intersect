# Intersection Tests in 2D

This repo is a collection of common 2D collision detection tests. Hopefully
this saves you from the pain of hunting them down yourself, or trying to rip
them out of physics libraries.

If you're looking for further reading, you are hurting yourself if you don't
buy [Real-Time Collision Detection]. It is easily the best purchase you could
make if you are learning about collision detection. There is also an excellent
[list of different algorithms here].

The code is written in [CoffeeScript], but it's simple and should be easily
portable to your language of choice. The intersection tests return a `Hit`
object when a collision occurs, which has several properties:

- **hit.pos** is the point of contact between the two objects.
- **hit.normal** is the surface normal at the point of contact.
- **hit.delta** is a vector that can be added to the colliding object's
  position to move it back to a non-colliding state.
- **hit.time** is defined for segment and sweep intersections, a fraction from
  0 to 1 indicating how far along the line the collision occurred. (This is
  the `t` value for the line equation `L(t) = A + t * (B - A)`)

Sweep tests return a `Sweep` object, which has two properties:

- **sweep.pos** is the furthest point the volume reached along the swept path
  before it hit something.
- **sweep.hit** is set if the object hit something.

The functions are all written for *static vs static* or *static vs moving*
object tests. Full physics libraries often solve things in more complicated
(and more efficient) ways. But, for most 2D games, it's usually enough to do a
collision test between the object you're moving now, and everything else in
the world. This keeps things nice and simple.

For now, the library just has four axis-aligned bounding box (AABB) tests:
AABB vs point, AABB vs segment (raycast), AABB vs AABB, and AABB vs swept AABB.
Circle and plane tests are coming soon.

## Axis-aligned bounding boxes

AABBs are bounding rectangles that do not rotate. This means that their edges
are always aligned with the main X and Y axes, which makes collision detection
much simpler. These examples specify an AABB via a center point and box's
half size for each axis (that is, the box's "radius").

### AABB vs Point

```coffeescript
    point = new Point(10, 10)
    hit = aabb.intersectPoint(new Point(10, 10))
    if hit
      point.x += hit.delta.x
      point.y += hit.delta.y
```

This test is very simple, but I've included it for completeness. If a point is
behind all of the edges of the box, it's colliding. `hit.pos` and `hit.delta`
are set to the nearest edge.

### AABB vs Segment

```coffeescript
    start = new Point(0, 0)
    delta = new Point(10, 10)
    hit = aabb.intersectSegment(start, delta)
```

Games use segment intersection tests all the time, for everything from line of
sight to checking whether a bullet hit a monster. This is the most complicated
of the four AABB tests, and is commonly known as a [slab test]. It finds the
time of the line's intersection with the near and far edges of each axis of
the AABB. If they overlap, the segment is intersecting. For further reading,
I recommend [IRT p.65,104] and [WilliamsEtAl05].

### AABB vs AABB

```coffeescript
    hit = aabb1.intersectAABB(aabb2)
    if hit
      aabb2.pos.x += hit.delta.x
      aabb2.pos.y += hit.delta.y
```

This test uses a [separating axis test], which checks for overlaps between the
two boxes on each axis. If either axis is *not* overlapping, the boxes aren't
colliding. If they do overlap, the function sets `hit.delta` so that the
colliding box will be pushed out of the nearest edge.

### AABB vs Swept AABB

```coffeescript
    sweep = aabb1.sweepAABB(aabb2, new Point(32, 0))
    aabb2.pos.x = sweep.pos.x
    aabb2.pos.y = sweep.pos.y
```

Swept volume tests are awesome -- they tell you whether object A hits object
B at any point along a movement path. This problem seems hard, until someone
tells you the magic word: [Minkowski]. tl;dr: if you pad the static box with
the size of the moving box, you can just test the movement *segment* against
the static padded box.

[Real-Time Collision Detection]: http://realtimecollisiondetection.net/
[list of different algorithms here]: http://www.realtimerendering.com/intersections.html
[CoffeeScript]: http://jashkenas.github.com/coffee-script/
[IRT p.65,104]: http://www.siggraph.org/education/materials/HyperGraph/raytrace/rtinter3.htm
[WilliamsEtAl05]: http://www.cs.utah.edu/~awilliam/box/
[Separating Axis Test]: http://www.metanetsoftware.com/technique/tutorialA.html#section1
[Minkowski]: http://physics2d.com/content/gjk-algorithm
