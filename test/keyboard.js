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


verify("keydown registered", function(){

    var boundElement = document.createElement( "div" );

    var registered = false;
    boundElement.addEventListener("keydown", function( event ){

	if( 'x' == event.detail.key ){
	    registered = true;
	}
    });

    var keyboard = new KeyboardInput( boundElement );

    keyboard.keydown( 'x' );

    assert.isTrue( registered );
});


verify("keyup registered", function(){

    var boundElement = document.createElement( "div" );

    var registered = false;
    boundElement.addEventListener("keyup", function( event ){

	if( 'x' == event.detail.key ){
	    registered = true;
	}
    });

    var keyboard = new KeyboardInput( boundElement );

    keyboard.keyup( 'x' );

    assert.isTrue( registered );
});


verify("typeString reproduces printable strings", function(){

    var boundElement = document.createElement( "input" );
    boundElement.type = "text";

    boundElement.addEventListener("keypress", function( event ){

	boundElement.value += event.detail.key;
    });

    var keyboard = new KeyboardInput( boundElement );

    keyboard.typeKeys( "hello world" );

    assert.areIdentical( "hello world", boundElement.value );
});
