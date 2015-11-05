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
			viewcontroller.addForm();
			/*viewcontroller.quesionTypeGrid.setDockButton([{
				text : "添加",
				type: "button",
				events :{
				  click : me.addQuestionType
				}
			},{
				text : "编辑",
				type: "button",
				events :{
				  click : me.addQuestionType
				}
			},{
				text : "删除",
				type: "button",
				events :{
				  click : me.deleteQuestionType
				}
			}]);
			viewcontroller.girdSetOperations([{
				text:"删除",
				type: "button",
				events : {
					
				}
			}]);
			viewcontroller.quesionTypeGrid.setCheckBox();
			viewcontroller.quesionTypeGrid.setRowCounter();
			viewcontroller.quesionTypeGrid.setRowOperation([{
				text:"删除",
				type: "button",
				events :{
				  click : me.deleteIndexRow
				}
			},{
				text:"编辑",
				type: "button",
				events :{
				  click : me.editIndexRow
				}
			}]);
			viewcontroller.quesionTypeGrid.setRowTheme([{
				name : "类型名",
				fieldName : "name"
			},{
				name : "时间",
				fieldName : "time"
			}]);
			viewcontroller.quesionTypeGrid.setStore(viewcontroller.viewmodel.getStore("questionType"));
			viewcontroller.quesionTypeGrid.setPageSize(3);*/
			//viewcontroller.quesionTypeGrid.render("#questionTypeGridWrapper");
		};
		
	};
})(TypeManageViewController,TypeManageViewModel,Time);
var typeManageController = new TypeManageController();
typeManageController.init();
