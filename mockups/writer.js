var buffer = new TextBuffer( document, "div" );
var keyboard = new KeyboardInput( buffer.element );

var canvas = document.getElementById( "textCanvasDemo" );

var onSpace = contents => {

    return " " == contents.slice(-1);
};

var writeText = contents => {

    canvas.appendChild(
	new Lexeme( contents.join("") ).render() );
};

buffer.onFlush( writeText, onSpace );

keyboard.bindInput( document );
