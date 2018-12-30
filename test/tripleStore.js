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

	    assert.equal( "cat", result.foo.bar.cat );
	} );
    } );


    describe( "querySubject method", function(){

	it( "returns subject matches", function(){

	    var store = new TripleStore();

	    store.addTriple( {

		"subject": "foo",
		"relation": "bar",
		"object": "cat"
	    } );

	    store.addTriple( {

		"subject": "no match",
		"relation": "no match",
		"object": "no match"
	    } );

	    var results = store.querySubject(
		function( s ){
		    return s === "foo"
		}
	    );

	    assert.isTrue( "foo" in results[ 0 ]  );

	    assert.isTrue(
		"bar" in results[ 0 ][ "foo" ]  );

	    assert.isTrue(
		"cat" in results[ 0 ][ "foo" ][ "bar" ]  );

	} );
    } );

} );
