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


class LayeredDisplay{

    toggle(){

	if( this._reversed ){

	    this.moveForegroundToFront();
	    this._reversed = false;
	}

	else{

	    this.moveBackgroundToFront();
	    this._reversed = true;
	}
    }

    moveForegroundToFront(){

	this.active = this.foreground;
	this._reversed = false;

	this.foreground.style.zIndex = this.activeZ;
	this.background.style.zIndex = this.inactiveZ;
    }

    moveBackgroundToFront(){

	this.active = this.background;
	this._reversed = true;

	this.foreground.style.zIndex = this.inactiveZ;
	this.background.style.zIndex = this.activeZ;
    }

    constructor(){

	this.activeZ = 2;
	this.inactiveZ = 1

	this.elementType = "div";

	this._reversed = false;

	this.container = document.createElement(
		this.elementType );

	this.foreground =
	    document.createElement( this.elementType );

	this.background =
	    document.createElement( this.elementType );

	this.container.appendChild( this.foreground );
	this.container.appendChild( this.background );

	this.container.addEventListener(
	    "tooltipactive", event => {

		this.moveBackgroundToFront();
	} );

	this.container.addEventListener(
	    "tooltipinactive", event => {

		this.moveForegroundToFront();
	} );

	this.moveForegroundToFront();
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

	this.lexTable[ lex.text ].forEach( l => {

	    this.unsubscribe( l.element );
	} );

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

	this.lexTable[ lex.text ].forEach( l => {

	    this.subscribe( "saveTriple", l.element );
	} );

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

	this.tripleStore.addTriple( this.tripleState );
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

    setMaxLineChars( charCount ){

	this.maxLineChars = charCount;
    }

    constructor( document ){

	var defaultLineChars = 40;

	this.nextColumn = 0;
	this.maxLineChars = defaultLineChars;
	this.nextLine = 0;

	this.elementType = "div";

	this.boundingRect = {
	    "top": 0,
	    "right": 0,
	    "bottom": 0,
	    "left": 0
	};

	this.tripleStore = new TripleStore();

	this.display = new LayeredDisplay();

	this.textLayer = this.display.foreground;
	this.tooltipLayer = this.display.background;

	this.highlights = [];

	this.lexTable = {};

	this.subscribers = { "saveTriple": [] };

	this.tripleState = new TripleState();

	this.tooltip = new Tooltip();
	this.tooltipLayer.appendChild( this.tooltip.element );

	this.textLayer.addEventListener(
	    "clearHighlights", event => {

		this.clearHighlights();
	});

	this.textLayer.addEventListener(
	    "hidetooltip", event => {

		this.display.moveForegroundToFront();

		this.tooltip.hide();
	    } );

	this.textLayer.addEventListener(
	    "showtooltip", event => {

		this.display.moveBackgroundToFront();

		var subjects =
		    this.tripleStore.querySubject(
			t => t == event.detail.text );

		var relations =
		    this.tripleStore.queryRelation(
			t => t == event.detail.text );

		var objects =
		    this.tripleStore.queryObject(
			t => t == event.detail.text );

		var result = subjects
		    .union( relations )
		    .union( objects )
		    .flatten();

		this.tooltip.addItems( result );

		this.tooltip.show( {
		    "clientX": event.detail.clientX,
		    "clientY": event.detail.clientY
		} );
	    } );

	this.textLayer.addEventListener(
	    "lexemeSelected", event => {

		this.lexemeSelected( event.detail.target );
	});
    }

    addLexeme( lex ){

	this.textLayer.appendChild( lex.element );

	if( !( lex.text in this.lexTable  ) ){

	    this.lexTable[ lex.text ] = [];
	}

	this.lexTable[ lex.text ].push( lex );

	var lineCharsRemaining =
	    ( this.maxLineChars - this.nextColumn );

	if( lex.length > lineCharsRemaining ){

	    this.nextColumn = 0;
	    this.nextLine += 1;
	}

	lex.columnStart = this.nextColumn;
	lex.lineNumber = this.nextLine;

	lex.offsetY = this.boundingRect.top;

	this.nextColumn += lex.length;

    }
}
