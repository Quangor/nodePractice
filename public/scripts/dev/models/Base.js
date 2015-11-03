var BaseModel = (function(quanBaseModel){
	return function BaseModel(){
		var me = this;
		quanBaseModel.call(this);
		
		this.setMethod = function(){
			this.deleteMethod = this.method + "/delete";
			this.queryMethod = this.method + "/query";
			this.insertMethod = this.method + '/insert';
			this.updateMethod = this.method + "/update";
		};
		
		this.init = function(){
			this.setMethod();
			this.setDefaultMapping();
		};
	};
})(quanBaseModel);
