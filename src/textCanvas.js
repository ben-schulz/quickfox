var TripleComponent = (function(){

    var components = {

	"Subject": "tripleSubject",
	"Object": "tripleObject",
	"Relation": "tripleRelation",
    };

    return {

	"Subject": components.Subject,
	"Object": components.Object,
	"Relation": components.Relation,

	"toLexemeState": function( x ){

	    if( x === components.Subject ){

		return LexemeState.SubjectFocus;
	    }

	    if( x === components.Object ){

		return LexemeState.ObjectFocus;
	    }

	    if( x === components.Relation ){

		return LexemeState.RelationFocus;
	    }
	}
    };

})();

class TripleState{

    clear(){

	this.hasSubject = false;
	this.hasObject = false;
	this.hasRelation = false;

	this.vacant = [

	    TripleComponent.Relation,
	    TripleComponent.Object,
	    TripleComponent.Subject,
	];

	this.filled = [];
    }


    fillNext(){

	if( 1 > this.vacant.length ){

	    return null;
	}

	var next = this.vacant.pop();
	this.filled.push( next );

	this.hasSubject = (
	    this.hasSubject
		|| next === TripleComponent.Subject );

	this.hasObject = (
	    this.hasObject
		|| next === TripleComponent.Object );

	this.hasRelation = (
	    this.hasRelation
		|| next === TripleComponent.Relation );

	return next;
    }

    vacateLast(){

	if( 1 > this.filled.length ){

	    return;
	}

	var last = this.filled.pop();
	this.vacant.push( last );

	this.hasSubject = (
	    this.hasSubject
		&& TripleComponent.Subject !== last )

	this.hasObject = (
	    this.hasObject
		&& TripleComponent.Object !== last )

	this.hasRelation = (
	    this.hasRelation
		&& TripleComponent.Relation !== last )
    }

    constructor(){

	this.clear();
    }
}

class TextCanvas{

    get hasSubject(){

	return this.tripleState.hasSubject;
    }

    set hasSubject( boolValue ){

	this.tripleState.hasSubject = boolValue;
    }

    get hasObject(){

	return this.tripleState.hasObject;
    }

    set hasObject( boolValue ){

	this.tripleState.hasObject = boolValue;
    }

    get hasRelation(){

	return this.tripleState.hasRelation;
    }

    set hasRelation( boolValue ){

	this.tripleState.hasRelation = boolValue;
    }

    constructor( document ){

	this.elementType = "div";
	this.element = document.createElement(
	    this.elementType );

	this.highlights = [];

	this.tripleState = new TripleState();

	this.element.addEventListener(
	    "clearHighlights", event => {

		this.highlights.forEach( lex => {

		    lex.clearHighlights();
		});

		this.highlights = [];
		this.tripleState.clear();
	});

	this.element.addEventListener(
	    "lexemeHighlighted", event => {

		var next = this.tripleState.fillNext();
		var lex = event.detail.target;

		if( lex.isFocused || null === next ){

		    lex.clearHighlights();
		    this.tripleState.vacateLast();

		    return;
		}

		this.highlights.push( lex );

		lex._setState(
		    TripleComponent.toLexemeState( next ) );

		lex._showState( TripleComponent.toLexemeState( next ) );
	});
    }

    addLexeme( lex ){

	this.element.appendChild( lex.element );
    }
}
