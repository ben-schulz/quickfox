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
    }


    fillNext(){

	if( !this.hasSubject ){

	    this.hasSubject = true;
	    return TripleComponent.Subject;
	}

	if( !this.hasObject ){

	    this.hasObject = true;
	    return TripleComponent.Object;
	}

	if( !this.hasRelation ){

	    this.hasRelation = true;
	    return TripleComponent.Relation;
	}

	return null;
    }

    vacateLast(){

	if( this.hasRelation ){

	    this.hasRelation = false;
	    return;
	}

	if( this.hasObject ){

	    this.hasObject = false;
	    return;
	}

	if( this.hasSubject ){

	    this.hasSubject = false;
	    return;
	}
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

		if( null === next ){

		    lex.clearHighlights();
		    this.tripleState.vacateLast();

		    return;
		}

		if( lex.isFocused ){

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
