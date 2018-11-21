var buffer = new TextBuffer( document, "div" );
var keyboard = new KeyboardInput( buffer.element );

var canvas = document.getElementById( "textCanvasDemo" );

var onSpace = contents => {

    return contents.slice(-1)[0].charEquals(" ");
};

var writeText = contents => {

    var token = [];
    if( !contents[0].isBackspace ){

	token.push( contents[0].keyValue );
    }


    for( var ix = 1; ix < contents.length; ++ix ){

	if( contents[ix].isBackspace ){

	    token.splice( ix - 1, 1 );
	}
	else{
	    token.push( contents[ix].keyValue );
	}
    }

    canvas.appendChild(
	new Lexeme( token.join( "" ) ).element );
};

buffer.onFlush( writeText, onSpace );

keyboard.bindInput( document );
