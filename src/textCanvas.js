class TextCanvas{

    constructor( document ){

	this.elementType = "div";
	this.element = document.createElement(
	    this.elementType );

	this.highlights = [];

	this.element.addEventListener(
	    "clearHighlights", event => {

		this.highlights.forEach( lex => {

		    lex.clearHighlights();
		});

		this.highlights = [];
	});

	this.element.addEventListener(
	    "lexemeHighlighted", event =>{

		this.highlights.push( event.detail.target );
	});
    }

    addLexeme( lex ){

	this.element.appendChild( lex.element );
    }
}
