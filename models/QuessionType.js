var BaseModel = require('../quan_modules/data/BaseModel.js');
var QuessionType = function(){
	BaseModel.call(this);
	var me = this;
	this.tableName = 'questiontype';
	this.modelName = 'questiontype';
	this.fields = {
		id :{
			type : 'integer',
			validator : ['presence']
		},
		name : {
			type : 'string',
			length : 300,
			validators : ['length','presence']
		},
		time : {
			type :'string',
			validators : ['date']
		}
	};
	
	this.datas = [];
	(function(){
		me.checkAbstract(me);
		me.setDefaultMapping();
	})();
};

module.exports = new QuessionType();
