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
});
