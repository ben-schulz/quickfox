class TextBuffer{


    clear(){

	this.contents = [];
    }

    subscribe( condition, action, clearAfter ){

	this._subscribers.push( {

	    "condition": condition,
	    "action": action,
	    "clearAfter": clearAfter || false
	} );
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

	this._subscribers = [];

	this.buffer = event => {

	    this.contents.push( event.detail.key );

	    var shouldClear = false;
	    this._subscribers.forEach( s => {

		if( s.condition( this.contents ) ){

		    s.action( this.contents );

		    shouldClear = shouldClear || s.clearAfter;
		}
	    } );

	    if( shouldClear ){

		this.clear();
	    }
	};

	this.element.addEventListener(
	    "keypress", this.buffer );
    }
}
