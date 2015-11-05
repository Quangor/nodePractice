var TypeManageViewModel = (function(QuanViewModel,QuestionTypeModel){
	return function TypeManageViewModel(){
		this.stores = {
			questionType : {
				model : QuestionTypeModel,
				pageSize : 10,
				descending : 'time'
			} 
		};
		QuanViewModel.call(this);
	};
})(QuanViewModel,QuestionTypeModel);
