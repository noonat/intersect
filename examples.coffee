{AABB, Point} = intersect

class Example
  constructor: (@context, @width, @height) ->
    @origin = new Point(@width * 0.5, @height * 0.5)
    @infiniteLength = Math.sqrt(@width * @width + @height * @height)

  drawAABB: (box, color='#fff', thickness=1) ->
    x1 = Math.floor(@origin.x + box.pos.x - box.half.x)
    y1 = Math.floor(@origin.y + box.pos.y - box.half.y)
    x2 = Math.floor(@origin.x + box.pos.x + box.half.x)
    y2 = Math.floor(@origin.y + box.pos.y + box.half.y)
    @context.beginPath()
    @context.moveTo(x1, y1)
    @context.lineTo(x2, y1)
    @context.lineTo(x2, y2)
    @context.lineTo(x1, y2)
    @context.lineTo(x1, y1)
    @context.closePath()
    @context.lineWidth = thickness
    @context.strokeStyle = color
    @context.stroke()

  drawCircle: (circle, color='#fff', thickness=1) ->
    x = Math.floor(@origin.x + circle.pos.x)
    y = Math.floor(@origin.y + circle.pos.y)
    @context.beginPath()
    @context.arc(x, y, circle.radius, 0, 2 * Math.PI, true)
    @context.closePath()
    @context.lineWidth = thickness
    @context.strokeStyle = color
    @context.stroke()

  drawPoint: (point, color='#fff', text='', thickness=1) ->
    x = Math.floor(@origin.x + point.x - (thickness / 2))
    y = Math.floor(@origin.y + point.y - (thickness / 2))
    @context.lineWidth = thickness
    @context.fillStyle = color
    @context.strokeStyle = color
    @context.fillRect(x, y, thickness, thickness)
    @context.strokeRect(x, y, thickness, thickness)
    @context.fillText(text, x + thickness * 4, y + thickness * 2) if text

  drawRay: (pos, dir, length, color='#fff', arrow=true, thickness=1) ->
    pos2 = new Point(pos.x + dir.x * length, pos.y + dir.y * length)
    @drawSegment(pos, pos2, color, thickness)
    if arrow
      pos = pos2.clone()
      pos2.x = pos.x - dir.x * 4 + dir.y * 4
      pos2.y = pos.y - dir.y * 4 - dir.x * 4
      @drawSegment(pos, pos2, color, thickness)
      pos2.x = pos.x - dir.x * 4 - dir.y * 4
      pos2.y = pos.y - dir.y * 4 + dir.x * 4
      @drawSegment(pos, pos2, color, thickness)

  drawSegment: (point1, point2, color='#fff', thickness=1) ->
    x1 = Math.floor(@origin.x + point1.x)
    y1 = Math.floor(@origin.y + point1.y)
    x2 = Math.floor(@origin.x + point2.x)
    y2 = Math.floor(@origin.y + point2.y)
    @context.beginPath()
    @context.moveTo(x1, y1)
    @context.lineTo(x2, y2)
    @context.closePath()
    @context.lineWidth = thickness
    @context.strokeStyle = color
    @context.stroke()

  tick: (elapsed) ->
    @context.fillStyle = '#000'
    @context.fillRect(0, 0, @width, @height)


class AABBPointExample extends Example
  constructor: ->
    super
    @angle = 0
    @pos = new Point()
    @box = new AABB(new Point(0, 0), new Point(16, 16))

  tick: (elapsed) ->
    super
    @angle += 0.5 * Math.PI * elapsed
    @pos.x = Math.cos(@angle * 0.4) * 32
    @pos.y = Math.sin(@angle) * 12
    hit = @box.intersectPoint(@pos)
    @drawAABB(@box, '#666')
    if hit
      @drawPoint(@pos, '#f00')
      @drawPoint(hit.pos, '#ff0')
    else
      @drawPoint(@pos, '#0f0')


class AABBSegmentExample extends Example
  constructor: ->
    super
    @angle = 0
    @box = new AABB(new Point(0, 0), new Point(16, 16))

  tick: (elapsed) ->
    super
    @angle += 0.5 * Math.PI * elapsed
    pos1 = new Point(Math.cos(@angle) * 64, Math.sin(@angle) * 64)
    pos2 = new Point(Math.sin(@angle) * 32, Math.cos(@angle) * 32)
    delta = new Point(pos2.x - pos1.x, pos2.y - pos1.y)
    hit = @box.intersectSegment(pos1, delta)
    dir = delta.clone()
    length = dir.normalize()
    @drawAABB(@box, '#666')
    if hit?
      @drawRay(pos1, dir, length, '#f00')
      @drawSegment(pos1, hit.pos, '#ff0')
      @drawPoint(hit.pos, '#ff0')
      @drawRay(hit.pos, hit.normal, 6, '#ff0', false)
    else
      @drawRay(pos1, dir, length, '#0f0')


