class TreeView{

    constructor( json, refs=[] ){

	this.refs = refs;
	this.children = [];
	
	this.elementType = "div";
	
	this.element = ( () => {

	    var el = document.createElement( this.elementType );

	    el.classList.add( "jsonTreeView" );

	    var openBrace = document.createTextNode( "{" );

	    if( 0 < refs.length ){
		var closeBrace = document.createTextNode( "}," );
	    }

	    else{
		var closeBrace = document.createTextNode( "}" );
	    }

	    if( 0 < refs.length ){

		var lastRef = refs[ refs.length - 1 ];
		el.append(
		    document.createTextNode( lastRef + ":" ) );
	    }

	    el.append( openBrace );

	    Object.keys( json ).forEach( k => {

		if( "object" === typeof json[ k ] ){
		    
		    refs.push( k );
		    var subtree = new TreeView( json[ k ], refs )
		    refs.pop()

		    this.children.push( subtree );

		    el.append( subtree.element );
		}

		else{

		    var valueDiv =
			document.createElement( this.elementType );

		    valueDiv.classList.add( "jsonTreeView" );

		    valueDiv.append(
			document.createTextNode(
			    json[ k ] + "," ) );

		    el.append( valueDiv );
		}
	    } );

	    el.append( closeBrace );

	    return el;
	})();
    }
}
