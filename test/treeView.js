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

	    var assertTextNodesCorrect =
		function( obj, tree ){

		Object.keys( obj ).forEach( k => {

		    var expectedPrefix = k + ":{";

		    var k_child = tree.getChild( [ k ] );

		    var actualText = k_child.element.innerText;

		    assert.isTrue(
			actualText.startsWith( expectedPrefix ) );

		    assertTextNodesCorrect( obj[ k ], k_child );

		} );
	    };

	    assertTextNodesCorrect( jsonInput, treeView );

	} );

    } );

} );
