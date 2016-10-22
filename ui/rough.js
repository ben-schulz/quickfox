var textDestinationNodeId = 'annotatedText';

var roughUI = {};

(function()
{
    var highlightReferences = function(text, metatext){
	
	var output = '';
	for(var token in metatext.lexemes)
	{
	    var nextToken = token;
	    if(metatext.lexemes[token].triples.length > 0)
	    {
		nextToken = '<b>' + nextToken + '</b>';
	    }
	    output += nextToken + ' ';
	}

	return output;
    };

    this.render = function()
    {
	var testTriple = {subj: 'fox', obj: '', pred: ''};
	tripleStore.add(testTriple);
	var originalText = 'the quick fox jumped';
	var metatext = readerCore.annotate(originalText, tripleStore);

	var readableOutput = highlightReferences(originalText, metatext);

	var destinationNode = document.getElementById(textDestinationNodeId);

	destinationNode.innerHTML = readableOutput;
    };

}).apply(roughUI);
