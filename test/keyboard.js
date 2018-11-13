verify("keypress registered", function(){

    var boundElement = document.createElement( "div" );

    var registered = false;
    boundElement.addEventListener("keypress", function( event ){

	if( 'x' == event.detail.key ){
	    registered = true;
	}
    });

    var keyboard = new KeyboardInput( boundElement );

    keyboard.keypress( 'x' );

    assert.isTrue( registered );
});
