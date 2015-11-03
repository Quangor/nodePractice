var BaseModel = require('../quan_modules/data/BaseModel');
var User = require('./User');
var Game = function(){
	BaseModel.call(this);
	this.tableName = 'challenge';
	this.modelName = 'Game';
	this.fields = {
		id :{
			type : 'integer',
			mapping : 'id',
			validator : ['presence']
		},
		challenger : {
			type : 'foreign',
			association : {
				model : 'user',
				type : 'hasone',
				associationKey : 'id'
			}
		},
		challenged : {
			type : 'foreign',
			association : {
				model : 'user',
				type : 'hasone',
				associationKey : 'id'
			}
		},
		time : {
			type : 'date',
			mapping : 'time',
			validators : ['date','presence']
		},
		score : {
			type : 'integer',
			mapping : 'score',
			validators : ['presence']
		}
	};
	
	this.datas = [];
};

module.exports = Game;
