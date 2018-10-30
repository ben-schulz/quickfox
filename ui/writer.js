
var writeArea = document.getElementById("mainText");

document.addEventListener("keydown", function(event){

    const key = event.key

    var newChar = document.createTextNode(key);
    console.info(key.length);

    if ( 1 == key.length ){

	writeArea.appendChild(newChar);
    }

    else if (" " == key){
	var spaceChar = document.createTextNode(" ");
	writeArea.appendChild(spaceChar);
    }

    else if ("Backspace" == key){

	var lastChar = writeArea.lastChild;

	if(lastChar){
	    writeArea.removeChild(writeArea.lastChild);
	}
    }

});
