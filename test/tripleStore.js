describe( "TripleStore", function(){

    describe( "toJson method", function(){

	it( "serializes to object", function(){

	    var store = new TripleStore();

	    store.addTriple( {
		"subject": "foo",
		"relation": "bar",
		"object": "cat"
	    } );

	    var result = JSON.parse( store.toJson() );

	    assert.equal( "cat", result.foo.bar );
	} );
    } );

} );
