var Scrollbear = (function(window, document) {
  function start(
    target = document.body,
    changedItem = target.querySelectorAll('img')) {
    var scroller = target
    var unloadItems = Array.from(changedItem || []).map(img => { return {dom: img, caculatedHeight: 0} })
    var oldHeight = Array.from(scroller.childNodes).reduce(accumulateHeight, 0)

    // use closure to share the scope
    var frame = function() {
      var newHeight = Array.from(scroller.childNodes).reduce(accumulateHeight, 0)
      // save the normal scroll position
      var scroll = getScroll(scroller)
      // container height change, means there's a image loaded
      if (isHeightChange(oldHeight, newHeight)) {
        // get loaded image, then determine if it's above the viewport
        if (getLoadedItems(unloadItems)
          .filter(item => item.dom.offsetTop < scroll)
          .map(markLoadedItems).length > 0) {
          // mark that part of item height is already be calculated
          // unloadItems = markLoadedItems(unloadItems)
          // return to normal scroll position, avoid the page jump
          // there's only part we set the value of style, avoid sync layout threashing
          returnScroll(scroller, scroll + (newHeight - oldHeight))
        }
      }
      oldHeight = newHeight
      window.requestAnimationFrame(frame)
    }
    return window.requestAnimationFrame(frame)
  }
  function assign(target, prop, value) {
    target[prop] = value
    return target
  }
  function accumulateHeight(total, content) {
    return total + (content.offsetHeight || 0)
  }
  function isHeightChange(oldHeight, newHeight) {
    return oldHeight !== newHeight
  }
  function getScroll(target) {
    return target.scrollTop || window.scrollY
  }
  function returnScroll(target, pos) {
    // document's scrollTop is undefined, and body will not scroll
    // in these cases, we will scroll the whole window
    if (typeof target.scrollTop === 'undefined' || target === document.body)
      window.scrollTo(0, pos)
    else
      target.scrollTop = pos
  }
  function markLoadedItems(item) {
    return assign(item, 'caculatedHeight', item.dom.offsetHeight)
  }
  function getLoadedItems(items) {
    return items.filter(item => item.dom.offsetHeight > item.caculatedHeight)
  }
  // Public APIs
  return {
    start: start
  }
})(window, document)

window.Scrollbear = Scrollbear
//# sourceMappingURL=scrollbear.js.map
