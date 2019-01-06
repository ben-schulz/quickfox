var tooltip = new Tooltip();

tooltip.addItems( [

    "ok neat",
    "wow : awesome : great"
] );

tooltip.element.style.position = "absolute";

document.body.appendChild( tooltip.element );

var button1 = document.getElementById( "button1" );
var button2 = document.getElementById( "button2" );

button1.style.position = "absolute";
button1.style.left = 255 + "px";
button1.style.top = 127 + "px";

button2.style.position = "absolute";
button2.style.left = 128 + "px";
button2.style.top = 256 + "px";

var button1_rect = button1.getBoundingClientRect();
var button2_rect = button2.getBoundingClientRect();

button1.addEventListener( "click", event => {

    tooltip.show( {
	"clientX": button1_rect.right,
	"clientY": button1_rect.bottom
    } );
} );

button2.addEventListener( "click", event => {

    tooltip.show( {
	"clientX": button2_rect.right,
	"clientY": button2_rect.bottom
    } );
} );
