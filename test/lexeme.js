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
});
