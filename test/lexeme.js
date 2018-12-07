describe( "Lexeme", function(){

    describe( "on click", function(){

	it( "raises highlight event", function(){

	    var lex = new Lexeme( "foo" );
	    var container = document.createElement( "div" );
	    container.appendChild( lex.element );

	    var highlighted = false;
	    container.addEventListener(
		"lexemeSelected", event => {

		    highlighted = true;
		});

	    lex.element.click();

	    assert.isTrue( highlighted );
	});
    });

    describe( "the lexer", function(){

	it( "splits on non-alphabetic characters", function(){

	    var text = "...she fetched the kittens indoors,\r"
		+ "to wash and dress ... them,, before\n"
		+ "\tthe fine company arrived.";

	    var result = Lexer.lex( text );

	    assert.equal( 15, result.length );

	    var expect = [
		"she",
		"fetched",
		"the",
		"kittens",
		"indoors",
		"to",
		"wash",
		"and",
		"dress",
		"them",
		"before",
		"the",
		"fine",
		"company",
		"arrived"
	    ];

	    assert.deepEqual( expect, result );
	} );
    } );
});
