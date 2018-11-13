class KeyboardInput{

    keypress( key ){

	var detail = { "detail" : { "key": key } };

	var event = new CustomEvent( "keypress", detail );

	this.target.dispatchEvent( event );
    }

    keydown( key ){

	var detail = { "detail" : { "key": key } };

	var event = new CustomEvent( "keydown", detail );

	this.target.dispatchEvent( event );
    }

    keyup( key ){

	var detail = { "detail" : { "key": key } };

	var event = new CustomEvent( "keyup", detail );

	this.target.dispatchEvent( event );
    }


    constructor( target ){

	this.target = target;
    }
}
