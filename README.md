JavaScript 2D Collision Detection [![Build Status][travis_image]][travis]
=================================

Intersect is a collection of common 2D collision detection tests, written as a
[tutorial][annotated]. Hopefully this saves you from the pain of hunting them
down yourself, or trying to rip them out of physics libraries.

If you're looking for further reading, you are hurting yourself if you don't
buy [Real-Time Collision Detection][rtcd]. It is easily the best purchase you
could make if you are learning about collision detection. There is also an
excellent [list of different algorithms here][algorithms].

The code is written in TypeScript, but it's simple and should be easily
portable to your language of choice. To get started, take a look at:

- [the annotated, TypeScript source for the 2D collision library][annotated]
- [the TypeScript source for the library itself, extracted from the tutorial][intersect]
- [the TypeScript source for the examples used in the tutorial][examples]

Note that the compiled JavaScript source is also available in the lib folder,
if you find TypeScript difficult to read.

[annotated]: http://noonat.github.io/intersect
[examples]: https://github.com/noonat/intersect/blob/master/src/examples.ts
[intersect]: https://github.com/noonat/intersect/blob/master/src/intersect.ts
[rtcd]: http://realtimecollisiondetection.net/
[algorithms]: http://www.realtimerendering.com/intersections.html
[travis]: http://travis-ci.org/noonat/intersect
[travis_image]: https://secure.travis-ci.org/noonat/intersect.png?branch=master
