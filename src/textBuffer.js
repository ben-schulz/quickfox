class TextBuffer{


    clear(){

	this.contents = [];
    }

    onFlush( action, condition ){

	this.element.removeEventListener(
	    "keypress", this.buffer );
	
	this.buffer = event => {

	    this.contents.push( event.detail.key );

	    if( !condition || condition( this.contents ) ){

		action( this.contents );

		this.clear();
	    }
	};

	this.element.addEventListener(
	    "keypress", this.buffer );
    }

    print(){

	var token = [];
	var tokenLength = this.contents.length;

	for( var ix = 0; ix < tokenLength; ++ix ){

	    token.push( this.contents[ix].keyValue );
	}

	return token.join("");
    }

    constructor( document, type ){

	this.element = document.createElement( type );
	this.contents = [];

	this.buffer = event => {

	    this.contents.push( event.detail.key );
	};

	this.element.addEventListener(
	    "keypress", this.buffer );
    }
}
