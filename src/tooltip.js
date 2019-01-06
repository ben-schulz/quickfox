class Tooltip{

    get childNodes(){

	return this.element.childNodes;
    }

    addItems( items ){

	items.forEach( x => {

	    this.lines.push( x );
	} );

	this.render();
    }

    render(){

	this.lines.forEach( l => {

	    var line = document.createElement( "div" );

	    line.appendChild( 
		document.createTextNode( l ) );

	    this.element.appendChild( line );
	} );
    }

    show( event ){

	this.element.style.display = "block";

	this.clientX = event.clientX;
	this.clientY = event.clientY;

	this.element.style.left = this.clientX + "px";
	this.element.style.top = this.clientY + "px";
    }


    constructor(){

	this.lines = [];

	this.elementType = "div";
	this.element = document.createElement(
	    this.elementType );

	this.element.classList.add( "tooltip" );

	this.element.style.display = "none";

	this.element.addEventListener( "showtooltip", event => {

	    this.show( event.detail );
	} );

    }
}
