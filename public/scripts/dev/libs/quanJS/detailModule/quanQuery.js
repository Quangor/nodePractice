var DOMQuery = (function(){
	
	var idReg = /^#[\w]+$/;
	var classNameReg = /^\.[\w]+$/;
	var tagNameReg = /^[\w-]+$/;
	//var combinationSelector = /^(#|\.|[\w])[\w]/;
	
	var getElementById = function(selector,context){
		context = context || document;
		var id = selector.replace('#','');
		return context.getElementById(id);
	};
	
	var getElementsByTageName = function(selector,context){
		context = context || document;
		return context.getElementsByTagName(selector);
	};
	
	var getElementsByClassName = function(selector,context){
		context = context || document;
		var className = selector.replace('.','');
		return context.getElementsByClassName(className);
	};
	
	var createElement = function(tagName,innerHTML){
		var newElement = document.createElement(tagName);
		if(innerHTML){
			 newElement.innerHTML = innerHTML;
		}
		return newElement;
	};
	
	var getElement = function(selector,context){
		
		if(/\w\>\w/.test(selector) || selector.split(' ').length>1){
			return context.querySelector(selector);
		}
		
		
		if(idReg.test(selector)){
			return getElementById(selector,context);
		}
		if(classNameReg.test(selector)){
			return getElementsByClassName(selector,context);
		}
		if(tagNameReg.test(selector)){
			return getElementsByTageName(selector,context);
		}
		
		
	};
	
	var getQueryResult = function(selector,context){
		var queryResult;
		//判断传进来的是选择器还是html对象
		if('string' == typeof selector){
			queryResult = getElement(selector,context);
		}
		else if(selector instanceof HTMLElement){
			queryResult = selector;
		}
		else{
			throw Error('selector must be  string or instance of HTMLElement');
		}
		return queryResult;
	};
	
	var addQueryResultToElements = function(queryResult){
		var Query = function(){};
		var elements = new Query();
		if(queryResult instanceof HTMLCollection || queryResult instanceof Array){
			for(var i=0;i<queryResult.length;i++){
				elements[i] = queryResult[i];
			}
			elements.length = queryResult.length; 
			return elements;
		}else if(queryResult instanceof HTMLElement){
			elements[0] = queryResult;
			elements.length = 1;
			return elements;
		}else{
			throw Error('queryResult is error , please check the selector and the context');
		}
		
	};
	
	var hasClassName = function(node,className){
		var classNames = node.className.split(" ");
		for(var i = 0,len = classNames.length;i<len;i++){
			if(classNames[i] == className){
				return true;
			}
		}
		return false;
	};
	
	var matchSelector = function(selector,HTMLElement){
		if(idReg.test(selector)){
			selector = selector.replace('#','');
			if(HTMLElement.id == selector){
				return true;
			}
		}
		
		if(tagNameReg.test(selector)){
			var nodeName = HTMLElement.nodeName;
			nodeNames = nodeName.split('-');
			var newNodeName = '';
			if(nodeNames.length >0){
				for(var i =0;i<nodeNames.length;i++){
					newNodeName += nodeNames[i];
				}
			}
			if(newNodeName.toLowerCase() == selector.toLowerCase()){
				return true;
			}
		}
		
		if(classNameReg.test(selector)){
			selector = selector.replace('.','');
			return hasClassName(HTMLElement,selector);
		}
		return false;
	};
	
	var getChilds = function(selector,context){
		context = context ||document;
		var childNdoes = context.childNodes;
		var newChilds = [];
		for(var i=0;i<childNdoes.length;i++){
			if(matchSelector(selector,childNdoes[i])){
				newChilds.push(childNdoes[i]);
			}
		}
		return newChilds;
	};
	
	var makeQueryObject = function(){
		
	};
	
	var query = function(selector,context){//当selector  是多个选择器的组合时还需要进一步完善
		context = context || document;
		var queryResult = getQueryResult(selector,context);
		var elements = addQueryResultToElements(queryResult);
		elements.selector = selector;
		elements.context = context;
		elements.__proto__ = {
			_toggle : function(){
				
			},
			
			traversalAllElements :  function(callback){
				for(var i=0,len = this.length;i<len;i++){
					var index = i;
					callback(this,index);
				}
			},
			
			addClass : function(className){
				this.traversalAllElements(function(currentQueryObject,index){
					var currentClassName = currentQueryObject[index].className;
					if(!hasClassName(currentQueryObject[index],className)){
						currentClassName += " " + className;
						currentQueryObject[index].className = currentClassName;
					}
				});
			},
			
			append : function(){
				
			},
			
			appendTo : function(){
				
			},
			
			attr : function(property,value){
				if(value){
					this.traversalAllElements(function(currentQueryObject,index){
						if(currentQueryObject[index].property){
							currentQueryObject[index].property = value;
						}else{
							throw Error(property + " is not exist at " + this.selector + " " + index + " HTMLElement");
						}
					});
				}else{
					if(this[0].property){
						return this[0].property;
					}else{
						throw Error(property + " is not exist at " + this.selector );
					}
				}
			},
			
			bind : function(){
				
			},
			
			blur : function(){
				
			},
			
			change : function(){
				
			},
			
			children : function(selector){
				var childs = getChilds(selector,this[0]);
				var elements = addQueryResultToElements(childs);
				elements.selector = selector;
				elements.context = this.context;
				elements.__proto__ = this.__proto__;
				return elements;
			},
			
			click : function(){
				
			},
			
			clone : function(){
				
			},
			
			css : function(styleProperty,value){
				if("string" == typeof styleProperty && value){
					this.traversalAllElements(function(currentQueryObject,index){
						currentQueryObject[index].style[styleProperty] = value;
					});
				}else if(styleProperty instanceof Object && !value){
					this.traversalAllElements(function(currentQueryObject,index){
						for(var element in styleProperty){
							currentQueryObject[index].style[element] = styleProperty[element];
						}
					});
				}
			},
			
			data : function(dataProperty,value){
				if(!value){
					dataPropertyStr = (""+dataProperty).toLowerCase();
					var dataset = this[0].dataset;
					return dataset[dataPropertyStr];
				}else{
					this.setData(dataProperty,value);
				}
				
			},
			
			dblclick : function(){
				
			},
			
			each : function(){
				
			},
			
			eq : function(index){
				var currentElements = this[index];
				var elements ;
				if(currentElements){
					elements = addQueryResultToElements(currentElements);
					elements.selector = this.selector;
					elements.context = this.context;
					elements.index = index;
					elements.__proto__ = this.__proto__;
					return elements;
				}else{
					throw Error("index element is not exist");
				}
			},
			
			focus : function(){
				
			},
			
			find : function(selector){
				
			},
			
			get : function(selector){
				
			},
			
			hasClass : function(className){
				return hasClassName(this[0],className);
			},
			
			height : function(){
				return this[0].clientHeight;
			},
			
			hide : function(){
				this.traversalAllElements(function(currentQueryObject,index){
					currentQueryObject[index].style.display = "none !important";
				});
			},
			
			hover : function(){
				
			},
			
			index : function(){
				
			},
			
			keydown : function(){
				
			},
			
			keypress : function(){
				
			},
			
			mousedown : function(){
				
			},
			
			mouseenter : function(){
				
			},
			
			mousemove : function(){
				
			},
			
			mouseout : function(){
				
			},
			
			mouseup : function(){
				
			},
			
			next : function(){
				
			},
			
			parent : function(){
				
			},
			
			parents : function(){
				
			},
			
			nextAll : function(){
				
			},
			
			on : function(myevent,callback){
				this.traversalAllElements(function(currentQueryObject,index){
					currentQueryObject[index].addEventListener(myevent,function(event){
						var evt = event || window.event;
						callback(event,index);
					});
				});
			},
			
			prev : function(){
				
			},
			
			prevAll : function(){
				
			},
			
			remove : function(){
				
			},
			
			resize : function(){
				
			},
			
			removeClass : function(className){//需要改进
				this.traversalAllElements(function(currentQueryObject,index){
					if(hasClassName(currentQueryObject[index],className)){
						var newClassName = currentQueryObject[index].className.replace(className,"");
						currentQueryObject[index].className = newClassName;
					}
				});
			},
			
			setData : function(dataProperty,value){
				dataPropertyStr = (""+dataProperty).toLowerCase();
				this.traversalAllElements(function(currentQueryObject,index){
					currentQueryObject[index].dataset[dataPropertyStr] = value;
				});
			},
			
			scroll : function(){
				
			},
			
			show : function(){
				this.traversalAllElements(function(currentQueryObject,index){
					currentQueryObject[index].style.display = "block !important";
				});
			},
			
			text : function(text){
				this[0].innerText = text;
			},
			
			val : function(){
			
			},
			
			width : function(){
				
			}
		};
		return elements;
	};
	
	window.$ = query;
	return query;
	
})();

