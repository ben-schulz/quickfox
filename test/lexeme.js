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


    describe( "length", function(){

	it( "returns number of characters in the text", function(){

	    var text = "foo";
	    var lex = new Lexeme( text );

	    assert.equal( lex.length, text.length );
	} );
    } );

    describe( "on mouseover", function(){

	describe( "if referent", function() {

	    it( "shows its tooltip", function(){

		var lex = new Lexeme( "foo" );

		lex.showAsReferent();
		lex.mouseover();

		assert.equal( lex.tooltip.style.display, "block" );
	    } );

	} );

	describe( "if not referent", function() {

	    it( "keeps tooltip hidden", function(){

		var lex = new Lexeme( "foo" );

		lex.mouseover();

		assert.equal( lex.tooltip.style.display, "none" );
	    } );

	} );
    } );

    describe( "on mouseout", function(){

	it( "hides the tooltip", function(){

	    var lex = new Lexeme( "foo" );

	    lex.mouseover();
	    lex.mouseleave();

	    assert.equal( lex.tooltip.style.display, "none" );
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

		resultCharCount += result[ ix ].text.length;
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

		assert.equal( expect[ ix ], result[ ix ].text );
	    }
	});


	describe( "splits on separators", function(){

	    it( "splits on space", function(){

		var text = "the cat   sat ";

		var result = Lexer.lex( text );

		assert.equal( "the", result[0].text );
		assert.equal( " ", result[1].text );
		assert.equal( "cat", result[2].text );
		assert.equal( "   ", result[3].text );
		assert.equal( "sat", result[4].text )
	    });

	    it( "splits on punctuation", function(){

		var text = "cats,sit...on..mats?!No.";

		var result = Lexer.lex( text );

		assert.equal( "cats", result[0].text );
		assert.equal( ",", result[1].text );
		assert.equal( "sit", result[2].text );
		assert.equal( "...", result[3].text );
		assert.equal( "on", result[4].text );
		assert.equal( "..", result[5].text );
		assert.equal( "mats", result[6].text )
		assert.equal( "?!", result[7].text )
		assert.equal( "No", result[8].text )
		assert.equal( ".", result[9].text )
	    });
	});

    } );
});
