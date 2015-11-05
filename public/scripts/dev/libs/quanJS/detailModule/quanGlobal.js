var quanGlobal = {
	compareObject : function(record1,record2){
		for(var el in record1){
			if('object' == typeof record1[el]){
				if('object' != typeof record2[el]){
					return false;
				}else{
					if(!this.compareObject(record1[el],record2[el])){
						return false;
					}
				}
			}else{
				if(record1[el] != record2[el]){
					return false;
				}
			}
		}
		return true;
	},
	compare : function(a,b){
		if('object' == typeof a){
			if('object' != typeof b){
				return false;
			}else{
				return this.compareObject(a,b);
			}
		}
		return a === b;
	},
	clone  : function(object){
		var newObj = {};
	 	if(object instanceof Array){
	 		newObj = [];
	 	}
		if("object" == typeof object){
			for(var el in object ){
				if("object" == typeof object[el]){
					newObj[el] = this.clone(object[el]);
				}else{
					newObj[el] = object[el];
				}
			}
		}else{
			newObj = object;
		}
		
		return newObj;
	}
};
