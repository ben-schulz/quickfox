describe( "TreeView", function(){

    describe( "given JSON", function(){

	it( "produces isomorphic nested elements", function(){

	    var jsonInput = {

		"subject0": {
		    "relation00":{
			"object000":{},
			"object001":{},
		    },
		    "relation01":{
			"object110":{},
		    },
		},

		"subject1": {

		    "relation10":{
			"object100":{},
			"object101":{},
			"object102":{},
		    },
		    "relation11":{
		    },
		},

		"subject2": {
		    "relation20":{}
		},
	    };

	    var treeView = new TreeView( jsonInput );

	    var assertChildStartsWith = function( refs ){

		var elementText =
		    treeView.getChild( refs )
		    .element.innerText

		var prefix = refs.join( ":{" );

		assert.isTrue( elementText.startsWith( prefix )  );
	    };

	    assertChildStartsWith( [ "subject0" ] );

	} );
    } );
} );
