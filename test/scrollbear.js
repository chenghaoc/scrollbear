import test from 'ava'
import 'babel-register'
import Scrollbear from '../src/scrollbear.js'
test('register is exported successfully', t => {
  var div = document.createElement('div')
  Scrollbear.start(div)
  t.is(1, 1)
})
