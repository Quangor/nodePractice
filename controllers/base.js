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
	
	this.collectFilter = function(queryObj,filters){
		if(filters && filters.limit){
			queryObj.limit(filters.limit);
		}
		if(filters && filters.skip){
			queryObj.skip(filters.skip);
		}
		if(filters && filters.descending){
			queryObj.descending(filters.descending);
		}
		if(filters && filters.ascending){
			queryObj.skip(filters.ascending);
		}
		return queryObj;
	};
};

module.exports = BaseController;