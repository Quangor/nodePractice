var BaseDBOperation = require('./BaseDBOperation');

var Delete = function(model){
	this.currentModel = model;
	this.tableName = model.tableName;
	BaseDBOperation.call(this);
	
	var me = this;
	
	this.sqlCollector = function(){
		var sql = "";
		sql += "DELETE FROM " + this.tableName ;
		var conditions = this.conditionsCollector( );
		
		if(conditions){
			sql += " where " + conditions;
		}
		return sql;
	};
	
	this.delete = function(callback){//conditions//需要进一步完善
		var sql = this.sqlCollector();
		this.dodelete(sql,callback);
	};
	
	this.deleteAll = function(callback){
		var sql = "TRUNCATE TABLE "+ this.tableName;
		this.dodelete(sql,callback);
	};
	
	this.dodelete = function(sql,callback){
		this.baseOp(sql,callback||function(err,results){
			console.log(err);
			console.log(results);
		});
	};
	
};

module.exports = Delete;