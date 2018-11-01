
var newWord = document.getElementById("newWord");
var mainText = document.getElementById("mainText");

document.getElementById("addWord")
    .addEventListener("click", function(event){

	var lexeme = new Lexeme( newWord.value );
	document.body.appendChild( lexeme.render() );

    });

var floatingDiv = document.getElementById("floating");
document.addEventListener("click", function(event){

    console.info(event);

    floatingDiv.style.position = "absolute";
    floatingDiv.style.left = event.pageX + "px";
    floatingDiv.style.top = event.pageY + "px";

    floatingDiv.style.backgroundColor = "#1abb00";
    floatingDiv.style.zAxis = "999";
});
