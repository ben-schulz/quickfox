var assertLexemeState = function( lexeme, state ){

    assert.isTrue(
	lexeme.element
	    .classList.contains( state ),

	"expected '" + state + "' in classList." );
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

    describe( "TripleState", function(){

	describe( "fillNext", function(){

	    it( "fills states in order", function(){

		var state = new TripleState();

		var first = state.fillNext();

		assert.isTrue( state.hasSubject );
		assert.equal( first, TripleComponent.Subject );

		var second = state.fillNext();

		assert.isTrue( state.hasObject );
		assert.equal( second, TripleComponent.Object );

		var third = state.fillNext();

		assert.isTrue( state.hasRelation );
		assert.equal( third, TripleComponent.Relation );
	    });

	    it( "inverts 'vacateLast'", function(){

		var state = new TripleState();

		var preCondition = state.fillNext();

		state.vacateLast();

		var postCondition = state.fillNext();

		assert.equal( preCondition, postCondition );
	    });
	});

	describe( "vacate", function(){

	    it( "frees subject", function(){

		var state = new TripleState();

		var preSubject = state.fillNext();
		state.fillNext();

		assert.isTrue( state.hasSubject );
		state.vacateSubject();
		assert.isFalse( state.hasSubject );

		var postSubject = state.fillNext();

		assert.equal( preSubject, postSubject );
	    });


	    it( "frees object", function(){

		var state = new TripleState();

		state.fillNext();
		var preObject = state.fillNext();
		state.fillNext();

		assert.isTrue( state.hasObject );
		state.vacateObject();
		assert.isFalse( state.hasObject );

		var postObject = state.fillNext();

		assert.equal( preObject, postObject );
	    });

	    it( "frees relation", function(){

		var state = new TripleState();

		state.fillNext();
		state.fillNext();
		var preRelation = state.fillNext();

		state.vacateRelation();

		var postRelation = state.fillNext();

		assert.equal( preRelation, postRelation );
	    });

	});

    });

    describe( "lexemeHighlighted event", function(){

	it( "populates each state in order", function(){

	    var canvas = new TextCanvas( document );
	    var lex0 = new Lexeme( "foo" );
	    var lex1 = new Lexeme( "bar" );
	    var lex2 = new Lexeme( "cat" );

	    canvas.addLexeme( lex0 );
	    canvas.addLexeme( lex1 );
	    canvas.addLexeme( lex2 );

	    lex0.element.click();
	    assertSubjectFocused( lex0 );
	    assert.isTrue( canvas.hasSubject,
			 "expected 'hasSubject' true");

	    lex1.element.click();
	    assertObjectFocused( lex1 );
	    assert.isTrue( canvas.hasObject,
			 "expected 'hasObject' true");

	    lex2.element.click();
	    assertRelationFocused( lex2 );
	    assert.isTrue( canvas.hasRelation,
			   "expected 'hasRelation' true");

	    assert.notEqual( null, canvas.highlights[0] );
	});


	it( "skips states already set", function(){

	    var canvas = new TextCanvas( document );
	    var lex0 = new Lexeme( "foo" );
	    var lex1 = new Lexeme( "bar" );

	    canvas.addLexeme( lex0 );
	    canvas.addLexeme( lex1 );

	    lex0.element.click();
	    lex1.element.click();

	    assert.notEqual( lex0.viewState, lex1.viewState );
	});


	it( "clears current if all selected", function(){

	    var canvas = new TextCanvas( document );
	    var lex0 = new Lexeme( "foo" );
	    var lex1 = new Lexeme( "bar" );
	    var lex2 = new Lexeme( "blah" );

	    var lex3 = new Lexeme( "cat" );

	    canvas.addLexeme( lex0 );
	    canvas.addLexeme( lex1 );
	    canvas.addLexeme( lex2 );
	    canvas.addLexeme( lex3 );

	    lex0.element.click();
	    lex1.element.click();

	    lex2.element.click();
	    assertRelationFocused( lex2 );

	    lex2.element.click();
	    assertUnfocused( lex2 );

	    lex3.element.click();
	    assertRelationFocused( lex3 );
	});

	it( "clears current if already highlighted", function(){

	    var canvas = new TextCanvas( document );
	    var lex0 = new Lexeme( "foo" );
	    var lex1 = new Lexeme( "bar" );

	    canvas.addLexeme( lex0 );
	    canvas.addLexeme( lex1 );

	    lex0.element.click();
	    lex1.element.click();

	    assertObjectFocused( lex1 );

	    lex1.element.click();
	    assertUnfocused( lex1 );
	});

	it( "highlights last cleared", function(){

	    var canvas = new TextCanvas( document );
	    var lex0 = new Lexeme( "foo" );
	    var lex1 = new Lexeme( "bar" );
	    var lex2 = new Lexeme( "cat" );

	    canvas.addLexeme( lex0 );
	    canvas.addLexeme( lex1 );
	    canvas.addLexeme( lex2 );

	    lex0.element.click();

	    lex1.element.click();
	    lex1.element.click();

	    lex2.element.click();

	    assertUnfocused( lex1 );
	    assertObjectFocused( lex2 );

	});

	it( "highlights next available", function(){

	    var canvas = new TextCanvas( document );
	    var subject = new Lexeme( "foo" );
	    var firstObject = new Lexeme( "bar" );
	    var relation = new Lexeme( "cat" );
	    var nextObject = new Lexeme( "gromvin" );

	    canvas.addLexeme( subject );
	    canvas.addLexeme( firstObject );
	    canvas.addLexeme( relation );
	    canvas.addLexeme( nextObject );

	    subject.element.click();
	    firstObject.element.click();
	    relation.element.click();

	    firstObject.element.click();

	    nextObject.element.click();

	    assertUnfocused( firstObject );
	    assertObjectFocused( nextObject );

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
	    highlight0.element.click();

	    highlight1.element.click();
	    highlight1.element.click();

	    canvas.element.dispatchEvent(
		new CustomEvent( "clearHighlights" )
	    );

	    assertUnfocused( highlight0 );
	    assertUnfocused( highlight1 );
	    assertUnfocused( noHighlight );

	    assert.isFalse( canvas.hasSubject );
	    assert.isFalse( canvas.hasObject );
	    assert.isFalse( canvas.hasRelation );
	});
    });

});
