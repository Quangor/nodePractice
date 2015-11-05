var mysqlConnection = require('./mysqlConnection');
var Insert = require('./Insert');
var Update = require('./Update');
var Delete = require('./Delete');
var BaseQuery = require('./BaseQuery');
var Query = BaseQuery.Query;
var JoinQuery = BaseQuery.JoinQuery;


module.exports = {
	baseOp : function(sql,callBack){
		mysqlConnection.query(sql,function(err, results){
			callBack(err, results);
		});
	},
	
	deleteA : function(tableName , callback){
		new Delete().deleteAll(tableName , callback);
	},
	
	update : Update,
	
	insert : function(model,callback){
		 new Insert(model,callback);
	},
	
	
	
	joinQuery:JoinQuery,
	
	delete : Delete,
	
	query : Query 
};
