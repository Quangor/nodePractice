var TypeManageController = (function(Viewcontroller,ViewModel,Time){
	return function TypeManageController(){
		var me  =this;
		
		var viewcontroller = new Viewcontroller();
		var viewModel = new ViewModel();
		
		this.reloadQuestionType = function(){
			
		};
		
		this.addQuestionType = function(){
			
		};
		
		this.editQuestionType = function(){
			
		};
		
		this.deleteQuestionType = function(){
			
		};
		
		this.deleteIndexRow = function(){
			
		};
		
		this.editIndexRow = function(){
			
		};
		
		this.init = function(){
			var store = viewModel.getStore("questionType");
			viewcontroller.addGrid();
		};
		
	};
})(TypeManageViewController,TypeManageViewModel,Time);
var typeManageController = new TypeManageController();
typeManageController.init();
