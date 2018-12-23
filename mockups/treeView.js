var obj = {

    "subject0": {

	"relation00":{
	    "object000":{},
	    "object001":{},
	    "object002":{},
	},
	"relation01":{
	    "object010":{},
	},
	"relation02":{
	    "object020":{},
	    "object021":{},

	},
    },

    "subject1": {

	"relation10":{
	},
	"relation11":{
	},
    },
};
var treeView = new TreeView( obj );

document.body.append( treeView.element );
