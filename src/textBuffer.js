class TextBuffer{

    constructor( document, type ){

	this.element = document.createElement( type );
	this.contents = [];

	this.element.addEventListener("keypress", event => {

	    this.contents.push( event.detail.key );
	});
    }
}
