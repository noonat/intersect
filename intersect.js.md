Intersection Tests in 2D
========================

This library is a collection of common 2D collision detection tests. Hopefully
this saves you from the pain of hunting them down yourself, or trying to rip
them out of physics libraries.

If you're looking for further reading, you are hurting yourself if you don't
buy [Real-Time Collision Detection]. It is easily the best purchase you could
make if you are learning about collision detection. There is also an excellent
[list of different algorithms here][algorithms].

The code is written in JavaScript, but it's simple and should be easily
portable to your language of choice. If you just want to see the code, take
a look at [the compiled JS file][compiled].

1. [Helpers](#helpers)
2. [Types of Tests](#types-of-tests)
   1. [Intersection Tests](#intersection-tests)
   2. [Sweep Tests](#sweep-tests)
3. [Axis-Aligned Bounding Boxes](#axis-aligned-bounding-boxes)
   1. [AABB vs Point](#aabb-vs-point)
   2. [AABB vs Segment](#aabb-vs-segment)
   3. [AABB vs AABB](#aabb-vs-aabb)
   4. [AABB vs Swept AABB](#aabb-vs-swept-aabb)
   5. [Sweeping an AABB Through Multiple Objects](#sweeping-an-aabb-through-multiple-objects)
4. [Circles](#circles)
   1. [Circle vs Point](#circle-vs-point)
   2. [Circle vs Segment](#circle-vs-segment)
   3. [Circle vs AABB](#circle-vs-aabb)
   4. [Circle vs Circle](#circle-vs-circle)
   5. [Circle vs Swept Circle](#circle-vs-swept-circle)
5. [Capsules](#capsules)
   1. [Capsule vs Segment](#capsule-vs-segment)

[Real-Time Collision Detection]: http://realtimecollisiondetection.net/
[algorithms]: http://www.realtimerendering.com/intersections.html
[compiled]: https://github.com/noonat/intersect/blob/master/intersect.js


Helpers
-------

Let's define a couple helpers that we'll use through the code.

    export const EPSILON = 1e-8;

    export function abs(value) {
      return value < 0 ? -value : value;
    }

    export function clamp(value, min, max) {
      if (value < min) {
        return min;
      } else if (value > max) {
        return max;
      } else {
        return value;
      }
    }

    export function sign(value) {
      return value < 0 ? -1 : 1;
    }


We'll also need a 2D point. We could just use a literal `{x: 0, y: 0}` object,
but you have to normalize and copy things quite a bit when doing collision
detection, so it makes things a bit more readable to formalize it as a class.

    export class Point {
      constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }

      clone() {
        return new Point(this.x, this.y);
      }

      normalize() {
        let length = this.x * this.x + this.y * this.y;
        if (length > 0) {
          length = Math.sqrt(length);
          let inverseLength = 1.0 / length;
          this.x *= inverseLength;
          this.y *= inverseLength;
        } else {
          this.x = 1;
          this.y = 0;
        }
        return length;
      }
    }


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


### Intersection Tests

<figure class="right">
  <img src="./docs/svg/box-intersection-test.svg" class="small"/>
  <figcaption>A intersects with B and needs to be pushed out</figcaption>
</figure>

Intersection tests are a *static vs static* test. They check whether two static
objects are overlapping. They have a boolean result (colliding or not), with a
vector which tells you how you could move the objects so that they're no longer
overlapping.

Intersection tests will return a Hit object when a collision occurs:

    export class Hit {
      constructor(collider) {
        this.collider = collider;
        this.pos = new Point();
        this.delta = new Point();
        this.normal = new Point();
      }
    }

- **hit.pos** is the point of contact between the two objects (or an
  estimation of it, in some sweep tests).
- **hit.normal** is the surface normal at the point of contact.
- **hit.delta** is the overlap between the two objects, and is a vector that
  can be added to the colliding object's position to move it back to a
  non-colliding state.
- **hit.time** is only defined for segment and sweep intersections, and is a
  fraction from 0 to 1 indicating how far along the line the collision occurred.
  (This is the \\(t\\) value for the line equation \\(L(t) = A + t(B - A)\\))


### Sweep Tests

Sweep tests are a *moving vs static* test. They take two objects, sweep one
along a line of movement, and determine when it first collides with the other
object along that path of movement.

<figure class="right">
  <img src="./docs/svg/box-bad-intersection-test.svg" class="small"/>
  <figcaption>A intersects both B and C, and is incorrectly pushed <em>into</em> a bad state</figcaption>
</figure>

Normal intersection tests are helpful for static objects, but they aren't the
best choice to collide a moving object. If you are trying to collide an object
A against two objects, B and C, you can easily get into an ambigious situation
where the collision isn't as easy to resolve.

Our intersection tests can only determine what the best way to resolve a
collision with an object is for that one object, independent of any other
objects you want to collide with. This means that correcting for a collision
with object B moves you into a state where are colliding with object C, and
the same thing happens with object C.

Instead, you can use a sweep test to take the path of movement into account,
and stop objects from ever moving into other objects.

Sweep tests return a `Sweep` object:

    export class Sweep {
      constructor() {
        this.hit = null;
        this.pos = new Point();
        this.time = 1;
      }
    }

- **sweep.hit** is a Hit object if there was a collision, or null if not.
- **sweep.pos** is the furthest point the object reached along the swept path
  before it hit something.
- **sweep.time** is a copy of `sweep.hit.time`, offset by epsilon, or 1 if
  the object didn't hit anything during the sweep.


Axis-Aligned Bounding Boxes
---------------------------

Axis-aligned bounding boxes (AABBs) are bounding rectangles that do not rotate.
This means that their edges are always aligned with the main X and Y axes, which
makes collision detection much simpler. These examples specify an AABB via a
center point and box's half size for each axis (that is, the box's "radius" on
each axis).

    export class AABB {
      constructor(pos, half) {
        this.pos = pos;
        this.half = half;
      }

The library has four axis-aligned bounding box (AABB) tests: AABB vs point,
AABB vs segment (raycast), AABB vs AABB, and AABB vs swept AABB.


### AABB vs Point

This test is very simple, but I've included it for completeness. If a point is
behind all of the edges of the box, it's colliding. The function returns a Hit
object, or null if the two do not collide. `hit.pos` and `hit.delta` will be
set to the nearest edge of the box.

This code first finds the overlap on the X and Y axis. If the overlap is less
than zero for either, a collision is not possible. Otherwise, we find the
axis with the smallest overlap and use that to create an intersection point
on the edge of the box.

      intersectPoint(point) {
        const dx = point.x - this.pos.x;
        const px = this.half.x - abs(dx);
        if (px <= 0) {
          return null;
        }

        const dy = point.y - this.pos.y;
        const py = this.half.y - abs(dy);
        if (py <= 0) {
          return null;
        }

        let hit = new Hit(this);
        if (px < py) {
          const sx = sign(dx);
          hit.delta.x = px * sx;
          hit.normal.x = sx;
          hit.pos.x = this.pos.x + (this.half.x * sx);
          hit.pos.y = point.y;
        } else {
          const sy = sign(dy);
          hit.delta.y = py * sy;
          hit.normal.y = sy;
          hit.pos.x = point.x;
          hit.pos.y = this.pos.y + (this.half.y * sy);
        }
        return hit;
      }


### AABB vs Segment

Games use segment intersection tests all the time, for everything from line of
sight to checking whether a bullet hit a monster. This is the most complicated
of the four AABB tests, and is commonly known as a slab test. It finds the
time of the line's intersection with the near and far edges of each axis of the
AABB. If they overlap, the segment is intersecting.

<div class="figure-row right">
<figure>
  <img src="./docs/svg/box-near-far-x.svg" class="small"/>
  <figcaption>Near x is greater than far y</figcaption>
</figure>
<figure>
  <img src="./docs/svg/box-near-far-y.svg" class="small"/>
  <figcaption>Near x is greater than far y</figcaption>
</figure>
</div>

What are the near and far edges? Well, in our examples to the right, the
direction of the segment is from the top left to the bottom right. This means
that the near edges of the box are the top and left edges, and the far edges of
the box are the bottom and right edges.

Note that the intersection points might not actually be on the box or the
segment. They will be at the intersection of the infinite lines of the box's
edges and the infinte line of the segment.

This is a weird concept, so don't feel bad if it takes a while for it to sink
in. For further reading, I recommend [IRT p.65,104] and [WilliamsEtAl05].

The function calculates the collision times along the line for each edge of
the box. It returns a Hit object (with an extra `time` property), or null if
the two do not overlap. `paddingX` and `paddingY` will be added to the radius
of the bounding box, if specified.

[IRT p.65,104]: http://www.siggraph.org/education/materials/HyperGraph/raytrace/rtinter3.htm
[WilliamsEtAl05]: https://web.archive.org/web/20130420103121/http://www.cs.utah.edu/~awilliam/box/

      intersectSegment(pos, delta, paddingX = 0, paddingY = 0) {

You might notice we haven't defined a segment argument. A segment from point
\\(A\\) to point \\(B\\) can be expressed with the equation
\\(S(t) = A + t(B - A)\\), for \\(0 <= t <= 1\\). In this equation, \\(t\\) is
the time along the line, or percentage distance from \\(A\\) to \\(B\\).
Instead of formalizing the concept of a segment, we use this equation and
create a variable `pos` with the value of \\(A\\), and a variable `delta` with
the value of \\(B - A\\).

Next, we need to find the linear time at which point the segment intersects
with the box's near and far edges.

We can calculate this by subtracting the position of the edge from the segment's
start position, then dividing by the segment's delta. Scaling is done here using
multiplication instead of division to deal with floating point issues.

        let scaleX = 1.0 / delta.x;
        let scaleY = 1.0 / delta.y;
        let signX = sign(scaleX);
        let signY = sign(scaleY);
        let nearTimeX = (this.pos.x - signX * (this.half.x + paddingX) - pos.x) * scaleX;
        let nearTimeY = (this.pos.y - signY * (this.half.y + paddingY) - pos.y) * scaleY;
        let farTimeX = (this.pos.x + signX * (this.half.x + paddingX) - pos.x) * scaleX;
        let farTimeY = (this.pos.y + signY * (this.half.y + paddingY) - pos.y) * scaleY;

Now we have to compare these times to see if a collision is possible.

<figure class="right">
  <img src="./docs/svg/box-outside.svg" class="small"/>
  <figcaption>Near x is greater than far y</figcaption>
</figure>

**If the closest time of collision on either axis is further than the far
time on the opposite axis, we can't be colliding.** For instance, in the example
to the right, because the segment's infinite line intersected the infinite line
of the box's top edge, before it ever hit the line for the left edge, we know
the intersection occurred before the segment ever reached the box. We don't
need to do any more checks, because we know a collision isn't possible.

        if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
          return null;
        }

Otherwise, find the greater of the near times, and the lesser of the far times
&mdash; we want the times that got closest to the slab. We can check these two
times to determine whether the collision occurred on the segment.

        let nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
        let farTime = farTimeX < farTimeY ? farTimeX : farTimeY;

<div class="figure-row right">
<figure>
  <img src="./docs/svg/box-behind.svg" class="small"/>
  <figcaption>Behind the segment</figcaption>
</figure>
<figure>
  <img src="./docs/svg/box-front.svg" class="small"/>
  <figcaption>In front of the segment</figcaption>
</figure>
</div>

If the **near time is greater than or equal to 1**, the line starts in front
of the nearest edge, but finishes before it reaches it. That is, it means it
further than a whole segment length away. If the **far time is less than or
equal to 0**, the line starts in front of the far side of the box, and points
away from the box.

        if (nearTime >= 1 || farTime <= 0) {
          return null;
        }

If we've gotten this far a collision of some sort is happening. If the near time
is greater than zero, the segment starts outside and is entering the box.
Otherwise, the segment starts inside the box, and is exiting it. If we're
entering the box, we can set the hit time to the near time, since that's the
point along the segment at which it collided. If it's inside, it's colliding at
the very starting of the line, so just set the hit time to zero.

        let hit = new Hit(this);
        hit.time = clamp(nearTime, 0, 1);
        if (nearTimeX > nearTimeY) {
          hit.normal.x = -signX;
          hit.normal.y = 0;
        } else {
          hit.normal.x = 0;
          hit.normal.y = -signY;
        }
        hit.delta.x = hit.time * delta.x;
        hit.delta.y = hit.time * delta.y;
        hit.pos.x = pos.x + hit.delta.x;
        hit.pos.y = pos.y + hit.delta.y;
        return hit;
      }


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

      intersectAABB(box) {
        let dx = box.pos.x - this.pos.x;
        let px = (box.half.x + this.half.x) - abs(dx);
        if (px <= 0) {
          return null;
        }

        let dy = box.pos.y - this.pos.y;
        let py = (box.half.y + this.half.y) - abs(dy);
        if (py <= 0) {
          return null;
        }

        let hit = new Hit(this);
        if (px < py) {
          let sx = sign(dx);
          hit.delta.x = px * sx;
          hit.normal.x = sx;
          hit.pos.x = this.pos.x + (this.half.x * sx);
          hit.pos.y = box.pos.y;
        } else {
          let sy = sign(dy);
          hit.delta.y = py * sy;
          hit.normal.y = sy;
          hit.pos.x = box.pos.x;
          hit.pos.y = this.pos.y + (this.half.y * sy);
        }
        return hit;
      }


### AABB vs Swept AABB

<div class="figure-row right">
<figure>
  <img src="./docs/svg/box-sweep-test.svg" class="small"/>
  <figcaption>The sweep test prevents A from moving into B</figcaption>
</figure>
<figure>
  <img src="./docs/svg/box-sweep-padded-test.svg" class="small"/>
  <figcaption>If B is padded with the size of A, this segment test is the same as sweeping A.</figcaption>
</figure>
</div>

Swept volume tests are awesome &mdash; they tell you whether object A hits
object B at any point along a movement path. This problem seems hard, until
someone tells you the magic word: [Minkowski]. If you inflate the static box by
the size of the moving box, you can just test the movement *segment* against
the padded static box. The point at which the segment intersects the padded box
tells you where the moving box first collided with the static box.

`sweepAABB` finds the intersection of this box and another moving box, where
the `delta` argument is a point describing the movement of the box. It returns
a Sweep object. `sweep.hit` will be a Hit object if the two collided, or
null if they did not overlap.

[Minkowski]: http://physics2d.com/content/gjk-algorithm

      sweepAABB(box, delta) {
        let sweep = new Sweep();

If the sweep isn't actually moving anywhere, just do a static test. It's faster
and will give us a better result for that case.

        if (delta.x === 0 && delta.y === 0) {
          sweep.pos.x = box.pos.x;
          sweep.pos.y = box.pos.y;
          sweep.hit = this.intersectAABB(box);
          if (sweep.hit) {
            sweep.time = sweep.hit.time = 0;
          } else {
            sweep.time = 1;
          }
          return sweep;
        }

Otherwise, call into `intersectSegment` instead, where the segment is the center
of the moving box, with the same delta. We pass the moving box's half size as
padding. If we get a hit, we need to adjust the hit pos. Since a segment vs box
test was used, the hit pos is the center of the box. This offsets it to the edge
of the box, as close to the segment of movement as possible.

        sweep.hit = this.intersectSegment(box.pos, delta, box.half.x, box.half.y);
        if (sweep.hit) {
          sweep.time = clamp(sweep.hit.time - EPSILON, 0, 1);
          sweep.pos.x = box.pos.x + delta.x * sweep.time;
          sweep.pos.y = box.pos.y + delta.y * sweep.time;
          let direction = delta.clone();
          direction.normalize();
          sweep.hit.pos.x = clamp(
            sweep.hit.pos.x + direction.x * box.half.x,
            this.pos.x - this.half.x,
            this.pos.x + this.half.x);
          sweep.hit.pos.y = clamp(
            sweep.hit.pos.y + direction.y * box.half.y,
            this.pos.y - this.half.y,
            this.pos.y + this.half.y);
        } else {
          sweep.pos.x = box.pos.x + delta.x;
          sweep.pos.y = box.pos.y + delta.y;
          sweep.time = 1;
        }
        return sweep;
      }


### Sweeping an AABB Through Multiple Objects

So, let's say we have an AABB we want to move from one point to another, without
allowing it to collide with a list of static AABBs. To do this, we need to call
`sweepAABB` on each static object, and keep track of the sweep that moved the
least distance &mdash; that is, the nearest collision to the start of the path.

      sweepInto(staticColliders, delta) {
        let nearest = new Sweep();
        nearest.time = 1;
        nearest.pos.x = this.pos.x + delta.x;
        nearest.pos.y = this.pos.y + delta.y;
        for (let i = 0, il = staticColliders.length; i < il; i++) {
          let sweep = staticColliders[i].sweepAABB(this, delta);
          if (sweep.time < nearest.time) {
            nearest = sweep;
          }
        }
        return nearest;
      }
    }

It's a common use case to have a single object that needs to move through a
world, colliding with many other objects. Note that solving this problem
efficiently requires two steps:

1. A broad phase, which does not do precise collision detection, but which can
   very quickly reject large chunks of the world which are not likely to be
   colliding. That is, you don't have to try to calculate how two objects are
   colliding if you know they're in entirely different rooms.
2. A narrow phase, which finds, given a set of items which are likely to be
   colliding, the earliest point at which the moving object collided with one
   of the items.

The first step is out of scope for this library, but these tests are great for
solving the narrow phase. You can usually get away without a broad phase for
simple games, however, if you aren't colliding against a huge number of objects.


Circles
-------

Circles are just a center position and a radius.

    export class Circle {
      constructor(pos, radius) {
        this.pos = pos;
        this.radius = radius;
      }

The tests for circles are similar to the ones for AABB, although their
implementation tends to be a bit more complicated.

We'll need to talk about math a bit more for circles. To keep it clear whether
we're talking about vectors or scalars, we'll use uppercase letters to refer to
vectors, and lowercase letters to refer to scalars. For circles specifically,
\\(C\\) will be the circle's `pos`, and \\(r\\) will be the circle's `radius`.


### Circle vs Point

When testing whether a point \\(P\\) collides with a circle, we first need to
calculate the delta from \\(P\\) to the circle's center, \\(C\\):

\\[D = P - C\\]

If the length of \\(D\\) is greater than \\(r\\), then the point is outside the
circle. Calculating the length of \\(D\\) is just the usual Pythagorean
theorem, the circle is not colliding if:

\\[\\sqrt{D\_{0}D\_{0} + D\_{1}D\_{1}} > r\\]

When the length is greater than the radius of the circle, it means the point
lies outside the circle. We can optimize the check a bit by comparing the
distance squared to the radius squared, so that we don't need to do a square
root to calculate the true distance:

\\[D\_{0}D\_{0} + D\_{1}D\_{1} > r^2\\]

We'll also allow a padding to be passed into the function for use in other
places that we'll call this function. The padding will just be added to the
radius to inflate the size of the circle for the test.

In the case of a collision, we'll just put the hit on the edge of the circle.

      intersectPoint(point, padding=0) {
        let dx = point.x - this.pos.x;
        let dy = point.y - this.pos.y;
        let distanceSquared = dx * dx + dy * dy;
        let minDistance = this.radius + padding;
        if (distanceSquared >= (minDistance * minDistance)) {
          return null;
        }
        let hit = new Hit(this);
        hit.normal.x = dx;
        hit.normal.y = dy;
        hit.normal.normalize();
        hit.pos.x = this.pos.x + hit.normal.x * this.radius;
        hit.pos.y = this.pos.y + hit.normal.y * this.radius;
        hit.delta.x = (hit.pos.x + hit.normal.x * padding) - point.x;
        hit.delta.y = (hit.pos.y + hit.normal.y * padding) - point.y;
        return hit;
      }


### Circle vs Segment

This collision test is one of the more complicated ones that we'll have to
talk about here. You can find another explanation of this formula and algorithm
in [Real-Time Collision Detection] section 5.3.2. If you're not interested in
the math behind the algorithm, you can skip to the end of this section to
see the code.

Like we did in [AABB vs Segment](#aabb-vs-segment), we're going to express a
segment as a starting position \\(P\\) and a delta \\(D\\) representing the
distance from the start to the end. Points along the line can be expressed by
multiplying \\(D\\) by a linear time \\(t\\), and adding that to the starting
position:

\\[S(t) = P + tD\\]

Remember that, in this formula, points that exist on the segment must have
\\(t \\in [0, 1]\\). If \\(t\\) is not in that range, the point is collinear
with the segment, but exists either before it's start point or after it's
end point.

If we reuse the formula from the previous section for expressing a point on
the edge of the circle, \\((X - C) \\cdot (X - C) = r^2\\), but substitute
instead the formula for our segment in place of \\(X\\):

\\[(P + tD - C) \\cdot (P + tD - C) = r^2\\]

We need to solve this equation to find \\(t\\), so that we know the time at
which the segment intersects with the edge of the circle. It turns out that
with some re-ordering and expansion, we can turn this into a quadratic
equation. Let's go through the process.

First, let's say that \\(M = P - C\\), and use that to simplify a bit:

\\[(P - C + tD) \\cdot (P - C + tD) = r^2\\]
\\[(M + tD) \\cdot (M + tD) = r^2\\]

We can expand the dot product and simplify things a bit:

\\[(M \\cdot M) + (M \\cdot tD) + (tD \\cdot M) + (tD \\cdot tD) = r^2\\]
\\[(M \\cdot M) + 2(M \\cdot tD) + (D \\cdot D)t^2 = r^2\\]

Then we can re-order things to swap the first and last terms of the left-hand side,
and subtract \\(r^2\\) from both sides:

\\[(D \\cdot D)t^2 + 2(M \\cdot D)t + (M \\cdot M) = r^2\\]
\\[(D \\cdot D)t^2 + 2(M \\cdot D)t + (M \\cdot M) - r^2 = 0\\]

It might not be immediately obvious, but this is a *quadratic equation*. A
quadratic equation has the form
\\({\\color{red}a}x^2 + {\\color{green}b}x + {\\color{blue}c} = 0\\). Here is
the same equation with the corresponding terms highlighted:

\\[{\\color{red}(D \\cdot D)}t^2 + {\\color{green}2(M \\cdot D)}t + {\\color{blue}(M \\cdot M) - r^2} = 0\\]

Why is it helpful to have it in this form? Because the *quadratic formula* can
be used to solve a quadratic equation for \\(x\\) (or, in our case, \\(t\\)).
The quadratic formula is:

\\[x = \\frac{-b \\pm \\sqrt{{\\color{blue}b^2 - 4ac}}}{2a}\\]

The part highlighted in blue is important. It's called the discriminant. The
result of this portion of the formula tells us what sort of result we can
expect:

- If it is negative, it means there aren't any real roots. For our purposes,
  this means that the ray missed the circle completely.
- If it is zero, it means that the ray hit the circle exactly once.
- If it is greater than zero, it means that the ray hit the circle twice --
  once entering the circle, and once leaving it again. Note the \\(\\pm\\) in
  the quadratic formula. This is because it can yield two possible results,
  one by adding and one by subtracting the root. In this case, the lesser of
  the two is the one we care about, so we only need to subtract.

If we substitute our terms into the formula, it's pretty awful to read:

\\[t = \\frac{-2(M \\cdot D) \\pm \\sqrt{2(M \\cdot D)^2 - 4(D \\cdot D)((M \\cdot M) - r^2)}}{2(D \\cdot D)}\\]

This is probably a good time to start expressing this as code, which should
make it a bit easier to understand. Let's start out by defining our equivalents
of \\(r\\), \\(M\\), and \\(D\\):

      intersectSegment(pos, delta, padding=0) {
        let r = this.radius + padding;
        let mx = pos.x - this.pos.x;
        let my = pos.y - this.pos.y;
        let dx = delta.x;
        let dy = delta.y;

Once we have these, we can define \\(a\\), \\(b\\), and \\(c\\) from the
quadratic formula:

        let a = dx * dx + dy * dy;              // D . D
        let b = 2 * (mx * dx + my * dy);        // 2(M . D)
        let c = (mx * mx + my * my) - (r * r);  // (M . M) - r^2

Then we can use these to calculate the discriminant. We can also check for the
case when it is less than zero, as that means no collision occurred and we
can return early.

        let discr = (b * b) - (4 * a * c);      // b^2 - 4ac
        if (discr < 0) {
          return null;
        }

Once we have the discriminant, we can calculate the rest of the quadratic
formula to give us the time of intersection. If the time is greater than 1, it
means the intersection occurred past the end of the segment, so no collision
occurred and we can return early.

        let time = (-b - Math.sqrt(discr)) / (2 * a);
        if (time > 1) {
          return null;
        }

If we've gotten this far, a collision occurred, and we can use the values to
calculate and return a hit.

        time = clamp(time, 0, 1);
        let hit = new Hit(this);
        hit.normal.x = mx + time * dx;
        hit.normal.y = my + time * dy;
        hit.normal.normalize();
        hit.pos.x = pos.x + time * dx;
        hit.pos.y = pos.y + time * dy;
        hit.time = time;
        return hit;
      }


### Circle vs AABB

To test for a collision between a circle and an AABB, we can simplify it to
a test of the distance of the of the center of the circle from the closest
point on the edge of the AABB. We can calculate the closest point by clamping
the circle's position to the edges of the box:

      intersectAABB(box) {
        let dx = clamp(this.pos.x, box.pos.x - box.half.x, box.pos.x + box.half.x);
        let dy = clamp(this.pos.y, box.pos.y - box.half.y, box.pos.y + box.half.y);

Once we have the nearest point, we need to convert it into the circle's
coordinate space -- that is, make the point relative to the circle's center:

        dx -= this.pos.x;
        dy -= this.pos.y;

Then we can calculate the length of that vector, and if it's greater than the
radius of the circle, the circle isn't colliding with the box:

        let distanceSquared = dx * dx + dy * dy;
        if (distanceSquared >= this.radius * this.radius) {
          return null;
        }

Otherwise, they're colliding, and we need to create a hit.

        let hit = new Hit(this);
        hit.normal.x = box.pos.x - this.pos.x;
        hit.normal.y = box.pos.y - this.pos.y;
        hit.normal.normalize();
        hit.pos.x = this.pos.x + (hit.normal.x * this.radius);
        hit.pos.y = this.pos.y + (hit.normal.y * this.radius);
        let px, py;
        if (abs(hit.normal.x) > abs(hit.normal.y)) {
          px = box.half.x * sign(hit.normal.x);
          py = px * (hit.normal.y) / hit.normal.x;
        } else {
          py = box.half.y * sign(hit.normal.y);
          px = (py * hit.normal.x) / hit.normal.y;
        }
        hit.delta.x = (hit.pos.x + px) - box.pos.x;
        hit.delta.y = (hit.pos.y + py) - box.pos.y;
        return hit;
      }


### Circle vs Circle

The last few tests were a little complicated, so here's an easy one for you.
Checking for the intersection of a circle with another circle is as simple as
inflating the size of one circle by the size of the other, and doing a point
check. We can reuse the `intersectPoint` function we've already created to do
just that.

      intersectCircle(circle) {
        return this.intersectPoint(circle.pos, circle.radius);
      }


### Circle vs Swept Circle

Much like we were able to simplify the circle vs circle test, we can also
simplify this test. By inflating the size of the stationary circle to include
the size of the moving one, this check can become a circle vs segment test.

If the sweep isn't actually moving anywhere, we'll just do a static test, like
we've done for the other sweep tests.

      sweepCircle(circle, delta) {
        let sweep = new Sweep();
        if (delta.x === 0 && delta.y === 0) {
          sweep.pos.x = circle.pos.x;
          sweep.pos.y = circle.pos.y;
          sweep.hit = this.intersectCircle(circle);
          if (sweep.hit) {
            sweep.time = sweep.hit.time = 0;
          } else {
            sweep.time = 1;
          }
          return sweep;
        }
        sweep.hit = this.intersectSegment(circle.pos, delta, circle.radius);
        if (sweep.hit) {
          sweep.time = clamp(sweep.hit.time - EPSILON, 0, 1);
          sweep.pos.x = circle.pos.x + delta.x * sweep.time;
          sweep.pos.y = circle.pos.y + delta.y * sweep.time;
          sweep.hit.pos.x -= sweep.hit.normal.x * circle.radius;
          sweep.hit.pos.y -= sweep.hit.normal.y * circle.radius;
        } else {
          sweep.pos.x = circle.pos.x + delta.x;
          sweep.pos.y = circle.pos.y + delta.y;
        }
        return sweep;
      }
    }


Capsules
--------

Capsules are a segment with a radius. You can imagine it as a pill shape, or a
bounding box with a half circle on each end.

    export class Capsule {
      constructor(pos, delta, radius) {
        this.pos = pos;
        this.delta = delta;
        this.radius = radius;
        this._circle = new Circle(new Point(0, 0), 0);
      }

### Capsule vs Segment

      _intersectSegmentCircle1(pos, delta) {
        this._circle.pos.x = this.pos.x;
        this._circle.pos.y = this.pos.y;
        this._circle.radius = this.radius;
        return this._circle.intersectSegment(pos, delta);
      }

      _intersectSegmentCircle2(pos, delta) {
        this._circle.pos.x = this.pos.x + this.delta.x;
        this._circle.pos.y = this.pos.y + this.delta.y;
        this._circle.radius = this.radius;
        return this._circle.intersectSegment(pos, delta);
      }

      intersectSegment(pos, delta) {
        const mx = pos.x - this.pos.x;
        const my = pos.y - this.pos.y;
        const md = mx * this.delta.x + my * this.delta.y;
        const nd = delta.x * this.delta.x + delta.y * this.delta.y;
        if (md < 0 && md + nd < 0) {
          // Segment is outside the start end of the capsule's box.
          // Intersect it with the circle at that end of the capsule.
          return this._intersectSegmentCircle1(pos, delta);
        }
        const dd = this.delta.x * this.delta.x + this.delta.y * this.delta.y;
        if (md > dd && md + nd > dd) {
          // Segment is outside the other end of the capsule's box.
          // Intersect it with the circle at that end of the capsule.
          return this._intersectSegmentCircle2(pos, delta);
        }
        const nn = delta.x * delta.x + delta.y * delta.y;
        const mn = mx * delta.x + my * delta.y;
        const a = dd * nn - nd * nd;
        const k = (mx * mx + my * my) - (this.radius * this.radius);
        const c = (dd * k) - (md * md);
        if (abs(a) < EPSILON) {
          // Segment runs parallel to the capsule axis
          if (c > 0) {
            // 'a' and thus the segment lie outside the capsule.
            return null;
          }
          // Segment intersects the capsule. Figure out how.
          if (md < 0) {
            return this._intersectSegmentCircle1(pos, delta);
          } else if (md > dd) {
            return this._intersectSegmentCircle2(pos, delta);
          }
          const center = new Point(this.pos.x + this.delta.x / 2,
                                   this.pos.y + this.delta.y / 2);
          const normal = new Point(this.delta.x, this.delta.y);
          normal.normalize();
          const hit = new Hit(this);
          hit.time = 0;
          hit.normal.x = (pos.x - center.x) * normal.y;
          hit.normal.y = (pos.y - center.y) * normal.x;
          hit.normal.normalize();
          hit.pos.x = pos.x;
          hit.pos.y = pos.y;
          hit.delta.x = 0;
          hit.delta.y = 0;
          return hit;
        }

        const b = (dd * mn) - (nd * md);
        const discr = (b * b) - (a * c);
        if (discr < 0) {
          // No real roots; no intersection.
          return null;
        }

        const time = (-b - Math.sqrt(discr)) / a;
        if (md + time * nd < 0) {
          return this._intersectSegmentCircle1(pos, delta);
        } else if (md + time * nd > dd) {
          return this._intersectSegmentCircle2(pos, delta);
        } else if (time >= 0 && time <= 1) {
          const center = new Point(this.pos.x + this.delta.x / 2,
                                   this.pos.y + this.delta.y / 2);
          const normal = new Point(this.delta.x, this.delta.y);
          normal.normalize();
          const hit = new Hit(this);
          hit.time = time;
          hit.normal.x = (pos.x - center.x) * normal.y;
          hit.normal.y = (pos.y - center.y) * normal.x;
          hit.normal.normalize();
          hit.pos.x = pos.x + time * delta.x;
          hit.pos.y = pos.y + time * delta.y;
          hit.delta.x = 0;  // FIXME
          hit.delta.y = 0;
          return hit;
        }
        return null;
      }
    }
