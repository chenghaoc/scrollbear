var Scrollbear = (function() {
  
  function start(target, changable = container.querySelectorAll('img')) {
    var container = document.querySelector(target)
    var scroller = container.parentNode
    var unloadItem = Array.from(changable)
    unloadItem.forEach(img => img.caculatedHeight = 0)

    var oldHeight = container.offsetHeight
    var scroll
    requestAnimationFrame(function frame(time) {
      var newHeight = container.offsetHeight
      scroll = getScroll(scroller)
      // container height change, means there's a image loaded
      if (isHeightChange(oldHeight, newHeight) &&
        // get loaded image, then determine if it's above the viewport 
        getLoadedImages(unloadItem)[0].offsetTop < getScroll(scroller)) {
        unloadItem = markLoadedImages(unloadItem)
        var offset = newHeight - oldHeight
        returnScroll(scroller, scroll + offset)
      }
      oldHeight = newHeight
      requestAnimationFrame(frame)
    })
  }

  function isHeightChange(oldHeight, newHeight) {
    return oldHeight !== newHeight
  }
  // TODO: take a look of jQuery
  function getScroll(target) {
    return target.scrollTop || window.scrollY
  }
  function returnScroll(target, pos) {
    // body will not scroll
    if (typeof target.scrollTop === 'undefined' || target === document.body)
      window.scrollTo(0, pos)
    else
      target.scrollTop = pos
  }
  function markLoadedImages(images) {
    return images.map(img => {
      img.caculatedHeight = img.offsetHeight
      return img
    })
  }
  function getLoadedImages(images) {
    return images.filter(img => img.offsetHeight > img.caculatedHeight)
  }

  // Public APIs
  return {
    start: start
  }
})()

