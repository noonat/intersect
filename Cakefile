{spawn, exec} = require 'child_process'

option '-w', '--watch', 'continually build the library'

task 'build', 'build the library', (options) ->
  coffee = spawn 'coffee', ['-c' + (if options.watch then 'w' else ''), '.']
  coffee.stdout.on 'data', (data) -> console.log data.toString().trim()
  coffee.stderr.on 'data', (data) -> console.log data.toString().trim()

task 'doc', 'rebuild the documentation', ->
  exec([
    'docco --layout linear intersect.litcoffee',
    'sed -e "s~public/~docs/public/~" -e "s~docco.css~docs/docco.css~" < docs/intersect.html > index.html'
  ].join(' && '), (err) ->
    throw err if err
  )
