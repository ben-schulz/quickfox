describe( "Lexeme", function(){

    describe( "on click", function(){

	it( "highlights", function(){

	    var lex = new Lexeme( "foo" ).element;

	    lex.click();

	    assert.isTrue(
		lex.classList.contains(
		    LexemeState.Clicked ) );
	});

	it( "advances to next state in sequence", function(){

	    var lex = new Lexeme( "foo ").element;

	    assert.isTrue(
		lex.classList.contains( LexemeState.All[0] ) );

	    lex.click();

	    assert.isTrue(
		lex.classList.contains( LexemeState.All[1] ) );

	    lex.click();

	    assert.isTrue(
		lex.classList.contains( LexemeState.All[2] ) );
	});
    });
});
