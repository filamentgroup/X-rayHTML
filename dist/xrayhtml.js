/*! X-rayHTML - v2.1.2 - 2016-05-18
* https://github.com/filamentgroup/x-rayhtml
* Copyright (c) 2016 Filament Group; Licensed MIT */
window.jQuery = window.jQuery || window.shoestring;

(function( $ ) {
  var xrayiframeid = 0;
  var pluginName = "xrayhtml",
		o = {
		text: {
			open: "View Source",
			close: "View Demo",
			titlePrefix: "Example",
			antipattern: "Do Not Use"
		},
		classes: {
			button: "btn btn-small",
			open: "view-source",
			sourcepanel: "source-panel",
			title: "xraytitle",
			antipattern: "antipattern"
		},
		initSelector: "[data-" + pluginName + "]",
		defaultReveal: "inline"
	},
	methods = {
		_create: function() {
			return $( this ).each(function() {
				var init = $( this ).data( "init." + pluginName );

				if( init ) {
					return false;
				}

				$( this )
					.data( "init." + pluginName, true )
					[ pluginName ]( "_init" )
					.trigger( "create." +  pluginName );
			});
		},
		_init: function() {
			var $self =	 $(this);

			$self.data( "id." + pluginName, xrayiframeid++);

			var method = $( this ).attr( "data-" + pluginName ) || o.defaultReveal;

			if( method === "flip" ) {
				$( this )[ pluginName ]( "_createButton" );
			}

			$( this )
				.addClass( pluginName + " " + "method-" + method )
			[ pluginName ]( "_createSource" );

			// use an iframe to host the source
			if( $(this).is("[data-" + pluginName + "-iframe]") ){

				// grab the snippet html to ship to the iframe
				var snippetHTML = $(this).find(".snippet").html();

				// grab the url of the iframe to load
				var url = $(this).attr("data-" + pluginName + "-iframe");

				// grab the selector for the element in the iframe to put the html in
				var selector = $(this).attr("data-" + pluginName + "-iframe-target");

				// create the iframe element, so we can bind to the load event
				var $iframe = $("<iframe src='" + url + "'/>");

				// get the scripts and styles to ship to the iframe
				// TODO we should support styles/scripts elsewhere in the page
				var headHTML = $( "head" ).html();

				// wait until the iframe loads to send the data
				$iframe.bind("load",function(){

					// wait for the iframe page to transmit the height of the page
					$(window).bind("message", function(event){
						var data = JSON.parse(event.data || event.originalEvent.data);

						if( data.iframeid !== $self.data("id." + pluginName) ){
							return;
						}

						$iframe.attr("height", data.iframeheight);
					});

					// send a message to the iframe with the snippet to load and any
					// assets that are required to make it look right
					$iframe[0].contentWindow.postMessage({
						html: snippetHTML,
						head: headHTML,
						id: $self.data("id." + pluginName),
						selector: selector
					}, "*");
				});

				// style the iframe properly
				$iframe.addClass("xray-iframe");

				// replace the snippet which is rendered in the page with the iframe
				$(this).find(".snippet").html("").append($iframe);
			}
		},
		_createButton: function() {
			var btn = document.createElement( "a" ),
				txt = document.createTextNode( o.text.open ),
				el = $( this );

			btn.setAttribute( "class", o.classes.button );
			btn.href = "#";
			btn.appendChild( txt );

			$( btn )
				.bind( "click", function( e ) {
					var isOpen = el.attr( "class" ).indexOf( o.classes.open ) > -1;

					el[ isOpen ? "removeClass" : "addClass" ]( o.classes.open );
					btn.innerHTML = ( isOpen ? o.text.open : o.text.close );

					e.preventDefault();

				})
				.insertBefore( el );
		},
		_createSource: function() {
			var el = this;
			var getPrefixText = function () {
				if( el.className.match( new RegExp( "\\b" + o.classes.antipattern + "\\b", "gi" ) ) ) {
					return o.text.antipattern;
				}
				return o.text.titlePrefix;
			};
			var title = el.getElementsByClassName( o.classes.title );
			var deprecatedTitle;
			var preel = document.createElement( "pre" );
			var codeel = document.createElement( "code" );
			var wrap = document.createElement( "div" );
			var sourcepanel = document.createElement( "div" );
			var code;
			var leadingWhiteSpace;
			var source;

			if( title.length ) {
				title = title[ 0 ];
				title.parentNode.removeChild( title );
				title.innerHTML = getPrefixText() + ": " + title.innerHTML;
			} else {
				deprecatedTitle = el.getAttribute( "data-title" );
				title = document.createElement( "div" );
				title.className = o.classes.title;
				title.innerHTML = getPrefixText() + ( deprecatedTitle ? ": " + deprecatedTitle : "" );
			}

			// remove empty value attributes
			code = el.innerHTML.replace( /\=\"\"/g, '' );
			leadingWhiteSpace = code.match( /(^[\s]+)/ );

			if( leadingWhiteSpace ) {
				code = code.replace( new RegExp( leadingWhiteSpace[ 1 ], "gmi" ), "\n" );
			}

			source = document.createTextNode( code );

			wrap.setAttribute( "class", "snippet" );

			$( el ).wrapInner( wrap );

			codeel.appendChild( source );
			preel.appendChild( codeel );

			sourcepanel.setAttribute( "class", o.classes.sourcepanel );
			sourcepanel.appendChild( preel );

			this.appendChild( sourcepanel );
			this.insertBefore( title, this.firstChild );
		}
	};

	// Collection method.
	$.fn[ pluginName ] = function( arrg, a, b, c ) {
		return this.each(function() {

			// if it's a method
			if( arrg && typeof( arrg ) === "string" ){
				return $.fn[ pluginName ].prototype[ arrg ].call( this, a, b, c );
			}

			// don't re-init
			if( $( this ).data( pluginName + "data" ) ){
				return $( this );
			}

			// otherwise, init
			$( this ).data( pluginName + "active", true );
			$.fn[ pluginName ].prototype._create.call( this );
		});
	};

	// add methods
	$.extend( $.fn[ pluginName ].prototype, methods );

	//  auto-init
	var initted;
	function init(){
		if( !initted ){
			$( o.initSelector )[ pluginName ]();
			initted = true;
		}
	}
	// init either on beforeenhance event or domready, whichever comes first.
	$( document ).bind("beforeenhance", init );
	$( init );


}( jQuery ));
