var fileSelector =
    document.getElementById( "inputFile" );

fileSelector.addEventListener(
    "change", function( event ){

	var selectedFile = fileSelector.files[0];

	var outputDiv =
	    document.getElementById( "fileContents" );

	var fileReader = new FileReader();

	fileReader.onload = function( event ){

	    var contents = event.target.result;

	    var lexemes = contents.split(' ');

	    for( var ix = 0; ix < lexemes.length; ++ix ){

		outputDiv.appendChild(
		    new Lexeme( lexemes[ix] ).render() );
	    }

	    var onEscape = function( contents ){

		return contents.slice(-1)[0].isEscape;
	    };

	    var raiseClear = function( contents ){

		var event = new CustomEvent(
		    "clearHighlights" );

		outputDiv.childNodes.forEach(
		    node => node.dispatchEvent( event ) )
	    };

	    var buffer = new TextBuffer( document, "div" );
	    buffer.onFlush( raiseClear, onEscape );

	    var keyboard = new KeyboardInput( buffer.element );
	    keyboard.bindInput( document.body );

	};

	fileReader.readAsText( selectedFile );

    });

