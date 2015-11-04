var BaseDBOperation = require('./BaseDBOperation');

var Update = function(model){
	var me = this;
	BaseDBOperation.call(this);
	
	this.updateFieldsSql = "";
	
	this.init = function(){
		this.currentModel = model;
		this.tableName = model.tableName;
		this.datas = model.datas;
		
	};
	
	this.batchUpdateById = function(callback){
		var sql = "UPDATE " + this.tableName + " SET ";
		var ids = [];
		var records = this.datas;
		var length  = records.length;
		for(var i=0;i< length;i++){
			ids.push(records[i].id);
		}
		var idMappingFieldsName = this.currentModel.fields['id'].mapping;
		this.in(idMappingFieldsName,ids);
		var updatesql = "";
		for(field in this.currentModel.fields){
			var mapping = this.currentModel.fields[field].mapping;
			updatesql += ' ' + mapping + " = CASE " + idMappingFieldsName;
			for(var i=0;i< length;i++){
				updatesql += " when "  + records[i].id + " then " + this.formatBataBaseSet(records[i][field],this.currentModel.fields[field]) + " ";
			}
			updatesql += ' END,';
		}
		updatesql = updatesql.slice(0,-1);
		sql += updatesql + ' WHERE ' + this.conditionsCollector();
		this.baseOp(sql,callback);
	};
	
	this.insertOnRecordById = function(callback){
		var idMappingFieldsName = this.currentModel.fields['id'].mapping;
		var record = this.datas[0];
		this.equalTo(idMappingFieldsName,record.id);
		this.doupdate(record,callback);
	};
	
	this.updateById = function(callback){
		if(this.datas.length>1 ){
			this.batchUpdateById(callback);
		}else{
			this.insertOnRecordById(callback);
		}
	};
	
	this.setUpdateFieldsSql = function(field,value){
		var fieldObj = this.currentModel.fields[field];
		value = this.formatBataBaseSet(value,fieldObj);
		this.updateFieldsSql += fieldObj[field].mapping + " = " + value + ' , ';
	};
	
	this.update = function(callback){
		var conditions = this.conditionsCollector( );
		var sql = "update " + this.tableName + " set " + this.updateFieldsSql + " where "+ conditions;
		this.baseOp(sql,callBack);
	};
	
	this.doupdate = function(record,callBack){
		var conditions = this.conditionsCollector( );
		var sql = "UPDATE "+ this.tableName + " SET " +  this.dataBaseUpdateSetCollector(record) + ' WHERE ' + conditions;
		this.baseOp(sql,callBack);
	};
	
	this.init();
};

module.exports = Update;