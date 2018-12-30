class TripleStore{

    static isReferent( token ){

	if( token ){

	    return true;
	}

	return false;
    }

    addTriple( t ){

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

	var keys = Object.keys( this.triples );

	keys.forEach( k => {

	    if( pred( k ) ){

		var triple = {};
		triple[ k ] = this.triples[ k ];

		result.push( triple );
	    }

	} );

	return result;
    }

    constructor(){

	this.triples = {};
    }
}

