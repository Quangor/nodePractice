var Validator = (function(){
	var valide = {
		
		integer : function(data){
			var datastr = data + "";
			var decimal = datastr.split(".")[1];
			if(isNaN(data)){
				return false;
			}
			if(decimal && decimal.length>0){
				return false;
			}
			return true;
		},
		
		string : function(data){
			return 'string' == typeof data;
		},
		
		number : function(data){
			return !isNaN(data);
		},
		
		phone : function(data){
			return /[0-9]{11}/.test(data);
		},
		
		email :function(data){
			return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(data);
		},
		
		length : function(data,length){
			datastr = data + "";
			return datastr.length == length;
		},
		
		min : function(data,min){
			if('string' == typeof data){
				data = parseFloat(data);
			}
			if(isNaN(data)){
				return false;
			}
			
			return data > min;
		},
		
		max : function(data,min){
			if('string' == typeof data){
				data = parseFloat(data);
			}
			if(isNaN(data)){
				return false;
			}
			
			return data < max;
		},
		
		presence : function(data){
			return "" == data;
		},
		
		format : function(data,format){
			return format.test(data);
		},
	};
	
	
	return function Validator(){
		
		var me = this;
		
		this.doValidate = function(obj,data){
			var isDirty = false;
			var result = {};
			var fields = obj.fields;
			var result = {};
			for(var element in fields){
				var validators = fields[element].validators;
				result[element] = {};
				if(validators){
					var validData = data[element];
					for(var i=0,len = validators.length;i<len;i++){
						var el = validators[i];
						result[element][el] = false;
						if(!valide[el]){
							isDirty = true;
							result[element][el] = true; 
						}
					}
				}
			}
			return {
				validateresult : result,
				isDirty : isDirty
			};
		};
	};
})();
