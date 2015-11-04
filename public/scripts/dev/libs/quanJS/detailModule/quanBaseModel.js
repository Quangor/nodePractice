var quanBaseModel = (function($,Validator,quanAjax,quanGlobal){
	return 	function(){
		var me = this;
		var validator = new Validator();
		this.deleteMethod = this.method + "/delete";
		this.queryMethod = this.method + "/query";
		this.insertMethod = this.method + '/insert';
		this.updateMethod = this.method + "/update";
		this.datas = [];
		
		this.changeData = {
			deleteDataId : [],
			addDatas : [],
			updateDatas : []
		};
		
		this.emptyChangeData = function(){
			this.changeData.deleteDataId = [];
			this.changeData.addDatas = [];
			this.changeData.updateDatas = [];
		};
		
		this.checkAddData = function(datas){
			for(var i=datas.length-1;i>=0 ;i--){
				if(datas[i].id === undefined){
					this.changeData.addDatas.push(datas[i]);
					datas.splice(i,1);
				}
			}
		};
		
		this.checkChangeData = function(datas){
			this.checkAddData(datas);
			if(datas.length>0){
				this.checkUpdateAndDeleteData(datas);	
			}
			
		};
		
		this.checkUpdateAndDeleteData = function(datas){
			for(var j =0;j<this.datas.length;j++){
				var isExist = false;
				var currentId = this.datas[j].id;
				for(var i=0;i<datas.length;i++){
					if(datas[i].id === undefined){
						this.changeData.addDatas.push(datas[i]);
						datas.splice(i,1);
						continue;
					}else if(datas[i].id && datas[i].id == currentId){
						isExist = true;
						if(!quanGlobal.compare(datas[i],this.datas[j])){
							this.changeData.updateDatas.push(datas[i]);	
							datas.splice(currentId,1);
						}
						continue;
					}
					
				}
				if(!isExist){
					this.changeData.deleteDataId.push(currentId);
				}
			}
		};
		
		this.setDefaultMapping = function(){
			var fields = this.fields; 
			for(var element in fields){
				if(!fields[element].mapping){
					fields[element].mapping = element;
				}
			}
		};
		
		this.dataMapping = function(datas,isPost){
			var records = [];
			for(var i=0,len =  datas.length;i<len;i++){
				var record = {};
				var fields = this.fields;
				for(var element in this.fields){
					
					var data = isPost ? datas[i][fields[element].element] : datas[i][fields[element].mapping];
					if(undefined === data){
						data = this.fields[element].defaultValue||(this.fields[element].type.toLowerCase() == "number" || "integer" || "float" || "double"?0:"");
					}
					if(isPost)
						record[this.fields[element].mapping] = data;
					else
						record[element] = data;
				}
				records.push(record);
			};
			return records;
		};
		
		this.save = function(datas,callBack){
			this.checkChangeData(datas);
			this.postChangeData(callBack);
			this.datas = quanGlobal.clone(datas);
		};
		
		this.load = function(callback,filter){
			filter = filter || "";
			$.post(this.queryMethod,filter,function(response){
				me.datas = quanGlobal.clone(response.datas);
				callback(response.datas);
			});
		};
		
		this.getValidation = function(){
			return validator.doValidate(this.this.datas);
		};
		
		this.getAssociationData = function(){
				
		};
		
		this.responseMapping = function(callBack,response){
			if(callback && 'function' == typeof callback){
				if(response.datas){
					response.datas = me.dataMapping(response.datas,false);
					me.datas = response.datas;
					callback(response);
				}
			}
		};
		
		this.post = function(url,data,callback){
			if('string' != typeof data[data]){
				data.data =  JSON.stringify(data.data);
			}
				$.post(url,data,function(response){
					if(callback && 'function' == typeof callback){
						if(response.datas){
							response.datas = me.dataMapping(response.datas,false);
							me.datas = response.datas;
							callback(response);
						}
					}
				});
		};
		
		this.getDatas = function(){
			return cloneObject(this.datas);
		};
		
		
	
		
		this.postChangeData = function(callBack){
			if(this.changeData.deleteDataId.length>0){
				this.postDeleteChange(callBack);
			}
			if(this.changeData.addDatas.length>0){
				this.postInsertChange(callBack);
			}
			if(this.changeData.updateDatas.length>0){
				this.postUpdateChange(callBack);
			}
		};
		
		this.getNewRecord = function(){
			var obj = {};
			for(var el in this.fields){
				if(this.fields[el].defaultData){
					obj[el] = this.fields[el].defaultData;
				}else{
					obj[el] = "";
				}
			}
		};
		
		this.postInsertChange = function(callBack){
			this.insert(this.changeData.addDatas,callBack);
		};
		
		this.postDeleteChange = function(callback){
			this.delete(this.changeData.deleteDataId,callback);
		};
		
		this.postUpdateChange = function(callback){
			this.update(this.changeData.updateDatas,callback);
		};
		
		this.insert = function(data,callback){
			this.post(this.insertMethod,{
				data : data
			},function(response){
				me.changeData.addDatas = [];
				if(callback && 'function' == typeof callback){
					callback(response);
				}
			});
		};
		
		this.delete = function(data,allback){
			this.post(this.deleteMethod,{
				data : data
			},function(response){
				me.changeData.deleteDataId = [];
				if(callback && 'function' == typeof callback){
					callback(response);
				}
			});
		};
		
		this.update = function(data,allback){
			this.post(this.updateMethod,{
				data : data
			},function(response){
				me.changeData.updateDatas = [];
				if(callback && 'function' == typeof callback){
					callback(response);
				}
			});
		};
	};
})(window.$||window.jQuery,Validator,quanAjax,quanGlobal);
