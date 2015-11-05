var formComponents = (function(formWidgetFactory){
	/*
	 *
	 *@parameter config looks like {
	 * 	 id : "",
	 * 	 store : '',
	 *   cls : '',
	 *   style : '',
	 * 	 formModel : '' ,
	 * 	 widgets : [{
	 * 	   	type : 'text',
	 *      text : '',
	 * 		label : '',
	 * 		placeholder : '',
	 * 		id : '',
	 * 		name : '',
	 * 		textField : '',
	 * 		valueField : '',
	 * 		cls : '',
	 * 		style : '',
	 * 		events : [{
	 * 			click : function(){}//callback
	 * 		}]
	 *   }]
	 * } 
	 * 
	 * 
	 * */
	var formConfig = function(formComponent,config){
		if(config && config.id){
			formComponent.form.id = config.id;
		}
		if(config && config.cls){
			formComponent.form.className += config.cls;
		}
		if(config && config.style){
			formComponent.form.style += config.style;
		}
		if(config && config.store){
			formComponent.store = config.store;
		}else if(config && config.model){
			formComponent.model = config.model;
		}
		return formComponent;
	};
	  	
	var formMaker = function formMaker(config){
		var formComponent = {};
		wrapper = document.createElement("div");
		wrapper.className = "form-wrapper";
		formComponent.wrapper = wrapper;
		var form = document.createElement("form");
		form.className = "formUI";
		formComponent.form = form;
		formComponent = formConfig(formComponent , config);
		var ul = document.createElement("ul");
		if(config.widgets){
			var widgets = config.widgets;
			for(var i = 0,len = config.widgets.length;i<len;i++){
				var widgetconfig = widgets[i];
				var li = document.createElement('li');
				if(widgetconfig.label){
					var label = document.createElement('label');
					if(widgetconfig.id){
						label.for = widgetconfig.id;
					}
					
					label.innerText = widgetconfig.label;
					li.appendChild(label);
				}
				var widget = formWidgetFactory(widgetconfig);
				if( "select" == widgetconfig.type ){
					var icon = document.createElement('i');
					icon.className = "selectIcon";
					li.appendChild(icon);
				}
				li.appendChild(widget);
				ul.appendChild(li);
			}
			formComponent.form.appendChild(ul);
		}
		formComponent.wrapper.appendChild(formComponent.form); 
		return formComponent;
	};
	
	
	return {
		render : function(formComponent , selector){
			if('string' == typeof selector){
				selector = document.querySelector(selector);
			}
			selector.appendChild(formComponent.wrapper);
		},
		formMaker : formMaker
	};
	
})(formWidgetFactory);
