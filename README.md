# X-rayHTML

A little something to help build documentation pages.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/filamentgroup/X-rayHTML/master/dist/X-rayHTML.min.js
[max]: https://raw.github.com/filamentgroup/X-rayHTML/master/dist/X-rayHTML.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/X-rayHTML.min.js"></script>
```

There are some config options up at the top of `X-rayHTML.js`:

```
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

By default, it’s hooked to the class `source`:


```
<div class="source">
	<div class="snippet">
		<aside>
			<blockquote>
				<p>It is the unofficial force—the Baker Street irregulars.</p>
			</blockquote>
			<address>Sherlock Holmes</address>
			<cite>Sign of Four</cite>
		</aside>
	</div>
</div>
```

## TODO:
* Shouldn’t require that second “snippet” wrapper.

The second demo uses the plugin’s “create” event to bolt on the [Prism.js](http://prismjs.com) syntax highlighter. A little clunky at the moment.