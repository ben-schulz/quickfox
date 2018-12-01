var fileSelector =
    document.getElementById( "inputFile" );

var tripleView = document.getElementById( "tripleStore" );

fileSelector.addEventListener(
    "change", function( event ){

	var selectedFile = fileSelector.files[0];

	var canvas = new TextCanvas( document );
	var outputDiv = canvas.element;

	document.body.appendChild( outputDiv );

	var fileReader = new FileReader();

	fileReader.onload = function( event ){

	    var contents = event.target.result;

	    var lexemes = contents.split(' ');

	    for( var ix = 0; ix < lexemes.length; ++ix ){

		canvas.addLexeme(
		    new Lexeme( lexemes[ix] ) );
	    }

	    var onEscape = function( contents ){

		return contents.slice(-1)[0].isEscape;
	    };

	    var raiseClear = function( contents ){

		var event = new CustomEvent(
		    "clearHighlights" );

		canvas.element.dispatchEvent( event );
	    };

	    var onEnter = function( contents ){

		return contents.slice(-1)[0].isEnter;
	    };

	    var showTriple = function( contents ){

		var triple = [
		    canvas.subject.toString(),
		    canvas.object.toString(),
		    canvas.relation.toString()
		];

		var subtext = document.createTextNode(
		    triple.join(", ")  );

		var newItem = document.createElement( "p" );
		newItem.appendChild( subtext );

		tripleView.appendChild( newItem );
	    };

	    var buffer = new TextBuffer( document, "div" );

	    buffer.subscribe( onEscape, raiseClear, true );
	    buffer.subscribe( onEnter, showTriple, true );

	    var keyboard = new KeyboardInput( buffer.element );
	    keyboard.bindInput( document.body );

	};

	fileReader.readAsText( selectedFile );

    });

