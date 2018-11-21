var LexemeState = {

    "Unfocused": "unfocused",

    "Clicked": "clickhighlight",

    "SubjectFocus": "subjectfocus",
    "ObjectFocus": "objectfocus",
    "RelationFocus": "relationfocus",

    "HighlightedStates": [

	this.Clicked,
	this.SubjectFocus,
	this.ObjectFocus,
	this.RelationFocus
    ]
};


class Lexeme{

    highlightClick(){

	this.element.classList.remove( LexemeState.Unfocused  );
	this.element.classList.toggle( LexemeState.Clicked  );
    }

    clearHighlights(){

	LexemeState.HighlightedStates
	    .forEach( state => {

		this.element.classList.remove( state );
	    });

	this.element.classList.add( LexemeState.Unfocused );
    }


    _render(){

	var displayText = document.createTextNode( this.text );
	var textSpan = document.createElement( "span" );

	textSpan.classList.add( LexemeState.Unfocused );
	textSpan.value = this.text;

	textSpan.appendChild( displayText );

	return textSpan;
    }


    constructor( text ){

	this.text = text;
	this.viewState = LexemeState.Unfocused;

	this.element = this._render();

	this.element.addEventListener(
	    "clearHighlights", this.clearHighlights );

	this.element.addEventListener(
	    "click", event => {

		this.highlightClick();

		this.element.dispatchEvent(
		    new CustomEvent( "lexemeHighlighted", {

			"bubbles": true,
			"detail": { "target": this } } )
		);

	    });
    }
}
