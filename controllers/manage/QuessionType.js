var quessionTypeModel = require('../../models/QuessionType');
var globalNamespace = require('../../namespace/GlobalNameSpace');
var BaseController = require('../base');
var QuesionType = function(){
	var me  = this;
	BaseController.call(this);
	this.model = quessionTypeModel;
	
	this.queryType = function(req,res){
		var name = req.param('name');
		var starttime = req.param('starttime');
		var endtime = req.param('endtime');
		var queryObject = this.model.getSelectObj();
		if(name){
			queryObject.like("name",name);
		}
		
		if(starttime){
			queryObject.notLessThan("time",starttime);
		}
		
		if(endtime){
			queryObject.notMoreThan("time",endtime);
		}
		queryObject.descending("time");
		queryObject.find(function(err,results){
			results = me.formatTime(results,'FullTime');
			globalNamespace.dbOpSuccess(res,err,results);
		});
	};
	
	
		
	this.removeType = function(ids){
		ids = [].concat(ids);
		var deleteObj = this.mogel.getDeleteObj();
		var idMapping = this.model.fileds['id'].mapping;
		for(var i=0;i<ids.length;i++){
			deleteObj.equalTo(mapping,ids[i],'or');
		}
		deleteObj.delte(function(err,results){
			globalNamespace.dbOpSuccess(res,err,results);
		});
	};
	
	this.updateType = function(req,res){
		var datas = globalNamespace.parseRequestData(req);
		this.model.setData(datas);
		var updateObj = this.model.getUpdateObj();
		updateObj.updateById(function(err,results){
			globalNamespace.dbOpSuccess(res,err,results);
		});
	};
	
	this.insertType = function(req,res){
		
		var datas  = globalNamespace.parseRequestData(req);
		this.model.setData(datas);
		this.model.insert(function(err,results){
			globalNamespace.dbOpSuccess(res,err,results);
		});
	};
};

module.exports = new QuesionType();
