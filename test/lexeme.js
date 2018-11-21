describe( "Lexeme", function(){

    describe( "on click", function(){

	it( "raises highlight event", function(){

	    var lex = new Lexeme( "foo" );
	    var container = document.createElement( "div" );
	    container.appendChild( lex.element );

	    var highlighted = false;
	    container.addEventListener(
		"lexemeHighlighted", event => {

		    highlighted = true;
		});

	    lex.element.click();

	    assert.isTrue( highlighted );
	});
    });
});
