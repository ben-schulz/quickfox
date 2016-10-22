var assert = require('assert');
var expect = require('chai').expect;

var readerCore = require('../../reader/core.js');
var tripleStore = require('../../tripleStore/tripleStore.js');

describe('The reader core,', function() {

    describe('given input text and a triplestore,', function() {

	var inputText = 'The quick fox jumps over the lazy brown dog.';
	var testTriple = {subj: 'fox', obj: '', pred: ''};
	tripleStore.add(testTriple);

	it('tags words that are objects in the triplestore', function() {

	    var result = readerCore.annotate(inputText, tripleStore);

	    expect(result.lexemes['fox']).to.exist;
	    expect(result.lexemes['fox'].triples).not.to.be.empty;
	});

	it('retains each word in the source text', function() {
	    var result = readerCore.annotate(inputText, tripleStore);

	    var separatorExpression = /[ \t\n\r,.]+/;
	    var inputTokens = inputText.split(separatorExpression);

	    for(var ix = 0; ix < inputTokens.length; ++ix)
	    {
		var token = inputTokens[ix];
		expect(result.lexemes[token]).to.exist;
	    }
	});
    });
});
