var QuanViewModel = (function(QuanStore){
	return function QuanViewModel(){
		this.storesInstance = {};
		this.init = function(){
			for(var store in this.stores){
				var sto = new QuanStore(this.stores[store]);
				this.storesInstance[store]  = sto;
			}
		};
		this.init();
		this.getStore = function(storeName){
			return this.storesInstance[storeName];
		};
	};
})(QuanStore);
