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
	    var fileText = document.createTextNode( contents );

	    outputDiv.appendChild( fileText );
	};

	fileReader.readAsText( selectedFile );

    });

