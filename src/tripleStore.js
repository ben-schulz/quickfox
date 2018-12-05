class TripleStore{

    addTriple( t ){

	if( !this.triples[ t.subject ] ){

	    this.triples[ t.subject ] = {}
	}

	this.triples[ t.subject ][ t.relation ] = t.object;
    }

    toJson(){

	return JSON.stringify( this.triples );
    }

    constructor(){

	this.triples = {};
    }
}

