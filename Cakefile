{spawn, exec} = require 'child_process'

task 'build', 'continually build the library with --watch', ->
  coffee = spawn 'coffee', ['-cw', '-o', 'lib', 'src']
  coffee.stdout.on 'data', (data) -> console.log data.toString().trim()

task 'doc', 'rebuild the documentation', ->
  exec([
    'docco src/intersect.coffee'
  ].join(' && '), (err) ->
    throw err if err
  )
