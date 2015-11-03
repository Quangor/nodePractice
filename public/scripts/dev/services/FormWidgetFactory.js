var formWidgetFactory = (function(){
	
	/**
	 * @parameter widgetConfig looks like :
	 * {
	 *		text:"showText",
	 *		type: "button",
	 *		events :{
	 *		  click : function(){
	 *		  	alert(this.innerText);
	 *		  }
	 *		}
	 *	}
	 **/
	
	var Widget = function(widgetConfig){
		this.widget = document.createElement("input");
		
		this.addEventListender = function(event,callback){
			if(this.widget.addEventListener){
				this.widget.addEventListener(event,callback,false);
			}else{
				event = "on"+event;
				this.widget.attachEvent(event,callback);
			}
		};
		
		this.listenEvent = function(){
			if(widgetConfig.events){
				var events = widgetConfig.events;
				for(var element in events){
					this.addEventListender(element,events[element]);
				}
			}
		};
		
		
		this._setCls = function(){
			if(widgetConfig.cls){
				this.widget.className = widgetConfig.cls;
			}
		};
		
		this._setDefaultValue = function(){
			if(widgetConfig.defaultValue){
				this.widget.value = widgetConfig.defaultValue;
			}
		};
		
		this._setId = function(){
			if(widgetConfig.id){
				this.widget.id = widgetConfig.id;
			}
		};
		
		this._setName = function(){
			if(widgetConfig.name){
				this.widget.id = widgetConfig.name;
			}
		};
		
		this._setStyle = function(){
			if(widgetConfig.style){
				var style = widgetConfig.style;
				for(var element in style){
					this.widget.style[element] = style[element];
				}
			}
		};
		
		this._setText = function(){
			if( widgetConfig.text){
				this.widget.innerText = widgetConfig.text;
			}
		};
		
		
	};
	
	var Button = function(widgetConfig){
		Widget.call(this,widgetConfig);
		this.widget = document.createElement("button");
		this.createWidget = function(){
			if(widgetConfig){
				this.listenEvent();
				this._setCls();
				this._setId();
				this._setText();
				this._setStyle();
			}
			return this.widget;
		};
	};
	
	var Input = function(widgetConfig){
		Widget.call(this,widgetConfig);
		
		this._setType = function(){
			if( widgetConfig.inputType){
				this.widget.type = widgetConfig.inputType;
			}
		};
		
		this.createWidget = function(){
			if(widgetConfig){
				this.listenEvent();
				this._setCls();
				this._setDefaultValue();
				this._setId();
				this._setName();
				this._setStyle();
				this._setType();
			}
			return this.widget;
		};
	};
	
	var Select = function(widgetConfig){
		Widget.call(this,widgetConfig);
		this.widget = document.createElement("select");
		
		this._setOptions = function(){
			if(widgetConfig.options){
				var opts = widgetConfig.options;
				for(var el in opts){
					var optionWidget = document.createElement("option");
					optionWidget.value = opts.value || opts.text || "";
					optionWidget.innerText =  opts.text || opts.value || "";
					this.widget.appendChild(optionWidget);
				}
			}
		};
		
		this.createWidget = function(){
			if(widgetConfig){
				this.listenEvent();
				this._setCls();
				this._setDefaultValue();
				this._setId();
				this._setName();
				this._setOptions();
				this._setType();
				this._setStyle();
			}
			return this.widget;
		};
	};
	
	var Textarea = function(){
		Widget.call(this,widgetConfig);
		this.widget = document.createElement("textarea");
		
		this.createWidget = function(){
			if(widgetConfig){
				this.listenEvent();
				this._setCls();
				this._setDefaultValue();
				this._setId();
				this._setName();
				this._setStyle();
			}
			return this.widget;
		};
	};
	
	var FactoryType = {
		button : Button,
		input : Input,
		select : Select,
		textarea : Textarea
	};
	
	return function(widgetConfig){
		var type = widgetConfig.type;
		var widget = new FactoryType[type](widgetConfig);
		return widget.createWidget();
	};
})();
