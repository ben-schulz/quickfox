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

	    assert.equal( 2, canvas.textLayer.childNodes.length );

	    var firstChild = canvas.textLayer.childNodes[0];
	    assert.equal( "hello", firstChild.textContent );

	    var secondChild = canvas.textLayer.childNodes[1];
	    assert.equal( "world", secondChild.textContent );
	});
    });

    describe( "addLexeme", function(){

	it( "sets start column", function(){

	    var canvas = new TextCanvas( document );

	    var lex0 = new Lexeme( "foo" );
	    canvas.addLexeme( lex0 );

	    var space = new Separator(" ");
	    canvas.addLexeme( space );

	    var lex1 = new Lexeme( "bar" );
	    canvas.addLexeme( lex1 );

	    assert.equal( 0, lex0.columnStart );

	    assert.equal(
		( lex0.length + space.length ),
		lex1.columnStart );

	} );

	it( "breaks lines at given character max", function(){

	    var canvas = new TextCanvas( document );

	    canvas.setMaxLineChars( 5 );

	    var lex0 = new Lexeme( "foo" );
	    canvas.addLexeme( lex0 );

	    var space = new Separator( " " );
	    canvas.addLexeme( space );

	    var lex1 = new Lexeme( "bar" );
	    canvas.addLexeme( lex1 );

	    assert.equal( 0, lex0.lineNumber );

	    assert.equal( 0, lex1.columnStart );
	    assert.equal( 1, lex1.lineNumber );
	} );
    } );


    describe( "TripleState", function(){

	describe( "fillNext", function(){

	    it( "fills states in order", function(){

		var state = new TripleState();

		var first = state.fillNext( "foo" );

		assert.equal( "foo", state.subject );
		assert.isTrue( state.hasSubject );
		assert.equal( first, TripleComponent.Subject );

		var second = state.fillNext( "bar" );

		assert.equal( "bar", state.relation );
		assert.isTrue( state.hasRelation );
		assert.equal( second, TripleComponent.Relation );

		var third = state.fillNext( "cat" );

		assert.equal( "cat", state.object );
		assert.isTrue( state.hasObject );
		assert.equal( third, TripleComponent.Object );

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

		var preSubject = state.fillNext( "foo" );
		state.fillNext( "bar" );

		assert.isTrue( state.hasSubject,
			     "expected 'hasSubject' true" );

		state.vacateSubject();

		assert.isFalse( state.hasSubject,
			      "expected 'hasSubject' false" );

		var postSubject = state.fillNext( "cat" );

		assert.equal( preSubject, postSubject );
	    });


	    it( "frees object", function(){

		var state = new TripleState();

		state.fillNext();
		state.fillNext();
		var preObject = state.fillNext();

		assert.isTrue( state.hasObject );
		state.vacateObject();
		assert.isFalse( state.hasObject );

		var postObject = state.fillNext();

		assert.equal( preObject, postObject );
	    });

	    it( "frees relation", function(){

		var state = new TripleState();

		state.fillNext();
		var preRelation = state.fillNext();
		state.fillNext();

		state.vacateRelation();
		state.vacateRelation();

		var postRelation = state.fillNext();

		assert.equal( preRelation, postRelation );
	    });

	});

    });

    describe( "lexemeSelected event", function(){

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
	    assertRelationFocused( lex1 );
	    assert.isTrue( canvas.hasRelation,
			   "expected 'hasRelation' true");

	    lex2.element.click();
	    assertObjectFocused( lex2 );
	    assert.isTrue( canvas.hasObject,
			 "expected 'hasObject' true");

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
	    assertObjectFocused( lex2 );

	    lex2.element.click();
	    assertUnfocused( lex2 );

	    lex3.element.click();
	    assertObjectFocused( lex3 );
	});

	it( "clears current if already highlighted", function(){

	    var canvas = new TextCanvas( document );
	    var lex0 = new Lexeme( "foo" );
	    var lex1 = new Lexeme( "bar" );

	    canvas.addLexeme( lex0 );
	    canvas.addLexeme( lex1 );

	    lex0.element.click();
	    lex1.element.click();

	    assertRelationFocused( lex1 );

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
	    assertRelationFocused( lex2 );

	});

	it( "highlights next available", function(){

	    var canvas = new TextCanvas( document );
	    var subject = new Lexeme( "foo" );
	    var firstRelation = new Lexeme( "bar" );
	    var relation = new Lexeme( "cat" );
	    var nextRelation = new Lexeme( "gromvin" );

	    canvas.addLexeme( subject );
	    canvas.addLexeme( firstRelation );
	    canvas.addLexeme( relation );
	    canvas.addLexeme( nextRelation );

	    subject.element.click();
	    firstRelation.element.click();
	    relation.element.click();

	    firstRelation.element.click();

	    nextRelation.element.click();

	    assertUnfocused( firstRelation );
	    assertRelationFocused( nextRelation );
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

	    canvas.textLayer.dispatchEvent(
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

    describe( "saveTriple event", function(){

	it( "marks saved tokens as referents", function(){

	    var canvas = new TextCanvas( document );

	    var subject = new Lexeme( "foo" );
	    var object = new Lexeme( "bar" );
	    var relation = new Lexeme( "cat" );

	    canvas.addLexeme( subject );
	    canvas.addLexeme( relation );
	    canvas.addLexeme( object );

	    canvas.lexemeSelected( subject );
	    canvas.lexemeSelected( object );
	    canvas.lexemeSelected( relation );

	    canvas.saveTriple();

	    assert.isTrue( subject.isReferent );
	    assert.isTrue( relation.isReferent );
	    assert.isTrue( object.isReferent );
	} );

	it( "marks matching tokens as referents", function(){

	    var canvas = new TextCanvas( document );

	    var subject = new Lexeme( "foo" );
	    var object = new Lexeme( "bar" );
	    var relation = new Lexeme( "cat" );

	    var other = new Lexeme( "cat" );

	    canvas.addLexeme( subject );
	    canvas.addLexeme( relation );
	    canvas.addLexeme( object );

	    canvas.addLexeme( other );

	    canvas.lexemeSelected( subject );
	    canvas.lexemeSelected( relation );
	    canvas.lexemeSelected( object );

	    canvas.saveTriple();

	    assert.isTrue( other.isReferent );
	} );

    } );

    describe( "subscribe", function(){

	it( "assigns given listener", function(){

	    var canvas = new TextCanvas( document );

	    var subject = new Lexeme( "foo" );
	    var object = new Lexeme( "bar" );
	    var relation = new Lexeme( "cat" );

	    canvas.addLexeme( subject );
	    canvas.addLexeme( object );
	    canvas.addLexeme( relation );

	    canvas.lexemeSelected( subject );
	    canvas.lexemeSelected( object );
	    canvas.lexemeSelected( relation );

	    var target = document.createElement( "div" );

	    target.addEventListener(
		"saveTriple",  event => {

		    var subject = document.createTextNode(
			event.detail.subject );

		    var object = document.createTextNode(
			event.detail.object );

		    var relation = document.createTextNode(
			event.detail.relation );

		    target.appendChild( subject );
		    target.appendChild( object );
		    target.appendChild( relation );
		    
		});

	    canvas.subscribe( "saveTriple", target )
	    canvas.saveTriple();

	    assert.equal( canvas.subject,
			     target.childNodes[0].textContent );

	    assert.equal( canvas.object,
			  target.childNodes[1].textContent );

	    assert.equal( canvas.relation,
			  target.childNodes[2].textContent );

	});


	it( "saves intransitive triples", function(){

	    var canvas = new TextCanvas( document );

	    var subject = new Lexeme( "foo" );
	    var relation = new Lexeme( "bar" );

	    canvas.addLexeme( subject );
	    canvas.addLexeme( relation );

	    canvas.lexemeSelected( subject );
	    canvas.lexemeSelected( relation );

	    var target = document.createElement( "div" );

	    var eventRaised = false;
	    target.addEventListener(
		"saveTriple",  event => {

		    eventRaised = true;
		});

	    canvas.subscribe( "saveTriple", target )
	    canvas.saveTriple();

	    assert.isTrue( eventRaised );
	});


	it( "skips dispatch if triple incomplete", function(){

	    var canvas = new TextCanvas( document );

	    var subject = new Lexeme( "foo" );
	    var relation = new Lexeme( "bar" );
	    var object = new Lexeme( "cat" );

	    canvas.addLexeme( subject );
	    canvas.addLexeme( relation );
	    canvas.addLexeme( object );

	    canvas.lexemeSelected( subject );
	    canvas.lexemeSelected( relation );
	    canvas.lexemeSelected( object );
	    
	    canvas.lexemeSelected( relation );

	    var target = document.createElement( "div" );

	    var eventRaised = false;
	    target.addEventListener(
		"saveTriple",  event => {

		    eventRaised = true;
		});

	    canvas.subscribe( "saveTriple", target )
	    canvas.saveTriple();

	    assert.isFalse( eventRaised );
	});
    });
});
