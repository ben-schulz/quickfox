class TripleStore{

    addTriple( t ){

	if( !this.triples[ t.subject ] ){

	    this.triples[ t.subject ] = {};
	}

	if( !this.triples[ t.subject ][ t.relation ] ){

	    this.triples[ t.subject ][ t.relation ] = {};
	}

	this.triples[ t.subject ][ t.relation ][ t.object ] = t.object;
    }

    toJson(){

	return JSON.stringify( this.triples );
    }

    constructor(){

	this.triples = {};
    }
}