class AABBAABBExample extends Example
  constructor: ->
    super
    @angle = 0
    @box1 = new AABB(new Point(0, 0), new Point(64, 16))
    @box2 = new AABB(new Point(0, 0), new Point(16, 16))

  tick: (elapsed) ->
    super
    @angle += 0.2 * Math.PI * elapsed
    @box2.pos.x = Math.cos(@angle) * 96
    @box2.pos.y = Math.sin(@angle * 2.4) * 24
    hit = @box1.intersectAABB(@box2)
    @drawAABB(@box1, '#666')
    if hit?
      @drawAABB(@box2, '#f00')
      @box2.pos.x += hit.delta.x
      @box2.pos.y += hit.delta.y
      @drawAABB(@box2, '#ff0')
      @drawPoint(hit.pos, '#ff0')
      @drawRay(hit.pos, hit.normal, 4, '#ff0', false)
    else
      @drawAABB(@box2, '#0f0')


class AABBSweptAABBExample extends Example
  constructor: ->
    super
    @angle = 0
    @staticBox = new AABB(new Point(0, 0), new Point(112, 16))
    @sweepBoxes = [
      new AABB(new Point(-152, 24), new Point(16, 16)),
      new AABB(new Point(128, -48), new Point(16, 16))]
    @sweepDeltas = [
      new Point(64, -12),
      new Point(-32, 96)]
    @tempBox = new AABB(new Point(0, 0), new Point(16, 16))

  tick: (elapsed) ->
    super
    @angle += 0.5 * Math.PI * elapsed
    @drawAABB(@staticBox, '#666')
    factor = ((Math.cos(@angle) + 1) * 0.5) || 1e-8
    for box, i in @sweepBoxes
      delta = @sweepDeltas[i].clone()
      delta.x *= factor
      delta.y *= factor
      sweep = @staticBox.sweepAABB(box, delta)
      dir = delta.clone()
      length = dir.normalize()
      @drawAABB(box, '#666')
      if sweep.hit?
        # Draw a red box at the point where it was trying to move to
        @drawRay(box.pos, dir, length, '#f00')
        @tempBox.pos.x = box.pos.x + delta.x
        @tempBox.pos.y = box.pos.y + delta.y
        @drawAABB(@tempBox, '#f00')
        # Draw a yellow box at the point it actually got to
        @tempBox.pos.x = sweep.pos.x
        @tempBox.pos.y = sweep.pos.y
        @drawAABB(@tempBox, '#ff0')
        @drawPoint(sweep.hit.pos, '#ff0')
        @drawRay(sweep.hit.pos, sweep.hit.normal, 4, '#ff0', false)
      else
        @tempBox.pos.x = sweep.pos.x
        @tempBox.pos.y = sweep.pos.y
        @drawAABB(@tempBox, '#0f0')
        @drawRay(box.pos, dir, length, '#0f0')


class MultipleAABBSweptAABBExample extends Example
  constructor: ->
    super
    @delta = new Point
    @velocity = new Point(48, 48)
    @movingBox = new AABB(new Point(0, 0), new Point(8, 8))
    @staticBoxes = [
      new AABB(new Point(-96, 0), new Point(8, 48))
      new AABB(new Point( 96, 0), new Point(8, 48))
      new AABB(new Point(0, -56), new Point(104, 8))
      new AABB(new Point(0,  56), new Point(104, 8))]

  reflect: (velocity, normal, out) ->
    dot = velocity.x * normal.x + velocity.y * normal.y
    ux = normal.x * dot
    uy = normal.y * dot
    wx = velocity.x - ux
    wy = velocity.y - uy
    out.x = wx - ux
    out.y = wy - uy

  tick: (elapsed) ->
    super
    @delta.x = @velocity.x * elapsed
    @delta.y = @velocity.y * elapsed
    sweep = @movingBox.sweepInto(@staticBoxes, @delta)
    if sweep.hit
      # This should really attempt to slide along the hit normal, and use up
      # the rest of the velocity, but that's a bit much for this example
      @reflect(@velocity, sweep.hit.normal, @velocity)
    for staticBox in @staticBoxes
      if sweep.hit and sweep.hit.collider == staticBox
        @drawAABB(staticBox, '#aaa')
      else
        @drawAABB(staticBox, '#666')
    @movingBox.pos = sweep.pos
    @drawAABB(@movingBox, if sweep.hit then '#ff0' else '#0f0')


ready = (callback) ->
  if document.readyState == 'complete'
    setTimeout(callback, 1)
  else
    handler = ->
      document.removeEventListener('DOMContentLoaded', handler, false)
      callback()
    document.addEventListener('DOMContentLoaded', handler, false)


ready ->
  exampleIds =
    'aabb-vs-point': AABBPointExample
    'aabb-vs-segment': AABBSegmentExample
    'aabb-vs-aabb': AABBAABBExample
    'aabb-vs-swept-aabb': AABBSweptAABBExample
    'sweeping-an-aabb-through-multiple-objects': MultipleAABBSweptAABBExample

  examples = []
  for id, exampleConstructor of exampleIds
    anchor = document.getElementById(id)
    if anchor
      canvas = document.createElement('canvas')
      anchor.parentNode.insertBefore(canvas, anchor.nextSibling)
      width = canvas.width = 640
      height = canvas.height = 160
      context = canvas.getContext('2d')
      context.translate(0.5, 0.5)
      example = new exampleConstructor(context, width, height)
      examples.push(example) if example

  setInterval(->
    for example in examples
      example.tick(1 / 30)
  , 1000 / 30)
