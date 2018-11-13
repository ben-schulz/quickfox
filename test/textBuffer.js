verify("receives keystrokes from bound input", function(){

    var buffer = new TextBuffer( document, "div" );
    var keyboard = new KeyboardInput( buffer.element );

    keyboard.typeKeys( "hello world" );

    assert.areEquivalent( "hello world",
			  buffer.contents.join("") );
});

verify("flushes when condition met", function(){

    var buffer = new TextBuffer( document, "div" );
    var keyboard = new KeyboardInput( buffer.element );

    var result = [];

    var onSpace = function( contents ){

	return " " == contents.slice(-1);
    };

    var pushWord = function( contents ){

	var tokenLength = contents.length -1;
	var token = contents.slice( 0, tokenLength ).join("");
	result.push( token );
    };

    buffer.onFlush( pushWord, onSpace );

    keyboard.typeKeys( "hello world " );

    assert.areIdentical( "hello", result[0] );
    assert.areIdentical( "world", result[1] );
});
