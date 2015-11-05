var Interface = require('../Interface');
var db = require('../database');
var config = require('../../config/globalConfig');
var validator = require('./Validator');
var moment = require('moment');

var BaseModel = function(){
	var me = this;
	
	Interface.call(this);
	
	this.abstractMembers = [{
		memberName : 'datas',
		memberType : 'object'
	},{
		memberName : 'fields',
		memberType : 'object'
	},{
		memberName : 'tableName',
		memberType : 'string'
	},{
		memberName : 'modelName',
		memberType : 'string'
	}];
	
	
	
	this.databaseName = config.database.databaseName;
	
	this.dataMapping = function(datas){
		var fields = this.fields;
		var records = {};
		for(var i = 0,len = datas.length;i<len;i++){
			var record = {};
			for(var element in fields){
				var data = datas[i][fields[element].mapping||element];
				if(undefined === data){
					var errorMsg =  this.tableName + '返回的数据不包含' + fields[element].mapping  + '或' + element + '字段'; 
					console.log(errorMsg);
					throw error(errorMsg);
				}
				record[element.name] = data;
			}
		}
	};
	
	this.setDefaultMapping = function(){
		var fields = this.fields; 
		for(var element in fields){
			if(!fields[element].mapping){
				fields[element].mapping = element;
			}
		}
	};
	
	this.save = function(callBack){
		var records = [].concat(this.datas);
		for(var i =0,length = records.length; i <length; i++){
			if(records[i].id){
				var record = records[i];
				this.get(records[i].id,function(err,results){
					if(!err){
						if(results.length>0){
							me.update(record, ' id='+record.id+' ', callBack || function(){
								console.log('update result : ');
								console.log(err);
								console.log(results);
							});
						}else{
							me.insertOnRecord(record,callBack||function(err,results){
								console.log('insert result : ');
								console.log(err);
								console.log(results);
							});
						}
					}
				});
				
			}else{
				this.insertOnRecord(records[i],callBack||function(err,results){
					console.log('insert result : ');
					console.log(err);
					console.log(results);
				});
			}
		}
	};
	
	this.delete = function(){
		
	};
	
	this.insert = function(callback){
		db.insert(this,callback);
	};
	
	this.update = function(){
		
	};
	
	this.getAll = function(){
		db.baseOp('SELECT * FROM '+this.tableName,callBack || function(err ,result){
			console.log('insert result : ');
			console.log(err);
			console.log(results);
		});
	};
	
	this.getAt = function(id,callback){
		var pk = this.fields['id'].mapping;
		db.baseOp('select * from ' + this.tableName + ' where ' + pk +' = ' + id,callback || function(err ,result){
			console.log('insert result : ');
			console.log(err);
			console.log(results);
		});
	};
	
	this.getDeleteObj = function(){
		return new db.delete(this);
	};
	
	this.getJoinQueryObj = function(foreignTableName,foreignKey){
		return new db.joinQuery(this.fields,this.tableName,foreignTableName,foreignKey);
		
	};
	
	
	this.getSelectObj = function(){
		return new db.query(this.tableName);
	};
	
	
	this.getUpdateObj = function(){
		return new db.update(this);
	};
	
	this.setData = function(datas){
		this.datas = [].concat(datas);
	};
	
	
	this.opSqlSetament = function(sql,callBack){
		db.baseOp(sql,callBack||function(){});
	};
};
module.exports = BaseModel;
