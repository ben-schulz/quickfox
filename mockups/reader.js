function downloadTriples( data, filename ){

    var type = "application/ld+json";

    var file = new Blob( [ data ], { "type": type } );

    var a = document.createElement( "a" );
    var url = URL.createObjectURL( file );

    a.href = url;
    a.download = filename;
    document.body.appendChild( a );

    a.click();

    setTimeout(function() {

	document.body.removeChild( a );
	window.URL.revokeObjectURL( url );

    }, 0);
}


var fileSelector =
    document.getElementById( "inputFile" );

var tripleView = document.getElementById( "tripleStore" );

var store = new TripleStore();

var downloadButton = document.getElementById(
    "tripleStoreDownloadButton" );

downloadButton.addEventListener( "click", event => {

    if( fileSelector.files[0] ){

	var outputFileName = fileSelector.files[0].name;
	downloadTriples( store.toJson(), outputFileName );
    }

});

fileSelector.addEventListener(
    "change", function( event ){

	var selectedFile = fileSelector.files[0];

	var canvas = new TextCanvas( document );

	canvas.textLayer.id = "fileContents";
	canvas.tooltipLayer.id = "tooltipLayer";

	document.body.appendChild( canvas.textLayer );
	document.body.appendChild( canvas.tooltipLayer );

	canvas.boundingRect =
	    canvas.textLayer.getBoundingClientRect();

	var fileReader = new FileReader();

	fileReader.onload = function( event ){

	    var contents = event.target.result;

	    var lexemes = Lexer.lex( contents );

	    for( var ix = 0; ix < lexemes.length; ++ix ){

		canvas.addLexeme( lexemes[ix] );
	    }

	    var onEscape = function( contents ){

		return contents.slice(-1)[0].isEscape;
	    };

	    var raiseClear = function( contents ){

		var event = new CustomEvent(
		    "clearHighlights" );

		canvas.textLayer.dispatchEvent( event );
	    };

	    var onEnter = function( contents ){

		return contents.slice(-1)[0].isEnter;
	    };

	    var showTriple = function( contents ){

		var triple = {
		    "subject": canvas.subject,
		    "relation": canvas.relation,
		    "object": canvas.object
		};

		store.addTriple( triple );

		var subtext = new TreeView( store.triples );

		var newItem = document.createElement( "div" );

		newItem.appendChild( subtext.element );

		if( tripleView.firstChild ){

		    tripleView.firstChild.remove();
		}

		tripleView.appendChild( newItem );

		canvas.saveTriple();
	    };

	    var buffer = new TextBuffer( document, "div" );

	    buffer.subscribe( onEscape, raiseClear, true );
	    buffer.subscribe( onEnter, showTriple, true );

	    var keyboard = new KeyboardInput( buffer.element );
	    keyboard.bindInput( document.body );

	};

	fileReader.readAsText( selectedFile );

    });

