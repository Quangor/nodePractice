var TypeManageViewController = (function(Grid,viewmodel,formComponents){
	return function TypeManageViewController(){
		var me = this;
		this.viewmodel = new viewmodel();
		//this.quesionTypeGrid = new Grid("questiontypeGrid");
		this.quesionTypeGridStore = "";
		
		this.setQuesionTypeGridDockButton = function(){
			
		};
		
		this.quesionTypeGridInit = function(){
			
		};
		
		this.girdSetOperations = function(){
			
		};
		
		
		this.addQuestionType = function(){
			
		};
		
		this.addQuestionType = function(){
			
		};
		
		this.deleteQuestionType = function(){
			
		};
		
		this.addGrid = function(){
			var grid = new Grid({
				id : "",
				cls : "",
				style : "",
				form :{
				  id : "test",
			  	  store : this.viewmodel.getStore("questionType"),
			      cls : 'test',
			      style : '',
			  	  widgets : [{
			  	   		type : 'input',
			  	  	 	inputType : 'text',
			  			label : '类型名:',
			  			placeholder : '填入类型名',
			  			id : 'name',
			  			name : 'name',
				  },{
				 		type : 'input',
			  	  	 	inputType : 'date',
				  		label : '开始时间:',
				  		name : 'startTime',
				  		id : 'startTime',
				  },{
				 		type : 'input',
			  	  	 	inputType : 'date',
				  		label : '结束时间:',
				  		name : 'endTime',
				  		id : 'endTime'
				  },{
				 		type : 'button',
				 		text : '查询',
				 		events : {
				 		click : function(e){
				 			if ( e && e.preventDefault ) 
							   e.preventDefault(); 
							else 
							   window.event.returnValue = false; 
							
				 		}
				 	}
				 }]
			   },
			   dockItems :[{
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
				}],
				items :[{
					
				}]
			});
			grid.build();
			grid.render("#questionTypeGridWrapper");
			/*var form = 	formComponents.formMaker({
			  
		   });
		   formComponents.render(form,"#questionTypeGridWrapper");*/
		};
	};
})(Grid,TypeManageViewModel,formComponents);