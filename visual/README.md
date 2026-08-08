# Visual tests

These answer a different question from the tests in `test/`. Those check that
the intersection maths is right. These check that the page built from
`src/intersect.ts.md` still looks like the page: that the figures are inlined
and wired to the palette, that the theme, contents and formulas still work,
and that the examples still draw what they are supposed to draw.

They are deliberately not part of `npm test`, which is jest and eslint and
runs offline in a couple of seconds. Run them with:

    npm run test:visual

## The three layers

**`structure.spec.ts`** asserts things that can be named, and keeps no images.
A figure that stopped being inlined, a class that fell through the mapping in
`build.js`, a `\htmlClass` option that quietly stopped applying, an example
that no longer mounts — each of these fails here by saying what happened.
Most of the value in the suite is in this file, and none of it churns when the
design changes.

**`figures.spec.ts`** records one image per inlined figure, per theme. Both
themes, because the figures follow the page.

**`examples.spec.ts`** records the animated canvases at chosen frames. One
theme only, because `.example` pins the dark palette in both — which
`structure.spec.ts` asserts, so it stays true or something says so.

## Why screenshots of an animation are reproducible

There is no clock and no randomness anywhere in `src/examples.ts`: every
example derives its state by accumulating `requestAnimationFrame` deltas.
`helpers.ts` replaces the frame queue with one the test pumps by hand, at the
1/60 the page already assumes, so "frame 240" is the same picture every time.

Loading with `#animate-all` switches off the `IntersectionObserver` gating,
which is what that hash was added for: without it every canvas below the fold
records blank.

The frame numbers in `examples.spec.ts` were found by stepping each example
through six hundred frames and classifying what it had drawn, then taking a
frame from the middle of a long run in each state it reaches. Each one is
recorded with an assertion about which palette roles should be on screen, so
an example that drifts into a different state fails by saying so rather than
as a rectangle of changed pixels.

## Baselines

`__screenshots__` holds Linux images, produced by the Chromium that
`@playwright/test` resolves to. The version matters: a different Chromium
renders antialiased edges differently, and every baseline would fail at once.
CI runs in `mcr.microsoft.com/playwright:v1.56.0-noble` for exactly this
reason, and `@playwright/test` is pinned exactly rather than with a caret so
that a routine bump cannot swap the browser out from under the baselines.
Upgrading it means changing the container in `ci.yml` and the docker script in
`package.json` to match, and regenerating the baselines in the same commit.

There is a tolerance of 0.2% of pixels per image, which absorbs the noise
along a diagonal edge without absorbing a regression — a shape that stopped
being drawn, or a role that picked up the wrong colour, moves far more than
that.

To regenerate them after an intended change, on any host with docker:

    npm run test:visual:update:docker

That runs the update inside the pinned container, so the images are the ones
CI will compare against. `npm run test:visual:update` regenerates them with
whatever browser is installed locally instead, which is useful for looking at
but should not be committed from a machine that is not Linux.

Review the diff before committing it. These images are the record of what the
page is supposed to look like, and a baseline updated without being looked at
records a bug as the expected result.
