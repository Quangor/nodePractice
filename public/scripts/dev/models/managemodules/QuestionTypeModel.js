var QuestionTypeModel = (function(BaseModel){
	return function(){
		BaseModel.call(this);
		this.method = "typemanage";
		this.fields = {
			id :{
				type : 'integer',
			},
			name : {
				type : 'string',
				length : 500,
				validators : ['length','presence']
			},
			time : {
				type : "date",
				validators : ['date','presence']
			}
		};
		this.init();
	};
})(BaseModel);
