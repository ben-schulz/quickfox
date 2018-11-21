var assertUnfocused = function( lexeme ){

    assert.isTrue(
	lexeme.element
	    .classList.contains( LexemeState.Unfocused ) );
};

describe( "TextCanvas", function(){

    describe( "rendered element", function(){

	it( "contains added lexemes", function(){

	    var canvas = new TextCanvas( document );

	    canvas.addLexeme( new Lexeme( "hello" ) );
	    canvas.addLexeme( new Lexeme( "world" ) );

	    assert.equal( 2, canvas.element.childNodes.length );

	    var firstChild = canvas.element.childNodes[0];
	    assert.equal( "hello", firstChild.textContent );

	    var secondChild = canvas.element.childNodes[1];
	    assert.equal( "world", secondChild.textContent );
	});
    });

    describe( "clearHighlights event", function(){

	it( "resets lexeme styles", function(){

	    var canvas = new TextCanvas( document );

	    var highlight0 = new Lexeme( "foo" );
	    var highlight1 = new Lexeme( "bar" );
	    var noHighlight = new Lexeme( "cat" );

	    canvas.addLexeme( highlight0 );
	    canvas.addLexeme( highlight1 );
	    canvas.addLexeme( noHighlight );

	    highlight0.element.click();
	    highlight1.element.click();

	    canvas.element.dispatchEvent(
		new CustomEvent( "clearHighlights" )
	    );

	    assertUnfocused( highlight0 );
	    assertUnfocused( highlight1 );
	    assertUnfocused( noHighlight );
	});

    });

});
