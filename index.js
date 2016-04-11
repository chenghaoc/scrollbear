var scrollbear = (function() {
  
  function start(target) {
    var container = document.querySelector(target)
    var scroller = container.parentNode
    var unloadImages = Array.from(container.querySelectorAll('div'))
    unloadImages.forEach(img => img.caculatedHeight = 0)

    var oldHeight = container.offsetHeight
    var scroll
    requestAnimationFrame(function frame(time) {
      var newHeight = container.offsetHeight
      scroll = getScroll()
      // container height change, means there's a image loaded
      if (isHeightChange(oldHeight, newHeight) &&
        // get loaded image, then determine if it's above the viewport 
        getLoadedImages(unloadImages)[0].offsetTop < window.scrollY) {
        unloadImages = markLoadedImages(unloadImages)
        var offset = newHeight - oldHeight
        returnScroll(window, scroll + offset)
      }
      oldHeight = newHeight
      requestAnimationFrame(frame)
    })
  }

  function isHeightChange(oldHeight, newHeight) {
    return oldHeight !== newHeight
  }
  // TODO: take a look of jQuery
  function getScroll() {
    return window.scrollY
  }
  function returnScroll(target, pos) {
    target.scrollTo(0, pos)
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

