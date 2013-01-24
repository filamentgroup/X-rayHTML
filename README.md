# X-rayHTML

A little something to help build documentation pages.

Instead of dropping in a block of markup to render as a demo, then copying and pasting it into a `pre`/`code` block, then escaping it—then going back and updating both the rendered code and the escaped code should something change: now you just wrap the code you’re rendering in a `div` and it generates a copy/pastable source snippet. Credit to [@ugomobi](http://github.com/ugomobi) for the original idea, which is in use on the [jQuery Mobile docs](http://jquerymobile.com/test).

## Demos
[Here’s the plugin in action](http://filamentgroup.github.com/X-rayHTML/).

The second demo uses the plugin’s “create” event (`create.view-source` by default, but configurable) to bolt on the [Prism.js](http://prismjs.com) syntax highlighter, the third demo uses [ZeroClipboard](https://github.com/jonrohan/ZeroClipboard) to add a quick “copy to clipboard” button, and the last demo uses both. 

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
var o = {
	pluginName: "view-source",
	text: {
		open: "View Source",
		close: "View Demo"
	},
	classes: {
		button: "btn btn-small",
		open: "view-source",
		sourcepanel: "source-panel"
	},
	initSelector: ".source"
}
```

By default, functionality is hooked to the class `source`. A `pre`/`code` block gets dropped into place, so whitespace inside of `.source` counts the same way. For example:

```html
<div class="source"><aside>
	<blockquote>
		<p>It is the unofficial force—the Baker Street irregulars.</p>
	</blockquote>
	<address>Sherlock Holmes</address>
	<cite>Sign of Four</cite>
</aside></div>
```
