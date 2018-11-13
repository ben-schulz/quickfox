verify("receives keystrokes from bound input", function(){

    var buffer = new TextBuffer( document, "div" );
    var keyboard = new KeyboardInput( buffer.element );

    keyboard.typeKeys( "hello world" );

    assert.areEquivalent( "hello world",
			  buffer.contents.join("") );
});
