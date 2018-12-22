var TripleComponent = {

	"Subject": "tripleSubject",
	"Relation": "tripleRelation",
	"Object": "tripleObject",
};

class TripleState{

    clear(){

	this.subject = null;
	this.relation = null;
	this.object = null;

	this.vacant = [

	    TripleComponent.Object,
	    TripleComponent.Relation,
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

    get isComplete(){

	return ( this.hasSubject
		 && this.hasRelation );
    }

    get isFull(){

	return ( this.hasSubject
		 && this.hasRelation
		 && this.hasObject ) ;
    }


    fillNext( data ){

	if( 1 > this.vacant.length ){

	    return null;
	}

	var next = this.vacant.pop();
	this.filled.push( next );

	this.setters[ next ]( data );

	return next;
    }

    vacateLast(){

	if( 1 > this.filled.length ){

	    return;
	}

	var last = this.filled.pop();
	this.vacant.push( last );

	this.setters[ last ]( null );
    }

    _vacate( component ){

	var ix = this.filled.indexOf( component );

	if( 0 > ix ){

	    return;
	}

	this.vacant.push( component );
	this.filled.splice( ix, 1 );

	this.setters[ component ]( null );
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

    setSubject( data ){

	this.subject = data;
    }

    setObject( data ){

	this.object = data;
    }

    setRelation( data ){

	this.relation = data;
    }

    constructor(){

	this.clear();

	this.setters = {}

	this.setters[ TripleComponent.Subject ] =
	    value => this.setSubject( value );

	this.setters[ TripleComponent.Object ] =
	    value => this.setObject( value );

	this.setters[ TripleComponent.Relation ] =
	    value => this.setRelation( value );
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

    get subject(){

	return this.tripleState.subject;
    }

    get object(){

	return this.tripleState.object;
    }

    get relation(){

	return this.tripleState.relation;
    }
    
    _unfocusLexeme( lex ){

	this.unsubscribe( lex.element );

	if( lex.isSubject ){

	    this.tripleState.vacateSubject();
	}
	else if( lex.isRelation ){

	    this.tripleState.vacateRelation();
	}
	else if( lex.isObject ){

	    this.tripleState.vacateObject();
	}

	lex.clearHighlights();
    }

    _focusLexeme( lex ){

	var next = this.tripleState.fillNext( lex.text );

	this.highlights.push( lex );

	this.subscribe( "saveTriple", lex.element );

	if( next === TripleComponent.Subject ){

	    lex.highlightSubject();
	    return;
	}

	if( next === TripleComponent.Relation ){

	    lex.highlightRelation();
	    return;
	}

	if( next === TripleComponent.Object ){

	    lex.highlightObject();
	    return;
	}
    }

    lexemeSelected( lex ){

	if( lex.isFocused || this.tripleState.isFull ){

	    this._unfocusLexeme( lex );
	    return;
	}

	this._focusLexeme( lex );
    }

    clearHighlights(){

	this.highlights.forEach( lex => {

	    lex.clearHighlights();
	});

	this.highlights = [];
	this.tripleState.clear();
    }


    saveTriple(){

	if( !this.tripleState.isComplete ){

	    return;
	}

	var save = new CustomEvent( "saveTriple", {

	    "detail": {

		"subject": this.subject,
		"relation": this.relation,
		"object": this.object,
	    }
	});

	this.subscribers[ "saveTriple" ].forEach( target => {

	    target.dispatchEvent( save );
	});
    }


    subscribe( eventName, listener ){

	if( !this.subscribers.hasOwnProperty( eventName ) ){

	    this.subscribers[ eventName ] = [];
	}

	this.subscribers[ eventName ].push( listener );
    }

    unsubscribe( eventName, listener ){

	if( eventName in this.subscribers ){

	    var listenerIndex =
		this.subscribers[ eventName ].index( listener );

	    if( -1 === listenerIndex ){
		return;
	    }

	    this.subscribers[ eventName ].splice(
		listenerIndex, 1 );
	}
    }

    constructor( document ){

	this.elementType = "div";
	this.element = document.createElement(
	    this.elementType );

	this.highlights = [];

	this.subscribers = { "saveTriple": [] };

	this.tripleState = new TripleState();

	this.element.addEventListener(
	    "clearHighlights", event => {

		this.clearHighlights();
	});

	this.element.addEventListener(
	    "lexemeSelected", event => {

		this.lexemeSelected( event.detail.target );
	});
    }

    addLexeme( lex ){

	this.element.appendChild( lex.element );
    }
}
