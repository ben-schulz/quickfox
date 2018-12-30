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


    querySubject( pred ){

	var result = [];

	var keys = Object.keys( this.bySubject.nodes );

	keys.forEach( k => {

	    if( pred( k ) ){

		var triple = {};
		triple[ k ] = this.triples[ k ];

		result.push( triple );
	    }

	} );

	return result;
    }

    queryRelation( pred ){

	var result = [];

	var keys = Object.keys( this.byRelation.nodes );

	keys.forEach( k => {

	    if( pred( k ) ){

		var triple = {};
		triple[ k ] = this.byRelation.nodes[ k ];

		result.push( triple );
	    }

	} );

	return result;
    }


    queryObject( pred ){

	var result = [];

	var keys = Object.keys( this.byObject.nodes );

	keys.forEach( k => {

	    if( pred( k ) ){

		var triple = {};
		triple[ k ] = this.byObject.nodes[ k ];

		result.push( triple );
	    }

	} );

	return result;
    }


    constructor(){

	this.triples = {};

	this.bySubject = new TripleTree();
	this.byRelation = new TripleTree();
	this.byObject = new TripleTree();
    }
}

