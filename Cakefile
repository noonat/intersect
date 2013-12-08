{spawn, exec} = require 'child_process'

option '-w', '--watch', 'continually build the library'

task 'build', 'build the library', (options) ->
  coffee = spawn 'coffee', ['-c' + (if options.watch then 'w' else ''), '.']
  coffee.stdout.on 'data', (data) -> console.log data.toString().trim()
  coffee.stderr.on 'data', (data) -> console.log data.toString().trim()

task 'doc', 'rebuild the documentation', ->
  expressions = [
    '-e "s~public/~docs/public/~"'
    '-e "s~docco.css~docs/docco.css~"'
    '-e "s~</body>~<script src="intersect.js"></script><script src="examples.js"></script></body>~"'
  ]
  exec([
    'docco --layout linear intersect.litcoffee'
    "sed #{expressions.join(" ")} < docs/intersect.html > index.html"
    'rm docs/intersect.html'
  ].join(' && '), (err) ->
    throw err if err
  )
