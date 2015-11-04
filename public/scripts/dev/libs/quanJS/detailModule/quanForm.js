var BaseForm = (function($,Validator,quanAjax){
	
	return function BaseForm (){
		this.baseUrl = globalConfig.BASEURL;
		var validator = new Validator();
		
		this.data = {};
		
		this.setName = function(){
			for(var el in this.fields){
				if(this.fields && this.fields[el] && !this.fields[el].name){
					this.fields[el].name = el;
				}
			}
		};
		
		this.collectData = function(){
			var data = {};
			for(var el in this.fields){
				var elVal = $("#" + this.fields[el].name).val() || "";
				data[el] = elVal;
			}
			this.data =  data;
		};
		
		this.query = function(postResponse,validateError){
			this.beforePost();
			quanAjax.loasStoreAfterValidate(postResponse,validateError);
		};
		
		/**
		 * @parameter postResponse is the function 	execute after post callback;  
		 * @parameter validateError is the function execute after fail to validate the form data;
		 * */
		this.beforePost = function(){
			this.setName();
			this.collectData();
			quanAjax.setPostConfig(this,this.data,this.method);
		};
		
		this.post = function(postResponse,validateError){
			this.beforePost();
			quanAjax.postAfterValidate(postResponse,validateError);
			/*if(this.validate(validateError)){
				this.dopost(postResponse);
			};*/
		};
	};
})(window.$||window.jQuery,Validator,quanAjax);
