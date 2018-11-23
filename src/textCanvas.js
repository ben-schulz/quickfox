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

    get isFull(){

	return ( this.hasSubject
		 && this.hasObject
		 && this.hasRelation );
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

    _vacate( component ){

	var ix = this.filled.indexOf( component );

	if( 0 > ix ){

	    return;
	}

	this.vacant.push( component );
	this.filled.splice( ix, 1 );
    }

    vacateSubject(){

	this._vacate( TripleComponent.Subject );
	this.hasSubject = false;
    }

    vacateObject(){

	this._vacate( TripleComponent.Object );
	this.hasObject = false;
    }

    vacateRelation(){

	this._vacate( TripleComponent.Relation );
	this.hasRelation = false;
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

		var lex = event.detail.target;
		if( lex.isFocused || this.tripleState.isFull ){

		    if( lex.isSubject ){

			this.tripleState.vacateSubject();
		    }
		    else if( lex.isObject ){

			this.tripleState.vacateObject();
		    }
		    else if( lex.isRelation ){

			this.tripleState.vacateRelation();
		    }

		    lex.clearHighlights();
		    return;
		}

		var next = this.tripleState.fillNext();

		this.highlights.push( lex );

		if( next === TripleComponent.Subject ){

		    lex.highlightSubject();
		    return;
		}

		if( next === TripleComponent.Object ){

		    lex.highlightObject();
		    return;
		}

		if( next === TripleComponent.Relation ){

		    lex.highlightRelation();
		    return;
		}
	});
    }

    addLexeme( lex ){

	this.element.appendChild( lex.element );
    }
}
