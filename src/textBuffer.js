class TextBuffer{


    clear(){

	this.contents = [];
    }

    listenFor( condition ){

	this._flushCondition = condition;
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
