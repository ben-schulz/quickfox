
var readerCore = {};

(function (){

    this.lex = function(text){
	var separatorExpression = /[ \t\n\r,.]+/;
	return text.split(separatorExpression);
    };

    this.annotate = function(text, tripleStore){
	var metaText = {};
	metaText.lexemes = {};

	var words = this.lex(text);

	for(var ix = 0; ix < words.length; ++ix)
	{
	    var references = tripleStore.references(words[ix]);

	    metaText.lexemes[words[ix]] = {};
	    metaText.lexemes[words[ix]].triples = references;
	}

	if(false)
	{
	    throw JSON.stringify(metaText.lexemes['fox']);
	}

	return metaText;
    };


}).apply(readerCore);


module.exports = readerCore
