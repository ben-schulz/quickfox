var buffer = new TextBuffer( document, "div" );
var keyboard = new KeyboardInput( buffer.element );

var canvas = document.getElementById( "textCanvasDemo" );

var onSpace = contents => {

    return " " == contents.slice(-1);
};

var writeText = contents => {

    if( "Backspace" === contents[0] ){

	contents.splice( 0, 1 );
    }

    for( var ix = 1; ix < contents.length; ++ix ){

	if( "Backspace" === contents[ix] ){

	    contents.splice( ix, 1 );
	    contents.splice( ix - 1, 1 );
	}
    }

    console.info(contents);
    canvas.appendChild(
	new Lexeme( contents.join("") ).render() );
};

buffer.onFlush( writeText, onSpace );

keyboard.bindInput( document );
