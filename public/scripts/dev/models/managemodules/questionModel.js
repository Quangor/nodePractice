var Question = function(){
	BaseModel.call(this);
	this.fields = {
		id :{
			type : 'integer',
			mapping : 'id',
			validator : ['presence']
		},
		quession_content : {
			type : 'string',
			length : 500,
			mapping : 'quession_content',
			validators : ['length','presence']
		},
		answer_type : {
			type : 'string',
			length :50,
			mapping : 'answer_type',
			validators : ['length','presence']
		},
		answerA : {
			type : 'string',
			length : 500,
			mapping : 'answerA',
			validators : ['length','presence']
		},
		answerB : {
			type : 'string',
			length : 500,
			mapping : 'answerB',
			validators : ['length','presence']
		},
		answerC : {
			type : 'string',
			length : 500,
			mapping : 'answerC',
			validators : ['length','presence']
		},
		answerD : {
			type : 'string',
			length : 500,
			mapping : 'answerD',
			validators : ['length','presence']
		},
		quession_type :{
			type : 'foreign',
			association : {
				model : quessiontype,
				type : 'hasone',
				associationKey : 'id'
			}
		}
	};
};