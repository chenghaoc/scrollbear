# Scrollbear
Scrollbear is a tool that maintains the container scroll position when images loaded. Scrollbear is suitable in blog platforms where exist many photos and images. When images loaded, the scroll position will *jump* and cause a unfriendly experience. Scrollbear will trace the container height and maintain the scroll position when the images loaded and container height change.

## Installation

`npm install scrollbear`

## API

##### Scrollbear.start(target [, changedItems])

`target` is the DOM where scroll bar exists (Normally is the container of contents), normally the direct child node of this target will be a DOM with really long content (such as the content of blog articles).

`changeItems` is optional. It is useful when images is lazy loading into your page. In such case, you can specify the *placeholder* of images. When images is lazy-loaded, the height of placeholder will change, and trigger the Scrollbear to justify the scroll position.

## Development

I use ES6 without transpiler, so just write some clean code and enjoy it!

## Contribute

Issues or PR are all Welcome!

## License

MIT
