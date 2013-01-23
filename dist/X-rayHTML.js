/*! X-rayHTML - v0.1.0 - 2013-01-23
* https://github.com/filamentgroup/X-rayHTML
* Copyright (c) 2013 Mat Marquis; Licensed MIT */

(function( $ ) {
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
    },
    methods = {
    _create: function() {
      return $( this ).each(function() {
        var init = $( this ).data( "init" + o.pluginName );

        if( init ) {
          return false;
        }

        $( this )
          .data( "init", true )
          [ o.pluginName ]( "_init" )
          .trigger( "create." + o.pluginName );
      });
    },
    _init: function() {
      $( this )
        [ o.pluginName ]( "_createButton" )
        [ o.pluginName ]( "_createSource" );
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
      var el = this,
        preel = document.createElement( "pre" ),
        codeel = document.createElement( "code" ),
        wrap = document.createElement( "div" ),
        sourcepanel = document.createElement( "div" ),
        code = $( el ).find( ".snippet" )[ 0 ].innerHTML, // TODO: Gross.
        source = document.createTextNode( code );

      codeel.appendChild( source );

      preel.appendChild( codeel );

      sourcepanel.setAttribute( "class", o.classes.sourcepanel );
      sourcepanel.appendChild( preel );

      this.appendChild( sourcepanel );
    }
  };

  // Collection method.
  $.fn[ o.pluginName ] = function( arrg, a, b, c ) {
    return this.each(function() {

    // if it's a method
    if( arrg && typeof( arrg ) === "string" ){
      return $.fn[ o.pluginName ].prototype[ arrg ].call( this, a, b, c );
    }

    // don't re-init
    if( $( this ).data( o.pluginName + "data" ) ){
      return $( this );
    }

    // otherwise, init
    $( this ).data( o.pluginName + "active", true );
      $.fn[ o.pluginName ].prototype._create.call( this );
    });
  };

  // add methods
  $.extend( $.fn[ o.pluginName ].prototype, methods );

  // DOM-ready auto-init
  $( function(){
    $( o.initSelector )[ o.pluginName ]();
  });

}( jQuery ));

