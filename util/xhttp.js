var xhttpUtil = {};

(function (){
    this.getPlainText = function(uri, callback){
	var client = new XMLHttpRequest();

	client.responseType = 'text';
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

}).apply(xhttpUtil);
