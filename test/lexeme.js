var assertUnfocused = function( lexeme ){

    assert.isTrue(
	lexeme.classList.contains (
	    LexemeState.Unfocused ) );
};

describe( "Lexeme", function(){

    describe( "on click", function(){

	it( "highlights", function(){

	    var lex = new Lexeme( "foo" ).element;

	    lex.click();

	    assert.isTrue(
		lex.classList.contains(
		    LexemeState.Clicked ) );
	});
    });

    describe( "on Escape", function(){

	it( "clears active highlights", function(){

	    var buffer = new TextBuffer( document, "div");

	    var onEscape = function( contents ){

		return contents.slice(-1)[0].isEscape;
	    };


	    var page = document.createElement( "div" );
	    var raiseClear = function( contents ){

		var event = new CustomEvent(
		    "clearHighlights" );

		page.childNodes.forEach(
		    node => node.dispatchEvent( event ) )
	    };

	    buffer.onFlush( raiseClear, onEscape );

	    var keyboard = new KeyboardInput( buffer.element );

	    var highlight0 = page.appendChild(
		new Lexeme( "foo" ).element );

	    var highlight1 = page.appendChild(
		new Lexeme( "bar" ).element );

	    var noHighlight = page.appendChild(
		new Lexeme( "cat" ).element );

	    highlight0.click();
	    highlight1.click();

	    keyboard.keypress( KeyCode.Escape );

	    assertUnfocused( highlight0 );
	    assertUnfocused( highlight1 );
	    assertUnfocused( noHighlight );
	});
    });

});
