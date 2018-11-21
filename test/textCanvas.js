var assertLexemeState = function( lexeme, state ){

    assert.isTrue(
	lexeme.element
	    .classList.contains( state ) );
};

var assertUnfocused = function( lexeme ){

    assertLexemeState( lexeme, LexemeState.Unfocused );
};

var assertObjectFocused = function( lexeme ){

    assertLexemeState( lexeme, LexemeState.ObjectFocus );
};

var assertSubjectFocused = function( lexeme ){

    assertLexemeState( lexeme, LexemeState.SubjectFocus );
};

var assertRelationFocused = function( lexeme ){

    assertLexemeState( lexeme, LexemeState.RelationFocus );
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

    describe( "lexemeHighlighted event", function(){

	it( "populates each state in order", function(){

	    var canvas = new TextCanvas( document );
	    var lex = new Lexeme( "foo" );

	    canvas.addLexeme( lex );

	    lex.element.click();
	    assert.notEqual( null, canvas.highlights[0] );

	    lex.element.click();
	    assertSubjectFocused( lex );
	    assert.isTrue( canvas.hasSubject );

	    lex.element.click();
	    assertObjectFocused( lex );
	    assert.isTrue( canvas.hasObject );

	    lex.element.click();
	    assertRelationFocused( lex );
	    assert.isTrue( canvas.hasRelation );

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
