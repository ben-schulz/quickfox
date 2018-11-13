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

    constructor( target ){

	this.target = target;
    }
}
