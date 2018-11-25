var TripleComponent = {

	"Subject": "tripleSubject",
	"Object": "tripleObject",
	"Relation": "tripleRelation",
};

class TripleState{

    clear(){

	this.subject = null;
	this.object = null;
	this.relation = null;

	this.vacant = [

	    TripleComponent.Relation,
	    TripleComponent.Object,
	    TripleComponent.Subject,
	];

	this.filled = [];
    }

    get hasSubject(){

	return null !== this.subject;
    }

    get hasObject(){

	return null !== this.object;
    }

    get hasRelation(){

	return null !== this.relation
    }

    get isFull(){

	return ( this.hasSubject
		 && this.hasObject
		 && this.hasRelation );
    }


    fillNext( data ){

	if( 1 > this.vacant.length ){

	    return null;
	}

	var next = this.vacant.pop();
	this.filled.push( next );

	if( next === TripleComponent.Subject ){

	    this.subject = data;
	}

	else if( next === TripleComponent.Object ){

	    this.object = data;
	}

	else if( next === TripleComponent.Relation ){

	    this.relation = data;
	}

	return next;
    }

    vacateLast(){

	if( 1 > this.filled.length ){

	    return;
	}

	var last = this.filled.pop();
	this.vacant.push( last );

	if( last === TripleComponent.Subject ){

	    this.subject = null;
	}

	else if( last === TripleComponent.Object ){

	    this.object = null;
	}

	else if( last === TripleComponent.Relation ){

	    this.relation = null;
	}

    }

    _vacate( component ){

	var ix = this.filled.indexOf( component );

	if( 0 > ix ){

	    return;
	}

	this.vacant.push( component );
	this.filled.splice( ix, 1 );

	if( component === TripleComponent.Subject ){

	    this.subject = null;
	}

	else if( component === TripleComponent.Object ){

	    this.object = null;
	}

	else if( component === TripleComponent.Relation ){

	    this.relation = null;
	}
    }

    vacateSubject(){

	this._vacate( TripleComponent.Subject );
    }

    vacateObject(){

	this._vacate( TripleComponent.Object );
    }

    vacateRelation(){

	this._vacate( TripleComponent.Relation );
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

    _unfocusLexeme( lex ){

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
    }

    _focusLexeme( lex ){

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
	    "lexemeSelected", event => {

		var lex = event.detail.target;
		if( lex.isFocused || this.tripleState.isFull ){

		    this._unfocusLexeme( lex );
		    return;
		}

		this._focusLexeme( lex );
	});
    }

    addLexeme( lex ){

	this.element.appendChild( lex.element );
    }
}
