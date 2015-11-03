var BaseModel = require('../quan_modules/data/BaseModel.js');

var User = function(){
	BaseModel.call(this);
	var me = this;	
	this.tableName = 'user';
	this.modelName = 'user';
	
	this.fields = {
		id :{
			type : 'integer',
			validator : ['presence']
		},
		name : {
			type : 'string',
			length : 300,
			non : true,
			validators : ['length','presence']
		},
		avatar : {
			type : 'string',
			length : 300,
			non : true,
			validators : ['length','presence']
		}
	};
	
	this.datas = [];
	
	(function(){
		me.checkAbstract(me);
		me.setDefaultMapping();
	})();
};
module.exports = User;
