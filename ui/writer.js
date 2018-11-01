
const writeArea = document.getElementById("mainText");

document.addEventListener("keydown", function(event){

    const key = event.key;

    const newChar = document.createTextNode(key);

    if ( 1 == key.length ){

	writeArea.appendChild(newChar);
    }

    else if (" " == key){
	const spaceChar = document.createTextNode(" ");
	writeArea.appendChild(spaceChar);
    }

    else if ("Backspace" == key){

	const lastChar = writeArea.lastChild;

	if(lastChar){
	    writeArea.removeChild(writeArea.lastChild);
	}
    }

});
