var LexemeState = (function() {

    var states = {
	"Unfocused": "unfocused",

	"Clicked": "clickhighlight",

	"SubjectFocus": "subjectfocus",
	"ObjectFocus": "objectfocus",
	"RelationFocus": "relationfocus",
    };

    return{

	"Unfocused": states.Unfocused,

	"Clicked": states.Clicked,

	"SubjectFocus": states.SubjectFocus,
	"ObjectFocus": states.ObjectFocus,
	"RelationFocus": states.RelationFocus,

	"All": [
	    states.Unfocused,
	    states.Clicked,
	    states.SubjectFocus,
	    states.ObjectFocus,
	    states.RelationFocus,
	],

	"HighlightedStates": [

	    states.Clicked,
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
	this._stateIndex = LexemeState.All.find( s => {
	    return s === lexemeState;
	});
    }

    _setNextState(){

	var next = ( ( 1 + this._stateIndex )
		     % LexemeState.All.length )

	this._stateIndex = next;
	this.viewState = LexemeState.All[ this._stateIndex ];

	this._showState( this.viewState );
    }

    highlightClick(){

	this._setState( LexemeState.Clicked );
	this._showState( LexemeState.Clicked );
    }

    clearHighlights(){

	this._setState( LexemeState.Unfocused );
	this._showState( LexemeState.Unfocused );
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

    _render(){

	var displayText = document.createTextNode( this.text );
	var textSpan = document.createElement( "span" );

	textSpan.value = this.text;

	textSpan.appendChild( displayText );

	return textSpan;
    }


    constructor( text ){

	this.text = text;

	this.element = this._render();

	this._stateIndex = -1;
	this._setNextState();

	this.element.addEventListener(
	    "clearHighlights", this.clearHighlights );

	this.element.addEventListener(
	    "click", event => {

		this._setNextState();

		this.element.dispatchEvent(
		    new CustomEvent( "lexemeHighlighted", {

			"bubbles": true,
			"detail": { "target": this } } )
		);
	    });
    }
}
