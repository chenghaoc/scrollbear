var container = document.querySelector('#container')
var scroll = container.parentNode
var unloadImages = Array.from(container.querySelectorAll('img'))
// unloadImages.forEach(img => console.dir(img.offsetHeight))
// Array.from(container.querySelectorAll('img')).forEach(img => {
//   img.onload = e => {
//     console.log(e.target)
//     console.log(scroll.scrollTop)
//     console.log(document.scrollTop)
//     console.log(window.scrollTop)
//     console.log(document.body.scrollTop)
//     // console.log($(window).scrollTop())
//     console.log(window.pageYOffset);
//   }
// })
var oldHeight
var scroll
requestAnimationFrame(function frame(time) {
  // console.log(window.pageYOffset);
  // console.log(container.offsetHeight);
  var newHeight = container.offsetHeight
  scroll = getScroll()
  // container height change, means there's a image loaded
  if (isHeightChange(oldHeight, newHeight) &&
    // get loaded image, then determine if it's above the viewport 
    getLoadedImages(unloadImages)[0].offsetTop < window.scrollY) {
    console.log('ret');
    unloadImages = removeLoadedImages(unloadImages)
    var offset = newHeight - oldHeight
    returnScroll(window, scroll + offset)
  }
  oldHeight = newHeight
  requestAnimationFrame(frame)
})

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

function getLoadedImages(images) {
  return images.filter(img => {
    return img.offsetHeight > 0
  })
}
function removeLoadedImages(images) {
  return images.filter(img => {
    return img.offsetHeight === 0
  })
}
function isImageAboveViewport() {

}
