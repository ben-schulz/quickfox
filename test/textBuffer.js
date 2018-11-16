describe("TextBuffer", function(){

    describe("events", function(){

	it("receives keystrokes from bound input", function(){

	    var buffer = new TextBuffer( document, "div" );
	    var keyboard = new KeyboardInput( buffer.element );

	    keyboard.typeKeys( "hello world" );

	    assert.equal( "hello world", buffer.print() );
	});
    });

    describe("flush", function(){

	it("happens when condition met", function(){

	    var buffer = new TextBuffer( document, "div" );
	    var keyboard = new KeyboardInput( buffer.element );

	    var result = [];

	    var onSpace = function( contents ){

		return contents.slice(-1)[0].charEquals( " " );
	    };

	    var pushWord = function( contents ){

		var tokenLength = contents.length -1;

		var token = [];
		for( var ix = 0; ix < tokenLength; ++ix ){

		    token.push( contents[ix].keyValue );
		}

		result.push( token.join("") );
	    };

	    buffer.onFlush( pushWord, onSpace );

	    keyboard.typeKeys( "hello world " );

	    assert.equal( "hello", result[0] );
	    assert.equal( "world", result[1] );
	});
    });
});
