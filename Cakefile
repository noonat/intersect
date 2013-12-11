{readdirSync} = require 'fs'
{spawn, exec} = require 'child_process'

option '-w', '--watch', 'continually build the library'

build = ({callback, watch}) ->
  files = (fn for fn in readdirSync(__dirname) when fn.match(/\.(lit)?coffee$/i))
  coffee = spawn 'coffee', ['-c' + (if watch then 'w' else '')].concat(files)
  coffee.stdout.on 'data', (data) -> console.log data.toString().trim()
  coffee.stderr.on 'data', (data) -> console.log data.toString().trim()
  coffee.on 'exit', (status) -> callback?() if status is 0

task 'build', 'build the library', (options) ->
  build(options)

task 'doc', 'rebuild the documentation', ->
  build callback: ->
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

task 'test', 'run the tests', ->
  build callback: ->
    {reporters} = require 'nodeunit'
    reporters.default.run ['test']
