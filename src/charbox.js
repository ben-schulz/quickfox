class CharBox{

    constructor( c ){

	this.text = c;

	this.elementType = "span";
	this.element = document.createElement( this.elementType );

	this.element.appendChild(
	    document.createTextNode( c ) );

	this.element.classList.add( "charbox" );
    }
}
