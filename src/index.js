import Scrollbear from './scrollbear'

if (typeof exports === 'object')
    module.exports = Scrollbear
  else if (typeof define === 'function' && typeof define.amd !== 'undefined')
    define(function() { return Scrollbear })
  else
    window.Scrollbear = Scrollbear
