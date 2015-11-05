var Validator = function(){
	var me = this;
	
	this.doValidate = function(obj,data){
		var isDirty = false;
		var result = {};
		for(var element in data){
			result[element] = {};
			for(var type in obj.fields[element].validation) {
				result[element][type] = true;
				if(!me[type](data[element] ,obj.fields[element].validation)){
					isDirty = true;
					result[element][type] = false;
				}
			}
		}
		return {
			validateresult : result,
			isDirty : isDirty
		};
	};
	
	this.length = function(data,validate){
		if('number' == typeof data){
			return data.toString().length == validate.length;
		}
		if('boolean' == typeof data){
			return false;
		}
		return data.length == length;
	};
	
	this.string = function(data){
		if('string' != typeof data){
			return false;
		}
	};
	
	this.type = function(data,validation){
		if(data && validation.type == typeof data)
			return true;
		return false;
	};
	
	this.reg = function(data,validation){
		return validation.reg.test(data);
	};
	
	this.maxLength = function(data,validation){
		return data.toString().length <= validation.maxLength;
	};
	
	this.minLength = function(data,validation){
		return data.toString().length >= validation.minLength;
	};
	
};

module.exports = Validator;