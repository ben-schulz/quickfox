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

	    assert.isTrue( store.bySubject.contains( "foo" ) );

	    assert.isTrue(
		"bar" in store.bySubject.ref( [ "foo" ] ) );

	    assert.isTrue(
		"cat" in store.bySubject.ref( [ "foo", "bar" ] ) );
	} );


	it( "populates byRelation property", function(){

	    var store = new TripleStore();

	    store.addTriple( {
		"subject": "foo",
		"relation": "bar",
		"object": "cat"
	    } );

	    assert.isTrue( store.byRelation.contains( "bar" ) );

	    assert.isTrue(
		"foo" in store.byRelation.ref( [ "bar" ] ) );

	    assert.isTrue(
		"cat" in store.byRelation.ref( [ "bar", "foo" ] ) );

	} );


	it( "populates byObject property", function(){

	    var store = new TripleStore();

	    store.addTriple( {
		"subject": "foo",
		"relation": "bar",
		"object": "cat"
	    } );

	    assert.isTrue( store.byObject.contains( "cat" ) );

	    assert.isTrue(
		"foo" in store.byObject.ref( [ "cat" ] ) );

	    assert.isTrue(
		"bar" in store.byObject.ref( [ "cat", "foo" ] ) );
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

    describe( "queryRelation method", function(){

	it( "returns relation matches", function(){

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

	    var results = store.queryRelation(
		function( s ){
		    return s === "bar"
		}
	    );

	    assert.isTrue( "bar" in results[ 0 ]  );

	    assert.isTrue(
		"foo" in results[ 0 ][ "bar" ]  );

	    assert.isTrue(
		"cat" in results[ 0 ][ "bar" ][ "foo" ]  );

	} );
    } );

    describe( "queryObject method", function(){

	it( "returns object matches", function(){

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

	    var results = store.queryObject(
		function( s ){
		    return s === "cat"
		}
	    );

	    assert.isTrue( "cat" in results[ 0 ]  );

	    assert.isTrue(
		"foo" in results[ 0 ][ "cat" ]  );

	    assert.isTrue(
		"bar" in results[ 0 ][ "cat" ][ "foo" ]  );

	} );
    } );

} );
