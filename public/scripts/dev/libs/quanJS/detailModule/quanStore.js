var QuanStore = (function($,validator,quanGlobal){
	return function QuanStore(config){
		var me  = this;
		this.model = new config.model();
		
		this.records = [];
		this.averrage = function(field){
			var sum = 0;
			var len = this.records.length;
			var itemsLength = 0;
			for(var i=0 ; i<len;i++){
				var num = this.records[i][field];
				if(!isNaN(num)){
					sum += num;
					itemsLength++;
				}	
			}
			return sum/itemsLength;
		};
		
		this.getAt = function(index){
			return quanGlobal.clone(this.records[index]);
		};
		
		this.getCount = function(){
			return this.records.length;
		};
		
		this.getData = function(){
			return quanGlobal.clone(this.records);
		};
		
		this.getFields = function(){
			var fields = [];
			for(var el in this.model.fields){
				fields.push(el);
			}
			return fields;
		} ;
		
		this.getById = function(id){
			var records = this.getData();
			var len = records.length;
			for(var i=0;i<len;i++){
				if(records[i].id == id){
					return records[i];
				}
			};
			return null;
		};
		
		this.load = function(callback){
			this.model.load(function(datas){
				me.records = quanGlobal.clone(datas);
				if(callback && 'function' == typeof callback)
					callback(datas);
			});
		};
		
		this.save = function(callBack){
			this.model.save(this.records,callBack);
		};
		
		
		
		this.remove = function(records){
			records = [].concat(records);//records可能只有一条记录
			for(var i=0;i<records.length;i++){
				for(var j=0;j<this.records.length;j++){
					if(quanGlobal.compare(this.records[j] , records[i])){
						 this.records.splice(j,1);
						continue;
					}
				}
			}
		};
		
		
		
		this.removeAll = function(){
			this.records = [];
		};
		
		this.removeAt = function(index){
			this.records = this.records.slice(index,1);
		};
			
		this.add = function(records){
			this.records = this.records || [];
			this.records = this.records.concat(records);
		};
		
		this.init = function(){
		};
		
	};
})(window.$||window.jQuery,new Validator(),quanGlobal);
