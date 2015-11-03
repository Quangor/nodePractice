var TypeManageViewModel = (function(QuanViewModel,QuestionTypeModel){
	return function TypeManageViewModel(){
		this.stores = {
			questionType : {
				model : QuestionTypeModel
			} 
		};
		QuanViewModel.call(this);
	};
})(QuanViewModel,QuestionTypeModel);
