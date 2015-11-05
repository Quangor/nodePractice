var QuestionQueryForm = (function(baseform,model){
	return function questionQuery(){
		baseform.call(this);
		this.fields = {
			questiontype : {
				type : 'string',
				name:"questionType",
				validators : ['presence']
			},
			startTime : {
				type : 'date',
				name : "startTime",
				format:"yyyy-mm-dd",
			},
			endTime : {
				type : 'date',
				name : "endTime",
				format:"yyyy-mm-dd",
			}
		};
		this.method = "questionQuery";
		this.store = store;
	};
})(quan.baseform);
