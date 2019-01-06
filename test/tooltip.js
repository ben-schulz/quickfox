describe( "ToolTip", function(){

    describe( "addItems method", function(){

	it( "adds given text items", function(){

	    var tooltip = new Tooltip();

	    var lines = [
		"first line",
		"second line"
	    ];

	    tooltip.addItems( lines );

	    assert.equal( 2, tooltip.childNodes.length );
	} );

    } );

    describe( "on 'showtooltip' event", function(){

	it( "sets display property", function(){

	    var tooltip = new Tooltip();

	    tooltip.element.dispatchEvent(
		new CustomEvent( "showtooltip", {
		    "detail": {
		    }
		} )
	    );

	    assert.equal( "block", tooltip.element.style.display );
	} );

	it( "sets x and y coordinates", function(){

	    var tooltip = new Tooltip();

	    var clientX = 255;
	    var clientY = 127;

	    tooltip.element.dispatchEvent(
		new CustomEvent( "showtooltip", {
		    "detail": {
			"clientX": clientX,
			"clientY": clientY,
		    }
		} )
	    );

	    assert.equal( clientX, tooltip.clientX );
	    assert.equal( clientY, tooltip.clientY );
	} );
    } );

} );
