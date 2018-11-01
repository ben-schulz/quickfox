class Lexeme{

    constructor(text){

	this.text = text;
    }

    render(){

	var displayText = document.createTextNode(this.text);
	var textSpan = document.createElement("span");

	textSpan.className = "lexeme";
	textSpan.value = this.text;

	textSpan.appendChild(displayText);

	textSpan.addEventListener("click", function(event){

	    event.target.classList.toggle("relationForming");
	});

	return textSpan;
    }
}
