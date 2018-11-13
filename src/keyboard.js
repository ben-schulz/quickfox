class KeyboardInput{

    keypress( key ){

	var detail = { "detail" : { "key": key } };

	var event = new CustomEvent( "keypress", detail );

	this.target.dispatchEvent( event );
    }

    constructor( target ){

	this.target = target;
    }
}
