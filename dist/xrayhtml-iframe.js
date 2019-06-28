/*! X-rayHTML - v2.2.0 - 2019-06-28
* https://github.com/filamentgroup/x-rayhtml
* Copyright (c) 2019 Filament Group; Licensed MIT */
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

	// reset ready state with new content for the iframe
	// TODO bind to load event for other items, e.g. stylesheets
	function resetReady(imageCount){
		ready = false;
		var eventCounter = 0;

		if(! imageCount ){
			runReady();
			return;
		}

		var eventIncrement = function(event){
			if( event.target.tagName !== 'IMG' ){
				return;
			}

			eventCounter++;

			// all of the images and the load event
			if(eventCounter === imageCount){
				runReady();
			}
		};

		document.body.addEventListener("load", eventIncrement, true);
	}

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
		var fragment = document.createElement("div");
		fragment.innerHTML = data.html;

		// the document is now not ready and needs to wait until everything
		// new has loaded (proxy: when all the images have loaded)
		resetReady(fragment.querySelectorAll("img").length);

		// use the passed information to populate the page
		for(var x = 0; x < fragment.children.length; x++) {
			elem.append(fragment.children[0]);
		}

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
