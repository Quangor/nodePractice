var formWidgetFactory = (function(){
	
	/**
	 * @parameter widgetConfig looks like :
	 * {
	 *		text:"showText",
	 *		type: "button",
	 * 		placeholder : '',
	 * 		id : "",
	 * 		cls : '',
	 * 		defaultValue : '',
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
				this.widget.className += widgetConfig.cls;
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
		
		this._setPlaceHolder = function(){
			if( widgetConfig.placeholder){
				this.widget.placeholder = widgetConfig.placeholder;
			}
		};
	};
	
	var Button = function(widgetConfig){
		Widget.call(this,widgetConfig);
		this.widget = document.createElement("a");
		this.widget.className = "btn";
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
				this._setPlaceHolder ();
			}
			return this.widget;
		};
	};
	
	var Select = function(widgetConfig){
		var me = this;
		Widget.call(this,widgetConfig);
		this.widget = document.createElement("select");
		
		this._setOptions = function(){
			if(widgetConfig.options){
				this.widget = this.addOptions(this.widget,widgetConfig.options);
			}else if(widgetConfig.store){
				this.setOptsByStore(widgetConfig);	
			}
		};
		
		this.setOptsByStore = function(widgetConfig){
			if(widgetConfig.store.fields && widgetConfig.store.datas){
				me.renderStoreDataAsOpations(widgetConfig.store.datas);
			}else{
				widgetConfig.store.queryAll(function(datas){
					me.renderStoreDataAsOpations(datas,widgetConfig);
				});
			}
				
		};
		
		this.renderStoreDataAsOpations = function(datas,widgetConfig){
			var opts = [];
			for(var i=0;i<datas.length;i++){
				var opt = {};
				opt.value = datas[i][widgetConfig.valueField] || "";
				opt.text = datas[i][widgetConfig.textField] || "";
				opts.push(opt);
			}
			me.widget = me.addOptions(me.widget,opts);
		};
		
		this.addOptions = function(widget,opts){
			for(var el in opts){
				var optionWidget = document.createElement("option");
				optionWidget.value = opts[el].value || opts[el].text || "";
				optionWidget.innerText = opts[el].text|| opts[el].value || "";
				widget.appendChild(optionWidget);
			}
			return widget;
		};
		
		this.createWidget = function(){
			if(widgetConfig){
				this.listenEvent();
				this._setCls();
				this._setDefaultValue();
				this._setId();
				this._setName();
				this._setOptions();
				this._setStyle();
			}
			return this.widget;
		};
	};
	
	var Combobox = function(){
		Widget.call(this,widgetConfig);
		
		this.createWidget = function(){
			
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
