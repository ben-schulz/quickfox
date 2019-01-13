class TripleTree{

    contains( key ){

	return key in this.nodes;
    }

    ref( keys ){

	var result = this.nodes;

	keys.forEach( k => {

	    result = result[ k ];
	} );

	return result;
    }

    insert( triple ){

	var first = triple[ 0 ];

	if( !( first in this.nodes ) ){

	    this.nodes[ first ] = {};
	}

	var second = triple[ 1 ];

	if( !( second in this.nodes[ first ] ) ){

	    this.nodes[ first ][ second ] = {};
	}

	var third = triple[ 2 ];
	this.nodes[ first ][ second ][ third ] = third;
    }

    flatten(){

	var result = [];

	Object.keys( this.nodes ).forEach( subj => {

	    Object.keys( this.nodes[ subj ] ).forEach( rel => {

		Object.keys( this.nodes[ subj ][ rel ] )
		    .forEach( obj => {

			result.push( [ subj, rel, obj ] );
		    } );
	    } );
	} );

	return result;
    }

    constructor(){

	this.nodes = {};
    }
}

class TripleStore{

    static isReferent( token ){

	if( token ){

	    return true;
	}

	return false;
    }

    addTriple( t ){

	this.bySubject.insert( [

	    t.subject,
	    t.relation,
	    t.object
	] );


	this.byRelation.insert( [

	    t.relation,
	    t.subject,
	    t.object
	] );

	this.byObject.insert( [

	    t.object,
	    t.subject,
	    t.relation
	] );


	if( !this.triples[ t.subject ] ){

	    this.triples[ t.subject ] = {};
	}

	if( !this.triples[ t.subject ][ t.relation ] ){

	    this.triples[ t.subject ][ t.relation ] = {};
	}

	if( TripleStore.isReferent( t.object ) ){

	    this.triples[ t.subject ][ t.relation ][ t.object ] =
		t.object;
	}
    }

    toJson(){

	return JSON.stringify( this.triples );
    }


    static _queryTree( pred, tripleTree ){

	var result= new TripleTree();

	var keys = Object.keys( tripleTree.nodes );

	keys.forEach( k => {

	    if( pred( k ) ){

		var first = k;
		var seconds = tripleTree.nodes[ first ];

		Object.keys( seconds ).forEach( second => {

		    var thirds =
			tripleTree.nodes[ first ][ second ];

		    Object.keys( thirds ).forEach( third => {
			    result.insert( [
				first,
				second,
				third
			    ] );
			} );
		    } );
	    }
	} );

	return result;
    }

    querySubject( pred ){

	var result = TripleStore._queryTree( pred, this.bySubject );

	return result.flatten();
    }


    queryRelation( pred ){

	var result = TripleStore._queryTree(
	    pred, this.byRelation );

	return result.flatten().map( x => {

	    return [ x[ 1 ], x[ 0 ], x[ 2 ] ];
	} );
    }


    queryObject( pred ){

	var result =  TripleStore._queryTree( pred, this.byObject );

	return result.flatten().map( x => {

	    return [ x[ 1 ], x[ 2 ], x[ 0 ]  ];
	} );
    }


    constructor(){

	this.triples = {};

	this.bySubject = new TripleTree();
	this.byRelation = new TripleTree();
	this.byObject = new TripleTree();
    }
}

