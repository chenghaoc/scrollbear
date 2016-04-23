# [Scrollbear](http://changbenny.github.io/scrollbear/)

[Scrollbear](http://changbenny.github.io/scrollbear/) is a tool that maintains the container scroll position when images loaded. Scrollbear is suitable in blog platforms where exist many photos and images. When images loaded, the scroll position will *jump* and cause a unfriendly experience. Scrollbear will trace the container height and maintain the scroll position when the images loaded and container height change.

## [Demo](http://changbenny.github.io/scrollbear/demo/static_img.html)

## Installation

`npm install scrollbear`

## Usage

```html
<div id='scroll' style='overflow: scroll;'>
    <div id='container'>
        <p>long content</p>
        <p>long content</p>
    </div>
</div>
<script src='scrollbear.js'></script>
```

```javascript
Scrollbear.start(document.getElementById('scroll'))
```

## API

#### Scrollbear.start(target [, changedItems])

`target` is the DOM where scroll bar exists (Normally is the container of contents), normally the direct child node of this target will be a DOM with really long content (such as the content of blog articles).

`changeItems` is optional. It is useful when images is lazy loading into your page. In such case, you can specify the *placeholder* of images. When images is lazy-loaded, the height of placeholder will change, and trigger the Scrollbear to justify the scroll position.

#### Scrollbear.stop()


## Development

Install development dependency

```sh
npm install
```

Build

```sh
gulp
```

Test

```
npm test
```

## Contribute

Issues or PR are all Welcome!

## License

MIT
