var chars = [

    "h","e","l","l","o", " ", "w","o","r","l","d"
];

var textLayer = document.getElementById( "textlayer" );
var tooltipLayer = document.getElementById( "tooltiplayer" );

var newLine = function( text ){

    var line = document.createElement( "div" );

    text.forEach( c => {

	var box = new CharBox( c );
	line.append( box.element );
    } );

    line.style.margin = 0;
    line.style.padding = 0;

    return line;
};

var line1 = newLine( chars );
var line2 = newLine( chars );

textLayer.appendChild( line1 );
textLayer.appendChild( line2 );

var tooltip = document.createElement( "div" );
tooltip.style.background = "orange";
tooltip.style.height = "20px";
tooltip.style.width = "20px";
tooltip.style.position = "absolute";

// use column number to left position the tooltip
var charWidth = 1;
var colpos = 11;
var scaleFactor = 0.7;

tooltip.style.left = ( scaleFactor * colpos * charWidth ) + "ch";

// use line number to top-position the tooltip
var charHeight = 2;
var linepos = 1;
tooltip.style.top = ( linepos * charHeight ) + "ch";

tooltipLayer.appendChild( tooltip );
