class Tooltip{

    get childNodes(){

	return this.element.childNodes;
    }

    addItems( ...items ){

	this.element.childNodes.forEach( n => {

	    n.remove();
	} );

	this.lines = [];

	items.forEach( x => {

	    this.lines.push( x );
	} );

	this.render();
    }

    render(){

	var width = 0;
	this.lines.forEach( l => {

	    var line = document.createElement( "div" );

	    var linePixels = this.pixelsPerChar * l.length;
	    if( width < linePixels ){
		width = linePixels
	    }

	    line.appendChild( 
		document.createTextNode( l ) );

	    this.element.appendChild( line );
	} );

	this.element.style.width = width + "px";
    }

    show( event ){

	this.element.style.display = "block";

	this.clientX = event.clientX;
	this.clientY = event.clientY;

	this.element.style.left = this.clientX + "px";
	this.element.style.top = this.clientY + "px";
    }


    hide( event ){

	this.element.style.display = "none";
    }


    constructor(){

	this.lines = [];

	this.pixelsPerChar = 7;

	this.elementType = "div";
	this.element = document.createElement(
	    this.elementType );

	this.element.classList.add( "tooltip" );

	this.element.style.display = "none";
	this.element.style.position = "absolute";

	this.element.addEventListener( "showtooltip", event => {

	    this.show( event.detail );
	} );

	this.element.addEventListener( "hidetooltip", event => {

	    this.hide();
	} );


    }
}
