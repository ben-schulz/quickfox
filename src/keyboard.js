class Key{

    charEquals( c ){

	return this.keyValue == c;
    }

    constructor( key ){

	this.keyValue = key;

	this.isBackspace = key === KeyCode.Backspace;
	this.isEscape = key === KeyCode.Escape;
	this.isEnter = key === KeyCode.Enter;
    }
}

class KeyboardInput{

    _dispatch( eventType, key ){

	var detail = { "detail" : { "key": new Key( key ) } };

	var event = new CustomEvent( eventType, detail );

	this.target.dispatchEvent( event );

    }

    keypress( key ){

	this._dispatch( "keypress", key );
    }

    keydown( key ){

	this._dispatch( "keydown", key );
    }

    keyup( key ){

	this._dispatch( "keyup", key );
    }


    typeKeys( seq ){

	for( var ix = 0; ix < seq.length; ++ix ){

	    this._dispatch( "keypress", seq[ix] );
	}
    }

    bindInput( node ){

	node.addEventListener(
	    "keypress", event => this.keypress( event.key ) );

	node.addEventListener(
	    "keydown", event => this.keydown( event.key ) );

	node.addEventListener(
	    "keyup", event => this.keyup( event.key ) );
    }

    constructor( target ){

	this.target = target;
    }
}
