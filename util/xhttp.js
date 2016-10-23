var xhttpUtil = {};

(function (){

    function getContentType(theType){

	return function(uri, callback){
	    var client = new XMLHttpRequest();

	    client.responseType = theType;
	    client.open('GET', uri, true);
	    client.onreadystatechange = function(){

		if('function' !== typeof(callback)){
		    return;
		}

		if(XMLHttpRequest.DONE === client.readyState){

		    if(200 === client.status){
			callback(client.responseText);
		    }
		}
	    };

	    client.send();
	};
    }

    this.getPlainText = getContentType('text');
    this.getJSON = getContentType('application/json');

}).apply(xhttpUtil);
