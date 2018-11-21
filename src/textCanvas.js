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
	    "lexemeHighlighted", event => {

		var lex = event.detail.target;
		
		this.highlights.push( lex );

		if( this.hasSubject && lex.isSubject ){

		    lex._setNextState();
		}

		if( this.hasObject && lex.isObject ){

		    lex._setNextState();
		}

		if( this.hasRelation && lex.isRelation ){

		    lex._setNextState();
		}

		this.hasSubject =
		    lex.isSubject || this.hasSubject;

		this.hasObject =
		    lex.isObject || this.hasObject;

		this.hasRelation =
		    lex.isRelation || this.hasRelation;
	});
    }

    addLexeme( lex ){

	this.element.appendChild( lex.element );
    }
}
