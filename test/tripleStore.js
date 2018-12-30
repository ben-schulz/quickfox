describe( "TripleTree", function(){

    it( "inserts by list order", function(){

	var tree = new TripleTree();

	var a_triple = [ "a", "b", "c" ];
	tree.insert( a_triple );
	assert.isTrue( "a" in tree.nodes );

	var b_triple = [ "b", "a", "c" ];
	tree.insert( b_triple );
	assert.isTrue( "b" in tree.nodes );

    } );
} );

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

    describe( "addTriple", function(){

	it( "populates bySubject property", function(){

	    var store = new TripleStore();

	    store.addTriple( {
		"subject": "foo",
		"relation": "bar",
		"object": "cat"
	    } );

/*
	    assert.isTrue( "foo" in store.bySubject );

	    assert.equal(
		"bar", store.bySubject[ "foo" ].relation );

	    assert.equal(
		"bar", store.byObject[ "foo" ].object );
*/

	} );


	it( "populates byRelation property", function(){

	    var store = new TripleStore();

	    store.addTriple( {
		"subject": "foo",
		"relation": "bar",
		"object": "cat"
	    } );

//	    assert.isTrue( "bar" in store.byRelation );

	} );


	it( "populates byObject property", function(){

	    var store = new TripleStore();

	    store.addTriple( {
		"subject": "foo",
		"relation": "bar",
		"object": "cat"
	    } );

//	    assert.isTrue( "cat" in store.byObject );

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
