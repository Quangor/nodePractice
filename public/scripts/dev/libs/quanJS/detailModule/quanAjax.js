var quanAjax = (function($,Validator){
	return new function Ajax(){
		validator = new  Validator();
		this.setPostConfig = function(modelObject,data,url){
			this.data = data;
			this.modelObject = modelObject;
			this.url = url;
		};
		
		this.validate = function(errorCallBack){
			var validateResult = validator.doValidate(this.modelObject, this.data);
			if(validateResult.isDirty){
				errorCallBack(validateResult.validateresult);
			}
			return !validateResult.isDirty;
		};
		
		/**
		 * @parameter postResponse is the function 	execute after post callback;  
		 * @parameter validateError is the function execute after fail to validate the form data;
		 * */
		this.postAfterValidate = function(postResponse,validateError){
			if(this.validate(validateError)){
				this.dopost(postResponse);
			};
		};
		
		this.loasStoreAfterValidate = function(postResponse,validateError,store){
			if(this.validate(validateError)){
				store.queryBy(this.data,postResponse);
			};
		};
		
		this.dopost = function(datapostResponse,url,data){
			this.post(ur||this.url,this.data,datapostResponse);
		};
		
		this.post = function(url,data,callback){
			$.post(url,data,function(response){
				if('string' == typeof response){
					response = JSON.parse(response);
				}
				if(callback && 'function' == typeof callback){
					callback(response);
				}
			});
		};
	};
})(window.$||window.jQuery,Validator);
