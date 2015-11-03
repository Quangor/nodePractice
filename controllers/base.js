var globalNamespace = require('../namespace/GlobalNameSpace');
var BaseController = function(){
	this.formatTime = function(results,tiemType){
		for(var i=0,len = results.length;i<len;i++){
			if(results[i]&& results[i].time){
				results[i].time = globalNamespace.timeFormat['get' + tiemType](results[i].time);
			}
		};
		return results;
	};
};

module.exports = BaseController;