describe("TextBuffer", function(){

    describe("events", function(){

	it("receives keystrokes from bound input", function(){

	    var buffer = new TextBuffer( document, "div" );
	    var keyboard = new KeyboardInput( buffer.element );

	    keyboard.typeKeys( "hello world" );

	    assert.equal( "hello world", buffer.print() );
	});

	it("invokes subscribers when condition met", function(){

	    var buffer = new TextBuffer( document, "div" );
	    var keyboard = new KeyboardInput( buffer.element );

	    var onEnter = function( contents ){

		return ( contents.slice(-1)[0]
			 .charEquals( KeyCode.Enter ) );
	    };

	    var eventEmitted = false;
	    var setTrue = function(){

		eventEmitted = true;
	    };

	    var arbitraryValue = 0;
	    var setArbitraryValue = function(){

		arbitraryValue = 255;
	    };

	    buffer.subscribe( onEnter, setTrue );
	    buffer.subscribe( onEnter, setArbitraryValue );

	    keyboard.typeKeys( [ KeyCode.Enter ] );
	    assert.equal( true, eventEmitted );
	    assert.equal( 255, arbitraryValue );
	});

	it("clears after callback demanding flush", function(){

	    var buffer = new TextBuffer( document, "div" );
	    var keyboard = new KeyboardInput( buffer.element );

	    var onEnter = function( contents ){

		return ( contents.slice(-1)[0]
			 .charEquals( KeyCode.Enter ) );
	    };

	    var result = [];
	    var forwardContents = function( contents ){

		var tokenLength = contents.length - 1;

		var chars = [];
		for( var ix = 0; ix < tokenLength; ++ix ){

		    chars.push( contents[ix].keyValue );
		}

		result.push( chars.join("") );
	    };

	    buffer.subscribe( onEnter, forwardContents, true );

	    var firstSequence = "hello".split("");
	    firstSequence.push( KeyCode.Enter );

	    var secondSequence = "world".split("");
	    secondSequence.push( KeyCode.Enter );

	    keyboard.typeKeys( firstSequence );
	    keyboard.typeKeys( secondSequence );

	    console.info( buffer.contents );

	    assert.equal( "hello", result[0] );
	    assert.equal( "world", result[1] );
	    assert.equal( 0, buffer.contents.length );
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
