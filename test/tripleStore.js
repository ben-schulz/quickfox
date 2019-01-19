var assertFoundInList = function( item, list ){

    for( var ix = 0; ix < list.length; ++ix ){

	var x = list[ ix ];
	if( item.length != x.length ){
	    continue;
	}

	var zipped = x.map( function( x_item, ix ){

	    return [ x_item, item[ ix ] ];
	} );

	var isMatch = zipped.every( z => {
	    return z[ 0 ] === z[ 1 ]; } );

	if( isMatch ){
	    return;
	}
    }

    assert.isTrue( false, `item [${item}] not in [${list}]` );
};


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

    it( "flattens to original input", function(){

	var tree = new TripleTree();

	tree.insert( [ "a", "b", "c" ] );
	tree.insert( [ "a", "b", "d" ] );

	tree.insert( ["a", "r", "s" ] );
	tree.insert( ["x", "y", "z" ] );

	var result = tree.flatten();
	console.info( result );

	assert.equal( 4, result.length );

	assertFoundInList( [ "a", "b", "c" ], result );
	assertFoundInList( [ "a", "b", "d" ], result );
	assertFoundInList( [ "a", "r", "s" ], result );
	assertFoundInList( [ "x", "y", "z" ], result );
    } );

    it( "unions to tree with all distinct elements", function(){

	var left = new TripleTree();
	var right = new TripleTree();

	left.insert( [ "a", "b", "c" ] );
	left.insert( [ "a", "b", "d" ] );
	left.insert( [ "a", "q", "s" ] );

	right.insert( [ "b", "b", "c" ] );
	right.insert( [ "b", "b", "d" ] );
	right.insert( [ "a", "q", "t" ] );

	left.insert( [ "a", "r", "s" ] );
	right.insert( [ "a", "r", "s" ] );

	var result = left.union( right ).flatten();

	assert.equal( 7, result.length );

	assertFoundInList( [ "a", "b", "c" ], result );
	assertFoundInList( [ "a", "b", "d" ], result );
	assertFoundInList( [ "a", "q", "s" ], result );

	assertFoundInList( [ "b", "b", "c" ], result );
	assertFoundInList( [ "b", "b", "d" ], result );
	assertFoundInList( [ "a", "q", "t" ], result );

	assertFoundInList( [ "a", "r", "s" ], result );

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

	    assert.isTrue( store.bySubject.containsKey( "foo" ) );

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

	    assert.isTrue( store.byRelation.containsKey( "bar" ) );

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

	    assert.isTrue( store.byObject.containsKey( "cat" ) );

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

	    assertFoundInList( [ "foo", "bar", "cat" ],
			       results.flatten() );
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

	    assertFoundInList( [ "foo", "bar", "cat" ],
			       results.flatten() );
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

	    assertFoundInList( [ "foo", "bar", "cat" ],
			       results.flatten() );
	} );
    } );

} );
