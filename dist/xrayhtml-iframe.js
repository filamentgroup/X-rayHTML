/*! X-rayHTML - v2.1.3 - 2017-06-01
* https://github.com/filamentgroup/x-rayhtml
* Copyright (c) 2017 Filament Group; Licensed MIT */
(function(){

	// Empty and exec the ready queue
	var ready = false,
			readyQueue = [],
			runReady = function(){
				if( !ready ){
					while( readyQueue.length ){
						readyQueue.shift().call( document );
					}
					ready = true;
				}
			};

	// The following is borrowed wholesale from shoestring
	// https://github.com/filamentgroup/shoestring/blob/master/src/core/ready.js
	function onReady( callback ){
		if( ready && callback ){
			callback.call( document );
		} else if( callback ){
			readyQueue.push( callback );
		} else {
			runReady();
		}

		return [document];
	}


	// Quick IE8 shiv
	if( !window.addEventListener ){
		window.addEventListener = function( evt, cb ){
			return window.attachEvent( "on" + evt, cb );
		};
	}

	// If DOM is already ready at exec time, depends on the browser.
	// From: https://github.com/mobify/mobifyjs/blob/526841be5509e28fc949038021799e4223479f8d/src/capture.js#L128
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
		runReady();
	} else {
		if( !document.addEventListener ){
			document.attachEvent( "DOMContentLoaded", runReady );
			document.attachEvent( "onreadystatechange", runReady );
		} else {
			document.addEventListener( "DOMContentLoaded", runReady, false );
			document.addEventListener( "readystatechange", runReady, false );
		}
		window.addEventListener( "load", runReady, false );
	}

	// end domready code

	function sendSize( iframeid ){
		window
			.parent
			.postMessage('{ "iframeid": ' + iframeid + ', "iframeheight" : ' +
									document.documentElement.offsetHeight +
									'}', "*");
	}

	var id;

	window.addEventListener("message", function( event ){
		// same host check
		var origin = event.origin || event.originalEvent.origin;
		var allowedOrigin = new RegExp( "https?:\/\/" + location.host );
		if( !origin.match( allowedOrigin ) ){
			return;
		}

		var data = event.data || event.originalEvent.data;
		var elem = document.querySelector(data.selector || "body");

		// use the passed information to populate the page
		elem.innerHTML = data.html;
		id = data.id;

		// wait until everything loads to calc the height and communicate it
		// TODO it would be better to bind to the load of the styles at least
		onReady(function(){
			sendSize(id);
		});
	}, false);

	var minInterval = 300;
	var resized = false;
	window.addEventListener("resize", function(){
		if(resized){ return; }
		sendSize(id);
		resized = true;
		setTimeout(function(){ resized = false; }, minInterval);
	});
})();
