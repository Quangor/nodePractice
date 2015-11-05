var QuanStore = (function($,validator,quanGlobal){
	return function QuanStore(config){
		var me  = this;
		this.model = new config.model();
		this.pageSize = config.pageSize || 0;
		this.currentPageIndex = 0;
		this.records = [];
		this.currentFilter = config.filter || "";
		var doc = document;
 		
 		(function registEvent(){
 			
 			var tableName = me.model.method;
 			me.eventType = {
		    	addEventType : tableName+'add',
		    	loadEventType : tableName+'load',
		    	removeEventType : tableName + 'remove',
		    	updateEventType : tableName + 'update',
		    	refreshEventType : tableName + 'refresh',
		    	dataChangeEventType : tableName + "change",
 			};
 			me.events = {
 				addEvent : doc.createEvent('Events'),
		    	loadEvent : doc.createEvent('Events'),
		    	removeEvent : doc.createEvent('Events'),
		    	updateEvent : doc.createEvent('Events'),
		    	updateEvent : doc.createEvent('Events'),
		    	refreshEvent : doc.createEvent('Events'),
		    	dataChangeEvent : doc.createEvent('Events')
 			};
 			me.events.addEvent.initEvent(me.eventType.addEventType);
 			me.events.loadEvent.initEvent(me.eventType.loadEventType);
 			me.events.removeEvent.initEvent(me.eventType.removeEventType);
 			me.events.updateEvent.initEvent(me.eventType.updateEventType);
 			me.events.refreshEvent.initEvent(me.eventType.refreshEventType);
 			me.events.dataChangeEvent.initEvent(me.eventType.dataChangeEventType);	
 		})();
 		
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
		
		this.indexof = function(record){
			for(var i =0 ; i<this.records.length;i++){
				if(quanGlobal.compare(this.records[i],record)){
					return i;
				}
			}
			return null;
		};
		
		this.doLoad = function(filters,callback){
			this.model.load(function(datas){
				if(callback && 'function' == typeof callback)
					callback(datas);
			},filters);
		};
		
		this.load = function(callback){
			var filters = this.queryFilterCollector({
				limit : this.pageSize,
				skip : this.records.length
			});
			if(this.pageSize){
				this.doLoad(filters,callback);	
			}else{
				this.doLoad({
					conditions : this.currentFilter,
				},function(datas){
					me.records = datas;
					me.events.dataChangeEvent.data = datas;
					me.events.loadChangeEvent.data = datas;
					document.dispatchEvent(me.events.dataChangeEvent);
					document.dispatchEvent(me.events.loadChangeEvent);
					if(callback && 'function' == typeof callback)
						callback(datas);
				});	
			}
		};
		
		this.loadNextPage = function(callback){
			var currentLength = this.records.length;
			var pageLength = currentLength/	this.pageSize;
			var skip = this.records.length;
			var filters = this.queryFilterCollector({
				limit : this.pageSize,
				skip : skip
			});
			this.doLoad(filters,function(datas){
				me.pushNewData(skip,datas);
				if(callback && 'function' == typeof callback)
					callback(datas);
			});
		};
		
		
		
		this.loadPageAt = function(index,callback){
			//this.currentPageIndex = index;
			var currentLength = this.records.length;
			var pageLength = currentLength/	this.pageSize;
			var skip = (index-1)*this.pageSize;
			var filters = this.queryFilterCollector({
				limit : this.pageSize,
				skip : skip
			});
			if(index>pageLength){
				this.doLoad(filters,function(datas){
					me.pushNewData(skip,datas);
					if(callback && 'function' == typeof callback)
						callback(datas);
				});
			}else{
				var records = this.getAt(index);
				if(callback && 'function' == typeof callback){
					callback(records);
				}
			}		
		};
		
		this.pushNewData = function(skip,datas){
			for(var i = 0;i<datas.length;i++){
					me.records[i+skip] = datas[i];
			}
			me.events.dataChangeEvent.data = me.records;
			document.dispatchEvent(me.events.dataChangeEvent);
		};
		
		this.prevPage = function(){
			if(this.currentPageIndex>0){
				this.currentPageIndex--;
			}else{
				this.currentPageIndex = 0;
			}
			return this.getAt(this.currentPageIndex);
		};
		
		this.nextPage = function(callback){
			var currentLength = this.records.length;
			var pageLength = currentLength/	this.pageSize;
			if(this.currentPageIndex >= pageLength){
				this.loadNextPage(callback);
			}else{
				this.currentPageIndex++;
				return this.getAt(this.currentPageIndex);
			}
		};
		
		this.getItemsLength = function(callback){
			this.queryBy(this.currentFilter,callback);
		};
		
		this.queryBy = function(filters,callback){
			this.currentFilter = filters;
			var filters = this.queryFilterCollector({
				limit : this.pageSize,
				skip : this.records.length
			});
			this.doLoad(filters,function(datas){
				if(callback && 'function' == typeof callback)
					callback(datas);
			});
		};
		
		this.queryAll = function(callback){
			this.doLoad({
				conditions : "",
			},function(datas){
				if(callback && 'function' == typeof callback)
					callback(datas);
			});
		};
		
		this.queryAllBy = function(filters,callback){
			this.currentFilter = filters;
			this.doLoad({
				conditions : this.currentFilter,
			},function(datas){
				if(callback && 'function' == typeof callback)
					callback(datas);
			});
		};
		
		this.queryFilterCollector = function(args){
			var filters = {};
			args = args|| {};
			filters.conditions = this.currentFilter;
			if((config && config.limit) || args.limit){
				filters.limit = args.limit || config.limit || "";
			}
			
			if((config && config.skip) || args.skip){
				filters.skip = args.skip || config.skip || "";
			}
			
			if((config && config.descending) || args.descending){
				filters.descending = args.descending ? this.model.fields[args.descending].mapping :  this.model.fields[config.descending].mapping || "";
			}
			if((config && config.ascending) || args.ascending){
				filters.ascending = args.ascending ? this.model.fields[args.ascending].mapping : this.model.fields[config.ascending].mapping;
			}
			return filters;
		};
		
		this.save = function(callback){
			this.model.save(this.records,callback);
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
