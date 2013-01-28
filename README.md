# X-rayHTML

A little something to help build documentation pages.

Instead of dropping in a block of markup to render as a demo, then copying and pasting it into a `pre`/`code` block, then escaping it—then going back and updating both the rendered code and the escaped code should something change: now you just wrap the code you’re rendering in a `div` and it generates a copy/pastable source snippet. Credit to [@ugomobi](http://github.com/ugomobi) for the original idea, which is in use on the [jQuery Mobile docs](http://jquerymobile.com/test).

## Demos
[Here’s the plugin in action](http://filamentgroup.github.com/X-rayHTML/).

The second set of demos are using the plugin’s “create” event (`create.xrayhtml` by default, but configurable) to bolt on [Prism.js](http://prismjs.com) syntax highlighting and [ZeroClipboard](https://github.com/jonrohan/ZeroClipboard) for a “copy to clipboard” button.

## Getting Started
Download the [production version][min] or the [development version][max], and the [structural CSS][css].

[min]: https://raw.github.com/filamentgroup/X-rayHTML/master/dist/X-rayHTML.min.js
[max]: https://raw.github.com/filamentgroup/X-rayHTML/master/dist/X-rayHTML.js
[css]: https://raw.github.com/filamentgroup/X-rayHTML/master/dist/X-rayHTML.css

In your page:

```html
<script src="jquery.js"></script>
<script src="X-rayHTML.min.js"></script>
```

and

```html
<link href="X-rayHTML.css" rel="stylesheet">
```

There are some config options up at the top of `X-rayHTML.js`:

```javascript
 var pluginName = "xrayhtml",
        o = {
        text: {
            open: "View Source",
            close: "View Demo"
        },
        classes: {
            button: "btn btn-small",
            open: "view-source",
            sourcepanel: "source-panel"
        },
        initSelector: "[data-" + pluginName + "]",
        defaultReveal: "inline"
    }
```

By default, functionality is hooked to the `xrayhtml` data attribute.

`flip` as the value of the `data-xrayhtml` attribute will gives you a snazzy flip-to-reveal animation (browsers without support for 3D tranforms will simply show/hide the code snippet).</p>

Leaving `data-xrayhtml` valueless or giving it a value of `inline` gives you—predictably enough—code snippets that are visible inline with the rendered code. 

A `pre`/`code` block gets dropped into place, so whitespace inside of the element with that attribute counts the same way. For example, to avoid a bunch of extra whitespace at the start/end of your snippet:

```html
<div data-xrayhtml><aside>
	<blockquote>
		<p>It is the unofficial force—the Baker Street irregulars.</p>
	</blockquote>
	<address>Sherlock Holmes</address>
	<cite>Sign of Four</cite>
</aside></div>
```
