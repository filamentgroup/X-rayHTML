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
	function resetReady(){
		ready = false;
		var eventCounter = 0;
		var images = document.querySelectorAll("img");

		if(! images.length ){
			runReady();
			return;
		}

		var eventIncrement = function(){
			eventCounter++;

			// all of the images and the load event
			if(eventCounter === images.length){
				runReady();
			}
		};

		for(var i = 0; i < images.length; ++i){
			images[i].addEventListener("load", eventIncrement, false);
		}
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

		// use the passed information to populate the page
		elem.innerHTML = data.html;
		id = data.id;

		// the document is now not ready and needs to wait until everything
		// new has loaded (proxy: when all the images have loaded)
		resetReady();

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
