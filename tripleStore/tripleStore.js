var tripleStore = {};

(function (){

    this.triples = [];

    this.isReference = function(word){
	return function(triple)
	{
	    return triple.obj == word ||
		triple.subj == word ||
		triple.pred == word
	};
    };

    this.add = function(triple){
	this.triples.push(triple);
    };

    this.references = function(word){
	return this.triples.filter(this.isReference(word));
    };

}).apply(tripleStore);

if('undefined' != typeof(module)){
    module.exports = tripleStore;
}

