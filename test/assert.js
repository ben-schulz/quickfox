class AssertionError extends Error{

    constructor( msg ){

	super( msg );
    }
}

var assert = (function(){

    return {

	"isTrue": function(expr, failMsg){

	    if ( expr ){
		return;
	    }

	    throw new AssertionError( failMsg );
	},

	"isFalse": function(expr, failMsg){

	    if ( !expr ){
		return;
	    }

	    throw new AssertionError( failMsg );
	},

	"areEquivalent": function(val1, val2, failmsg){

	    if ( val1 == val2 ){
		return;
	    }

	    throw new AssertionError( failmsg );
	},

	"areIdentical": function(val1, val2, failmsg){

	    if ( val1 === val2 ){
		return;
	    }

	    throw new AssertionError( failmsg );
	}

    };

})();
