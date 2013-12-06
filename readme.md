# Intersection Tests in 2D

intersect is a collection of common 2D collision detection tests,
[written as a tutorial]. Hopefully this saves you from the pain of
hunting them down yourself, or trying to rip them out of physics libraries.

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
- **hit.time** is defined for segment and sweep intersections, a float from
  0 to 1 indicating how far along the line the collision occurred. (This is
  the `t` value for the line equation `L(t) = A + t * (B - A)`)
- **hit.collider** is the object that was hit.

Sweep tests return a `Sweep` object, which has two properties:

- **sweep.pos** is the furthest point the volume reached along the swept path
  before it hit something.
- **sweep.hit** is set if the object hit something.
- **sweep.time** is a float from 0 to 1 indicating how far along the swept
  path the object got before colliding.

The functions are all written for *static vs static* or *static vs moving*
object tests. Full physics libraries often solve things in more complicated
(and more efficient) ways. But, for most 2D games, it's usually enough to do a
collision test between the object you're moving now, and everything else in
the world. This keeps things nice and simple.

For now, the intersect just has four axis-aligned bounding box (AABB) tests:
AABB vs point, AABB vs segment (raycast), AABB vs AABB, and AABB vs swept AABB.
Circle and plane tests are coming soon.

[written as a tutorial]: http://noonat.github.io/intersect
[Real-Time Collision Detection]: http://realtimecollisiondetection.net/
[list of different algorithms here]: http://www.realtimerendering.com/intersections.html
[CoffeeScript]: http://jashkenas.github.com/coffee-script/
