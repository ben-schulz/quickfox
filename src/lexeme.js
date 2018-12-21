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
    }


    showAsNonReferent(){

	this.element.classList.remove( LexemeState.Referent );
    }


    constructor( text ){

	this.text = text;

	this.element = (function(){

	    var displayText =
		document.createTextNode( text );

	    var textSpan = document.createElement( "span" );

	    textSpan.value = text;

	    textSpan.appendChild( displayText );

	    return textSpan;

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
    }
}

var Lexer = {

    "lex": function( text ){

	if( 1 > text.length ){

	    return [];
	}

	var alpha = /[a-zA-Z]/;
	var separator = /[^a-zA-Z]/;	

	var tokens = [];
	var currentToken = '';

	var currentIsAlpha = alpha.test( text.charAt( 0 ) );
	var prevIsAlpha = !currentIsAlpha;
	
	for( var ix = 0; ix < text.length; ++ix ){

	    var c = text.charAt( ix );

	    prevIsAlpha = currentIsAlpha;
	    currentIsAlpha = alpha.test( c )

	    if( ( prevIsAlpha && currentIsAlpha )
		|| ( !prevIsAlpha && !currentIsAlpha ) ){

		currentToken += c;
	    }
	    else{

		tokens.push( currentToken );
		currentToken = c;
	    }
	}

	tokens.push( currentToken );

	return tokens;
    },
};
