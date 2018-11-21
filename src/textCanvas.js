class TextCanvas{

    constructor( document ){

	this.elementType = "div";
	this.element = document.createElement(
	    this.elementType );

	this.lexemes = [];

	this.element.addEventListener(
	    "clearHighlights", event => {

		this.lexemes.forEach( lex => {

		    lex.clearHighlights();
		});

		this.lexemes = [];
	});
    }

    addLexeme( lex ){

	this.lexemes.push( lex );
	this.element.appendChild( lex.element );
    }
}
