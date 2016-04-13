var Scrollbear = (function(window, document) {
  function start(
    target = document.body, 
    changedItem = target.querySelectorAll('img')) {
    var scroller = target
    var contents = Array.from(scroller.childNodes)
    var unloadItems = Array.from(changedItem || []).map(img => assign(img, 'caculatedHeight', 0))
    var oldHeight = contents.reduce((total, content) => total + (content.offsetHeight || 0), 0)

    window.requestAnimationFrame(function frame(time) {
      var newHeight = container.offsetHeight
      // save the normal scroll position
      var scroll = getScroll(scroller)
      // container height change, means there's a image loaded
      if (isHeightChange(oldHeight, newHeight) &&
        // get loaded image, then determine if it's above the viewport 
        getLoadedItems(unloadItems)[0].offsetTop < getScroll(scroller)) {
        // mark that part of item height is already be calculated
        unloadItems = markLoadedItems(unloadItems)
        // return to normal scroll position, avoid the page jump
        returnScroll(scroller, scroll + (newHeight - oldHeight))
      }
      oldHeight = newHeight
      window.requestAnimationFrame(frame)
    })
  }
  
  function assign(target, prop, value) {
    target[prop] = value
    return target
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
  function markLoadedItems(items) {
    return items.map(item => assign(item, 'caculatedHeight', item.offsetHeight))
  }
  function getLoadedItems(items) {
    return items.filter(item => item.offsetHeight > item.caculatedHeight)
  }
  // Public APIs
  return {
    start: start
  }
})(window, document)
