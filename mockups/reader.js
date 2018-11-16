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
	};

	fileReader.readAsText( selectedFile );

    });

