var mysqlConnection = require('./mysqlConnection');
var BaseDBOperation =function(){
	var me = this;
	
	this.selectField = "";
	this.limitCount = 0;
	this.skipCount = 0;
	this.likeStr = "";
	this.orderStr = "";
	this.currentModel = {};
	this.conditions  = "";
	
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
	
	this.baseOp = function(sql,callBack){
		mysqlConnection.query(sql,function(err, results){
			callBack(err, results);
		});
	};
	
	this.conditionsCollector = function(){
		
		if(this.likeStr){
			if(this.conditions){
				this.conditions += " and " + this.likeStr;
			}else{
				this.conditions =  this.likeStr;
			}
		}
		return this.conditions;
	};
	
	this.equalTo = function(field,value,logic){
		logic = logic || "and";
		value = formatString(value);
		var currentCondition = " " + field + " = " + value + " ";
		this.conditions = refreshconditions(this.conditions,logic,currentCondition);
		
	};
	
	this.notEqualTo = function(field,value,logic){
		logic = logic || "and";
		value = formatString(value);
		var currentCondition = " " + field + " != " + value + " ";
		this.conditions = refreshconditions(this.conditions,logic,currentCondition);
	};
	
	this.lessThan = function(field,value,logic){
		logic = logic || "and";
		value = formatString(value);
		var currentCondition = " " + field + " < " + value + " ";
		this.conditions = refreshconditions(this.conditions,logic,currentCondition);
	};
	
	this.moreThan = function(field,value,logic){
		logic = logic || "and";
		value = formatString(value);
		var currentCondition = " " + field + " > " + value + " ";
		this.conditions = refreshconditions(this.conditions,logic,currentCondition);
	};
	
	this.notLessThan = function(field,value,logic){
		logic = logic || "and";
		value = formatString(value);
		var currentCondition = " " + field + " >= " + value + " ";
		this.conditions = refreshconditions(this.conditions,logic,currentCondition);
	};
	
	this.notMoreThan = function(field,value,logic){
		logic = logic || "and";
		value = formatString(value);
		var currentCondition = " " + field + " <= " + value + " ";
		this.conditions = refreshconditions(this.conditions,logic,currentCondition);
	};
	
	this.between = function(field,v1,v2,logic){
		logic = logic || "and";
		v1 = formatString(v1);
		v2 = formatString(v2);
		var currentCondition = " " + field + " < " + v2 + " and " + field + " > " +v1;
		this.conditions = refreshconditions(this.conditions,logic,currentCondition);
	};
	
	
	this.like = function(field , charList){
		this.likeStr = field + " like " + "'%" + charList + "%'";
	};
	
	this.likeStartAs = function(field , charList){
		this.likeStr = field + " like " + "'" + charList + "%'";
	};
	
	this.likeEndWidth = function(field , charList){
		this.likeStr = field + " like " + "'%" + charList + "'";
	};
	
	this.in = function(field,valueArray,logic){
		logic = logic || 'and';
		valueArray = [].concat(valueArray);	
		var valueSet = "";
		for(var i =0;i<valueArray.length;i++){
			valueSet += " " + formatString(valueArray[i]) + " ,";
		}
		valueSet = "(" + valueSet.slice(0,-1) + ")";
		var currentContion =  field + " IN " + valueSet;
		if(this.conditions){
			this.conditions += " " + logic + " " + currentContion;
		}else{
			this.conditions +=   currentContion;
		}
	};
	
	
	this.fieldsCollector = function(record){
		var fields = "";
		for(var element in record){
			fields += this.currentModel.fields[element].mapping + ',';
		}
		return   fields.slice(0,-1) ;
	};
	
	this.formatBataBaseSet = function(data,field){
		data = data||field.defaultValue||'';
		if('string' == field.type || 'text' == field.type){
			return "'" + data + "'";
		}else if('date' == field.type){
			return new Date(data).getTime();
		}else{
			return  data ;
		}
	};
	
	this.dataBaseInsertSetCollector = function(record){
		var set = "";
		for(var element in record){//浅度操作，如果record的数据中某个数据是一个对象则需要进一步完善；
			set += ' ' + this.formatBataBaseSet(record[element],this.currentModel.fields[element]) + " ,";
		}
		return  set.slice(0,-1) ;
	};
	
	this.dataBaseUpdateSetCollector = function(record){
		var set = '';
		for(var element in record){//浅度操作，如果record的数据中某个数据是一个对象则需要进一步完善；
			if(element != 'id'){
				set += " " + this.currentModel.fields[element].mapping + " = " + this.formatBataBaseSet(record[element],this.currentModel.fields[element]) + " ,";
			}
				
		}
		return  set.slice(0,-1) ;
	};
};

module.exports = BaseDBOperation;