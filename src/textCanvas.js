class TextCanvas{

    constructor( document ){

	this.elementType = "div";
	this.element = document.createElement(
	    this.elementType );

	this.lexemes = [];
    }

    addLexeme( lex ){

	this.element.appendChild( lex.element );
    }
}
