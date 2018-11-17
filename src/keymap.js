var KeyCode = {

    "Letter": s => {

	var singleAlpha = /[a-zA-Z]/;

	if( 1 == s.length && singleAlpha.test( s ) ){

	    return s;
	}

	return null;
    },

    "Numeral": s => {

	var singleNum = /[0-9]/;

	if( 1 == s.length && singleNum.test( s ) ){

	    return s;
	}

	return null;
    },

    "Escape": "Escape",
    "Backspace": "Backspace"
};
