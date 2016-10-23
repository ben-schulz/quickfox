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

    this.render = function(testFileUri)
    {
	var xhttpCallback = function(originalText){
	    
	    var testTriple = {subj: 'fox', obj: '', pred: ''};
	    tripleStore.add(testTriple);

	    var metatext = readerCore.annotate(originalText, tripleStore);

	    var readableOutput = highlightReferences(originalText, metatext);

	    textDestinationNode.innerHTML = readableOutput;
	};

	xhttpUtil.getPlainText(testFileUri, xhttpCallback);
    };

}).apply(roughUI);
