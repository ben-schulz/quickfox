class TextCanvas{

    constructor( document ){

	this.elementType = "div";
	this.element = document.createElement(
	    this.elementType );

	this.highlights = [];

	this.hasSubject = false;
	this.hasObject = false;
	this.hasRelation = false;

	this.element.addEventListener(
	    "clearHighlights", event => {

		this.highlights.forEach( lex => {

		    lex.clearHighlights();
		});

		this.highlights = [];

		this.hasSubject = false;
		this.hasObject = false;
		this.hasRelation = false;
	});

	this.element.addEventListener(
	    "lexemeHighlighted", event =>{

		var lex = event.detail.target;
		
		this.highlights.push( lex );

		this.hasObject = lex.isObject;
		this.hasSubject = lex.isSubject;
		this.hasRelation = lex.isRelation;
	});
    }

    addLexeme( lex ){

	this.element.appendChild( lex.element );
    }
}
