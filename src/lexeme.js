var LexemeState = (function() {

    var states = {
	"Unfocused": "unfocused",

	"Referent": "referent",

	"SubjectFocus": "subjectfocus",
	"ObjectFocus": "objectfocus",
	"RelationFocus": "relationfocus",
    };

    return{

	"Unfocused": states.Unfocused,

	"Referent": states.Referent,

	"SubjectFocus": states.SubjectFocus,
	"ObjectFocus": states.ObjectFocus,
	"RelationFocus": states.RelationFocus,

	"All": [
	    states.Unfocused,
	    states.SubjectFocus,
	    states.ObjectFocus,
	    states.RelationFocus,
	]
    };
})();


class Lexeme{

    _showState( newLexemeState ){

	LexemeState.All.forEach( state => {

	    this.element.classList.remove( state );
	});

	this.element.classList.add( newLexemeState );
    }

    clearHighlights(){

	this.viewState = LexemeState.Unfocused;
	this._showState( LexemeState.Unfocused );
    }

    get isFocused(){

	return ( this.isSubject
		 || this.isObject
		 || this.isRelation );
    }

    get isUnfocused(){

	return this.viewState === LexemeState.Unfocused;
    }

    get isObject(){

	return this.viewState === LexemeState.ObjectFocus;
    }

    get isSubject(){

	return this.viewState === LexemeState.SubjectFocus;
    }

    get isRelation(){

	return this.viewState === LexemeState.RelationFocus;
    }

    highlightSubject(){

	this.viewState = LexemeState.SubjectFocus;
	this._showState( this.viewState );
    }

    highlightObject(){

	this.viewState = LexemeState.ObjectFocus;
	this._showState( this.viewState );
    }

    highlightRelation(){

	this.viewState = LexemeState.RelationFocus;
	this._showState( this.viewState );
    }

    showAsReferent(){

	this.element.classList.add( LexemeState.Referent );
	this.isReferent = true;

    }


    showAsNonReferent(){

	this.element.classList.remove( LexemeState.Referent );
	this.isReferent = false;
    }

    mouseover(){

	if( this.isReferent ){

	    this.tooltip.style.display = "block";

	    var rect = this.element.getBoundingClientRect();

	    var tooltipLeftPixels = (
		rect.right + window.scrollX
	    );

	    var tooltipTopPixels = (
		rect.bottom + window.scrollY - this.offsetY
	    );

	    this.element.dispatchEvent(

		    new CustomEvent( "showtooltip", {

			"bubbles": true,
			"detail": {
			    "target": this,
			    "clientX": tooltipLeftPixels,
			    "clientY": tooltipTopPixels
			} } )
		);
	}
    }

    mouseleave(){

	if( this.isReferent ){

	    this.tooltip.style.display = "none";

	    this.element.dispatchEvent(

		new CustomEvent( "tooltipinactive", {

		    "bubbles": true,
		    "detail": { "target": this } } )
	    );
	}
    }

    constructor( text ){

	this.text = text;
	this.length = text.length;

	this.isReferent = false;

	this.offsetY = 0;

	this.element = (() => {

	    var displayText =
		document.createTextNode( text );

	    var textSpan = document.createElement( "span" );

	    for( var ix = 0; ix < text.length; ++ix ){

		textSpan.appendChild(
		    new CharBox( text.charAt( ix ) ).element );
	    }

	    textSpan.value = text;

	    textSpan.classList.add( "lexeme" );

	    return textSpan;

	})();

	this.tooltip = (() => {

	    var tooltip = document.createElement( "div" );

	    tooltip.classList.add( "tripletooltip" );
	    tooltip.style.display = "none";

	    return tooltip;
	})();

	this.clearHighlights();

	this.element.addEventListener(
	    "clearHighlights", this.clearHighlights );

	this.element.addEventListener(
	    "click", event => {

		this.element.dispatchEvent(
		    new CustomEvent( "lexemeSelected", {

			"bubbles": true,
			"detail": { "target": this } } )
		);
	    });

	this.element.addEventListener(
	    "saveTriple", event => {

		this.showAsReferent();

		if( event.detail ){

		    var newText = document.createTextNode(
			event.detail.subject
			    + " -> " + event.detail.relation
			    + " -> " + event.detail.object
		    );

		    var newRow = document.createElement( "span" );

		    newRow.appendChild( newText );
		    this.tooltip.appendChild( newRow );
		}

	} );


	this.element.addEventListener(
	    "mouseenter", event => {

		this.mouseover();
	    } );

	this.element.addEventListener(
	    "mouseleave", event => {

		this.mouseleave();
	    } );
    }
}

class Separator{

    constructor( text ){

	this.text = text;
	this.length = text.length;

	this.element = (function(){

	    var displayText =
		document.createTextNode( text );

	    var textSpan = document.createElement( "span" );

	    textSpan.value = text;

	    textSpan.appendChild( displayText );

	    return textSpan;

	})();
    }
}


var Lexer = {

    "alphaRegex": /[a-zA-Z]/,

    "isAlpha": function( c ){

	return this.alphaRegex.test( c );
    },

    "lex": function( text ){

	if( 1 > text.length ){

	    return [];
	}

	var tokens = [];
	var currentToken = "";

	var currentIsAlpha = this.isAlpha( text.charAt( 0 ) );
	var prevIsAlpha = !currentIsAlpha;
	
	for( var ix = 0; ix < text.length; ++ix ){

	    var c = text.charAt( ix );

	    prevIsAlpha = currentIsAlpha;
	    currentIsAlpha = this.isAlpha( c );

	    if( ( prevIsAlpha && currentIsAlpha )
		|| ( !prevIsAlpha && !currentIsAlpha ) ){

		currentToken += c;
	    }

	    else if( prevIsAlpha && !currentIsAlpha ){

		tokens.push( new Lexeme( currentToken ) );
		currentToken = c;
	    }

	    else{

		tokens.push( new Separator( currentToken ) );
		currentToken = c;
	    }
	}

	tokens.push( new Lexeme ( currentToken ) );

	return tokens;
    },
};
