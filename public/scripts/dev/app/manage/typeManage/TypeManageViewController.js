var TypeManageViewController = (function(Grid,viewmodel,formComponents){
	return function TypeManageViewController(){
		this.viewmodel = new viewmodel();
		this.quesionTypeGrid = new Grid("questiontypeGrid");
		this.quesionTypeGridStore = "";
		
		this.setQuesionTypeGridDockButton = function(){
			
		};
		
		this.quesionTypeGridInit = function(){
			
		};
		
		this.girdSetOperations = function(){
			
		};
		
		this.addForm = function(){
			var form = 	formComponents.formMaker({
			  id : "test",
		  	  store : this.viewmodel.getStore("questionType"),
		      cls : 'test',
		      style : '',
		  	  widgets : [{
		  	   	type : 'input',
		  	   	inputType : 'text',
		  		label : 'test',
		  		placeholder : 'test',
		  		id : 'testa',
		  		name : 'testa',
		  		cls : 'testa',
		  		events : {
		  			click : function(){
		  				alert('testa');
		  			}//callback
			 	}
			 },{
			 		type : 'select',
			  	   	store : this.viewmodel.getStore("questionType"),
			  		label : 'test',
			  		name : 'testb',
			  		valueField : 'id',
			  		textField : 'name',
			  		cls : 'testa',
			  		events : {
			  			click : function(){
			  				alert('testa');
			  			}//callback
				 	}
			 }]
		   });
		   formComponents.render(form,"#questionTypeGridWrapper");
		};
	};
})(Grid,TypeManageViewModel,formComponents);