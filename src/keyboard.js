class KeyboardInput{

    _dispatch( eventType, key ){

	var detail = { "detail" : { "key": key } };

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

    bind( node ){

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
