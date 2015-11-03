var QuestionController = (function(ViewController,QuestionQueryForm){
	var viewCtroller = new ViewController();
	var Controller = function(){
		
		var me = this;
		this.queryQuerstion = function(){
			var queryForm = new QuestionQueryForm();
			queryForm.post();
		};
		
		this.addQuestion = function(){
			
		};
		
		this.deleteQuession = function(){
			
		};
		
		this.updateQuession = function(){
			
		};
		
		
		
		this.init = function(){
			$(document).on("click","#querysubmit",function(){
				me.queryQuerstion();
			});
		};
	};
	return Controller;
})(QuessionManageViewController,QuestionQueryForm);
var questionController = new QuestionController();
questionController.init();
