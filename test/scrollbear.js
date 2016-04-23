import test from 'ava'
import 'babel-register'
import Scrollbear from '../src/scrollbear.js'

// For test, we ensure the rAF is passed one frame
const oneFrame = 30

test.beforeEach(t => {
  var div = t.context.div = document.createElement('div')
  var img = t.context.img = document.createElement('img')
  img.offsetHeight = 0
  div.appendChild(img)
})
test.afterEach(t => {
  t.context.div = undefined
  t.context.img = undefined
})


test('export Scrollbear', t => {
  if (Scrollbear)
    t.pass()
})

test.cb('#start: scroll position is maintained when loaded img is above of scroll position', t => {
  t.plan(4)

  var div = t.context.div
  var img = t.context.img
  img.offsetTop = 0
  div.scrollTop = 100

  t.is(img.offsetHeight, 0)
  Scrollbear.start(div)
  img.offsetHeight = 300
  t.is(img.offsetHeight, 300)
  setTimeout(() => {
    t.is(img.offsetHeight, 300)
    t.is(div.scrollTop, 400)
    t.end()
  }, oneFrame)
})

test.cb('#start: scroll position is not maintained when loaded img is below scroll position', t => {
  t.plan(4)
  var div = t.context.div
  var img = t.context.img
  img.offsetTop = 100
  div.scrollTop = 0


  t.is(img.offsetHeight, 0)
  Scrollbear.start(div)
  img.offsetHeight = 300
  t.is(img.offsetHeight, 300)
  setTimeout(() => {
    t.is(img.offsetHeight, 300)
    t.is(div.scrollTop, 0)
    t.end()
  }, oneFrame)
})

test.cb('#stop', t => {
  t.plan(4)
  var div = t.context.div
  var img = t.context.img
  img.offsetTop = 0
  div.scrollTop = 100


  t.is(img.offsetHeight, 0)
  Scrollbear.start(div)
  Scrollbear.stop()
  img.offsetHeight = 300
  t.is(img.offsetHeight, 300)

  setTimeout(() => {
    t.is(img.offsetHeight, 300)
    t.is(div.scrollTop, 100)
    t.end()
  }, oneFrame)
})

test.cb('#start: document.body', t => {
  t.plan(2)

  var img = document.createElement('img')
  document.body.appendChild(img)
  img.offsetHeight = 0
  img.offsetTop = 0

  window.scrollY = 100
  window.scrollTo = (x, y) => {
    window.scrollY = y
  }
  Scrollbear.start()
  img.offsetHeight = 300
  t.is(window.scrollY, 100)
  setTimeout(() => {
    t.is(window.scrollY, 400)
    t.end()
  }, oneFrame)
})
