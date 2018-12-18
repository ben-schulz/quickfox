var buffer = new TextBuffer( document, "div" );
var keyboard = new KeyboardInput( buffer.element );

var canvas = new TextCanvas( document );

document.body.appendChild( canvas.element );

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

    canvas.addLexeme(
	new Lexeme( token.join( "" ) ) );
};

buffer.subscribe( onSpace, writeText, true );

keyboard.bindInput( document );
