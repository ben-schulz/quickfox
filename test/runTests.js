var TestOutcome = {

    "Passed": 0,
    "Failed": 1,
    "NotRun": 2
};

class TestCase{

    constructor( name, action ){

	this.name = name;
	this.action = action;

	this.outcome = TestOutcome.NotRun;
	this.error = null;
    }

    run(){

	try{

	    this.action();
	    this.outcome = TestOutcome.Passed;
	}
	catch( error ){

	    this.outcome = TestOutcome.Failed;
	    this.error = error;
	}
    }
}

var globalResults = [ ];

var testCount = 0;
var passCount = 0;
var failCount = 0;

var verify = function( name, demonstration ){

    var testCase = new TestCase(name, demonstration);
    testCase.run();

    ++testCount;

    if ( TestOutcome.Passed == testCase.outcome ){

	++passCount;
    }

    else if ( TestOutcome.Failed == testCase.outcome ){

	++failCount;
    }

    globalResults.push( testCase );
};


(function(){
    var modules = [
	"../src/lexeme.js",
	"./lexeme.js",

	"../src/keyboard.js",
	"./keyboard.js"
    ];

    var loadFile = function(filePath){
	
	var scriptElement = document.createElement("script");
	scriptElement.setAttribute("type", "text/javascript");
	scriptElement.setAttribute("src", filePath);

	document.body.appendChild(scriptElement);
    };

    for ( var ix = 0; ix < modules.length; ++ix ){

	loadFile( modules[ix] );
    }

})();


window.addEventListener("load", function(){

    var makeFailure = function( test ){

	var failItem = document.createElement( "div" );

	var failText = document.createTextNode( test.name );

	failItem.appendChild( failText );
	failDiv.appendChild( failItem );
    };

    var failDiv = document.getElementById( "failureList" );

    globalResults.forEach( function( test ){

	if ( TestOutcome.Failed === test.outcome ){

	    makeFailure( test );

	    failureList.style.display = "block";
	}
    });

    var passSpan = document.getElementById("passCount");
    passSpan.appendChild(
	document.createTextNode( passCount.toString() )
    );

    var failSpan = document.getElementById("failCount");
    failSpan.appendChild(
	document.createTextNode( failCount.toString() )
    );

    if( 0 == failCount ){

	document.querySelectorAll(".failSection")
	    .forEach( function( el ){

		el.style.display = "none";
	    });
    }
});

setInterval(function(){ window.location.reload();  }, 2000);
