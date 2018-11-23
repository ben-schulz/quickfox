var LexemeState = (function() {

    var states = {
	"Unfocused": "unfocused",

	"SubjectFocus": "subjectfocus",
	"ObjectFocus": "objectfocus",
	"RelationFocus": "relationfocus",
    };

    return{

	"Unfocused": states.Unfocused,

	"SubjectFocus": states.SubjectFocus,
	"ObjectFocus": states.ObjectFocus,
	"RelationFocus": states.RelationFocus,

	"All": [
	    states.Unfocused,
	    states.SubjectFocus,
	    states.ObjectFocus,
	    states.RelationFocus,
	],

	"HighlightedStates": [

	    states.SubjectFocus,
	    states.ObjectFocus,
	    states.RelationFocus
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

    _setState( lexemeState ){

	this.viewState = lexemeState;
    }

    _setNextState(){

	var next = ( ( 1 + this._stateIndex )
		     % LexemeState.All.length )

	this._stateIndex = next;
	this.viewState = LexemeState.All[ this._stateIndex ];

	this._showState( this.viewState );
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
		    new CustomEvent( "lexemeHighlighted", {

			"bubbles": true,
			"detail": { "target": this } } )
		);
	    });
    }
}
