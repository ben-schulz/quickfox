var assert = require('assert');
var expect = require('chai').expect;

var readerCore = require('../../reader/core.js');
var tripleStore = require('../../tripleStore/tripleStore.js');

describe('The tripleStore,', function() {

    describe('given a word,', function() {
	var inputText = 'The quick fox jumps over the lazy brown dog.';


	it('marks the word as referenced if it is the subject of one triple', function() {
	    tripleStore.triples[0] = {subj: 'fox', obj: '', pred: ''};
	    expect(tripleStore.references('fox')).not.to.be.empty;
	});
    });
});
