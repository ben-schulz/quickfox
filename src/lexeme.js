var LexemeState = {

    "Unfocused": "unfocused",

    "Clicked": "clickhighlight",

    "SubjectFocus": "subjectfocus",
    "ObjectFocus": "objectfocus",
    "RelationFocus": "relationfocus",

    "HighlightedStates": [

	this.Clicked,
	this.SubjectFocus,
	this.ObjectFocus,
	this.RelationFocus
    ]
};

class Lexeme{

    constructor(text){

	this.text = text;
	this.viewState = LexemeState.Unfocused;
    }

    render(){

	var displayText = document.createTextNode(this.text);
	var textSpan = document.createElement("span");

	textSpan.className = "lexeme";
	textSpan.value = this.text;

	textSpan.appendChild(displayText);

	textSpan.addEventListener("click", event => {

	    textSpan.classList.toggle( LexemeState.Clicked  );
	});


	textSpan.addEventListener(
	    "clearHighlights", event => {

		LexemeState.HighlightedStates
		    .forEach( state => {

			textSpan.classList.remove( state );
		    });
						       
		textSpan.classList.add( LexemeState.Unfocused );
	    });
	
	return textSpan;
    }
}
