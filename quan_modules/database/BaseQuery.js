var BaseDBOperation = require('./BaseDBOperation');
var mysqlConnection = require('./mysqlConnection');
var BaseQuery = function(){
	BaseDBOperation.call(this);
	
	
	this.setSelectFields = function(fields){
		fields = [].concat(fields);
		var  selectField = "";
		for(var i =0,len = fields.length;i<len;i++){
			selectField += " " + fields[i] + " ,";
		};
		
		
		if(selectField){
			selectField = selectField.slice(0,-1);
		}
		this.selectField += selectField;
	};
	
	this.selectFieldsCollector = function(){
		return this.selectField ?  " " + this.selectField :  " *";
	};
	
	this.skip = function(count){
		this.skipCount = count;
	};
	
	this.limit = function(count){
		this.limitCount = count;
	};
	
	this.ascending = function(field){
		this.orderStr = "order by " + field + ' ASC';
	};
	
	this.descending = function(field){
		this.orderStr = "order by " + field + ' DESC';
	};
	
	
	this.find = function(callback){
		var sql = this.sqlCollector();
		mysqlConnection.query(sql,function(err, results){
			if(callback){
				callback(err, results);
			}
		});
	};
};


var JoinQuery = function(fields,tableName,foreignTableName,foreignKey){
	BaseQuery.call(this);
	var me = this;
	var thisTableName = tableName;
	var foreignTableName = foreignTableName;
	var sql = "select";
	
	this.jionStr = "";
	this.sqlCollector = function(){
		sql += this.selectFieldsCollector() +  " FROM "+ thisTableName  ;
		if(me.jionStr){
			sql += " " + me.jionStr;
		}
		
		if(me.orderStr){
			sql += " " + me.orderStr;
		}
		
		if(me.limitCount>0) {
			sql += " limit " + me.limitCount;
		}
		
		if(me.skipCount>0){
			sql += " offset " + me.skipCount;
		}
		
		
		return sql;
	};
	
	
	this.getJoinKey = function(){
		var associationKey = "";
		if(foreignKey && fields[foreignKey].association.model == foreignTableName){
			return {
					foreignKey :foreignKey,
					associationKey :fields[foreignKey].association.associationKey
				};
		}
		for(var element in fields){
			var currentElement = fields[element];
			if(currentElement.type == "foreign" && currentElement.association.model == foreignTableName){
				return {
					foreignKey :element,
					associationKey :currentElement.association.associationKey
				};
			}
		}
		return null;
	};
	
	var joinKey = this.getJoinKey();
	
	
	if(!joinKey){
		var errmsg = foreignTableName + "不是" + tableName + "的连接表";
		console.log(errmsg);
		throw Error(errmsg);
	}
	
	this.assembledJoinKey = function(){
		return foreignTableName + " ON " + thisTableName + "." + joinKey.foreignKey + " = " + foreignTableName + "." + joinKey.associationKey;
	};
	
	this.innerJoin = function(){
		me.jionStr =  " INNER JOIN " + this.assembledJoinKey();
	};
	
	this.leftJoin = function(){
		me.jionStr = " LEFT JOIN " + this.assembledJoinKey();
	};
	
	this.rightJoin = function(){
		me.jionStr = " RIGHT JOIN " + this.assembledJoinKey();
	};
	
	this.fullJoin = function(){
		me.jionStr = " FULL JOIN " + this.assembledJoinKey();
	};
};


var Query = function(tableName){
	var me = this;
	BaseQuery.call(this);
	var query = this;
	var sql = "select";
	this.conditions = "";
	
	//private:
	
	var formatString = function(value){
		if('string' == typeof value)
			return "'" + value + "'";
		return value;
	};
	
	var refreshconditions = function(conditions,logic,currentCondition){
		if(conditions){
			conditions += " " + logic + currentCondition;
		}else{
			conditions +=  currentCondition;
		}
		return conditions;
	};
	
	
	//public:
	
	this.sqlCollector = function(){
		sql += this.selectFieldsCollector() + " from "+ tableName ;
		var conditions = this.conditionsCollector( );
		
		if(conditions){
			sql += " where " + conditions;
		}
		if(me.orderStr){
			sql += " " + me.orderStr;
		}
		
		if(me.limitCount>0) {
			sql += " limit " + me.limitCount;
		}
		
		if(me.skipCount>0){
			sql += " offset " + me.skipCount;
		}
		
		
		return sql;
	};
	
	this.setSelectField = function(fields){
		if(fields instanceof Array){
			for(var i = 0,len =fields.length;i<len;i++){
				this.selectField += ' ' + fields[i] + ' ,';
			}
		}
		this.selectField += ' ' + field + ' ,';
	};
};

module.exports = {
	JoinQuery : JoinQuery,
	Query : Query
};
