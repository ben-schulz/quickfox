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
	} );
    } );


    describe( "on reference made", function(){

	it( "classifies page element as referent", function(){

	    var lex = new Lexeme( "foo" );

	    lex.showAsReferent();

	    assert.isTrue(
		lex.element.classList.contains( "referent" ) );
	} );

	it( "handles saveTriple as reference", function(){

	    var lex = new Lexeme( "foo" );

	    lex.element.dispatchEvent(
		new CustomEvent( "saveTriple" ) );

	    assert.isTrue(
		lex.element.classList.contains( "referent" ) );
	} );
    } );

    describe( "on reference removed", function(){

	it( "removes referent classification", function(){

	    var lex = new Lexeme( "foo" );

	    lex.showAsReferent();

	    lex.showAsNonReferent();

	    assert.isFalse(
		lex.element.classList.contains( "referent" ) );
	} );
    } );


    describe( "the lexer", function(){

	it( "preserves all text", function(){

	    var text = "...she fetched the kittens indoors,\r"
		+ "to \"wash\" and \"dress ... them,, before\n"
		    + "\tthe fine company arrived.";

	    var result = Lexer.lex( text );

	    var resultCharCount = 0;
	    for( var ix = 0; ix < result.length; ++ix ){

		resultCharCount += result[ ix ].length;
	    }

	    assert.equal( text.length, resultCharCount );

	    var expect = [
		"...",
		"she",
		" ",
		"fetched",
		" ",
		"the",
		" ",
		"kittens",
		" ",
		"indoors",
		",\r",
		"to",
		" \"",
		"wash",
		"\" ",
		"and",
		" \"",
		"dress",
		" ... ",
		"them",
		",, ",
		"before",
		"\n\t",
		"the",
		" ",
		"fine",
		" ",
		"company",
		" ",
		"arrived",
		"."
	    ];

	    for( var ix = 0; ix < result.length; ++ix ){

		assert.equal( expect[ ix ], result[ ix ] );
	    }
	});


	describe( "splits on separators", function(){

	    it( "splits on space", function(){

		var text = "the cat   sat ";

		var result = Lexer.lex( text );

		assert.equal( "the", result[0] );
		assert.equal( " ", result[1] );
		assert.equal( "cat", result[2] );
		assert.equal( "   ", result[3] );
		assert.equal( "sat", result[4] )
	    });

	    it( "splits on punctuation", function(){

		var text = "cats,sit...on..mats?!No.";

		var result = Lexer.lex( text );

		assert.equal( "cats", result[0] );
		assert.equal( ",", result[1] );
		assert.equal( "sit", result[2] );
		assert.equal( "...", result[3] );
		assert.equal( "on", result[4] );
		assert.equal( "..", result[5] );
		assert.equal( "mats", result[6] )
		assert.equal( "?!", result[7] )
		assert.equal( "No", result[8] )
		assert.equal( ".", result[9] )
	    });
	});

    } );
});
