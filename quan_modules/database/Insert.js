var BaseDBOperation = require('./BaseDBOperation');

var Insert = function(model,callback){
	BaseDBOperation.call(this);
	var me = this;
	
	this.init = function(){
		this.currentModel = model;
		this.tableName = model.tableName;
		this.datas = model.datas;
		if(this.datas.length>1 ){
			this.batchInsert(callback);
		}else{
			this.insertOnRecord(callback);
		}
		
	};
	
	this.fieldsCollector = function(record){
		var fields = "";
		for(var element in record){
			if('id' !== element)
				fields += this.currentModel.fields[element].mapping + ',';
		}
		return   fields.slice(0,-1) ;
	};
	
	this.insertOnRecord = function(callBack){
		var record = this.datas[0];
		var sql = "INSERT INTO "+ this.tableName + " (" + this.fieldsCollector(record) + ") values (" + this.dataBaseInsertSetCollector(record) +")";
		this.baseOp(sql,callBack);
	};
	
	this.batchInsert = function(callback){
		var records = this.datas;
		var set = "";
		for(var i =0;i<records.length;i++){
			set += ' ( '+ this.dataBaseInsertSetCollector(records[i]) + '),';
		}
		set = set.slice(0,-1);
		var sql = "INSERT INTO "+ this.tableName + " (" + this.fieldsCollector(this.currentModel.fields) + ") values " + set +"";
		this.baseOp(sql,callback);
	};
	
	this.init();
};

module.exports = Insert;