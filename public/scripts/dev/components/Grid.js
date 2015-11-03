var Grid = (function(_,formWidgetFactory){
	
	var PagePlugin = function(){
		this.template = '<nav>'+
			'<a class="showFirstPage"></a>'+
			'<a class="showPrePage"></a>'+
			'<div>第&nbsp;&nbsp;<input type="text" class="currentPage" value=<%= currentPage %> />&nbsp;&nbsp;共&nbsp;&nbsp;<%= totalPage %>&nbsp;&nbsp;页&nbsp;&nbsp;</div>'+
			'<a class="showNextPage"></a>'+
			'<a class="showLastPage"></a>'+
			'<a class="reflesh"></a>'+
		'</nav>'+
		'<div>第&nbsp;&nbsp;<span>&nbsp;&nbsp;<%= currentFirstNumber %>&nbsp;&nbsp;</span>&nbsp;&nbsp;-&nbsp;&nbsp;<span><%= currentLastNumber %></span>&nbsp;&nbsp;条&nbsp;&nbsp;共&nbsp;&nbsp;<span>&nbsp;&nbsp;<%= itemsNumber %>&nbsp;&nbsp;</span>&nbsp;&nbsp;条</div>';
		this.parseTemplate = function(){
			var html = _.template(this.template)(this.pageConfig);
			return html;
		};
		
		this.setConfig = function(config){
			this.pageConfig = config;
		};
		
	};
	
	return function Grid(id,store){
		var me  = this;
		var pagePlugin = new PagePlugin();
		
		
		var resetAllCheckboxchecked = function(isChecked){
			var $checkBoxs = me.grid.find(".selectCurrentRow");
			for(var i=0;i<$checkBoxs.length;i++){
				$checkBoxs[i].checked = isChecked;
			}
		};
		
		this.grid = (function(id,_){
			var html = "<div class='manage-gride' ><div class='button-dock'></div><table class='table'></table></div>";
			var $grid = $(html);
			$grid[0].id = id;
			return $grid;
		})(id,_);
		
		pagePlugin.setConfig({
			totalPage : 0,
			currentPage : 0,
			currentFirstNumber : 0,
			currentLastNumber : 0,
			itemsNumber : 0
		});
		
		this.selectRowNumbers = [];
		
		this.selectedRecords = [];
		
		this.hascheckBox = false;
		
		this.hasRowCounter = false;
		
		this.records = [];
		
		this.currentPageIndex = 0;
		
		
		this.add = function(){
			
		};
		
		this.addPagePlugin = function(){
			var pluginHTML = pagePlugin.parseTemplate(this.pageConfig);
			var plugin = $("<div class='gridPagePlugin'></div>");
			plugin.html(pluginHTML);
			this.grid.append(plugin);
		};
		
		this.changePagePluginInformation = function(){
			var currentFirstNumber =  me.store.pageSize*me.store.pagePluginconfig.currentPageIndex;
			var currentLastNumber = currentFirstNumber + this.records.length;
			pagePlugin.setConfig({
					totalPage : me.store.pagePluginconfig.pagenumber,
					currentPage : me.store.pagePluginconfig.currentPageIndex + 1,
					currentFirstNumber :currentFirstNumber,
					currentLastNumber : currentLastNumber,
					itemsNumber : me.store.pagePluginconfig.itemsNumber
			});
			var pluginHTML = pagePlugin.parseTemplate(this.pageConfig);
			this.grid.children('.gridPagePlugin').html(pluginHTML);
		};
		
		
		this.getRecords = function(index){
			return this.records[index];
		};
		
		this.getSelectRecords = function(){
			return this.selectedRecords;
		};
	
		this.getStore = function(){
			return this.store;
		};
		
		this.remove = function(rowCounter){
			
		};
		
		this.toggleSelectAll = function(){
		
			var $selectAllCheckbox = $(this).children(".selectAllRows");
			
			if($selectAllCheckbox[0].checked){
				resetAllCheckboxchecked(true);
				me.selectedRecords = me.records;
			}else{
				resetAllCheckboxchecked(false);
				me.selectedRecords = [];
			}
		};
		
		
		this.setDockButton = function(btnLists){
			for(var i=0,len=btnLists.length;i<len;i++){
				var newDockWidget = $(formWidgetFactory(btnLists[i]));
				var dock = this.grid.children(".button-dock");
				dock.append(newDockWidget);
			}
		};

		this.setPageSize = function(pageSize){
			this.pageSize = pageSize;
			this.store.setPageSize(pageSize);
		};
		
		this.showPrePage = function(){
			this.store.showPrePage();
			this.onChangePage();
		};
		
		this.showFirstPage = function(){
			this.store.showFirstPage();
			this.onChangePage();
		};
		
		this.showLastPage = function(){
			this.store.showLastPage();
			this.onChangePage();
		};
		
		this.showIndexPage = function(index){
			this.store.showIndexPage(index);
			this.onChangePage();
		};
		
		
		this.onChangePage = function(){
			this.records = this.store.records;
			this.changePagePluginInformation();
			this.reRender();
		};
		
		this.showNextPage = function(){
			this.store.showNextPage();
			this.onChangePage();
		};
		
		this.removeAllRows = function(){
			var trs = this.grid.find("tr");
			for(var i= trs.length-1;i>=1;i++){
				trs.eq(i).remove();
			}
		};
		
		this.reRender = function(){
			this.removeAllRows();
			me.addRowsByData();
		};
		
		this.setRowCounter = function(){
			this.hasRowCounter = true;
		};
		
		this.setRowHeight = function(height){
			this.grid.find('td').height(height);
		};
		
		this.setRowOperation = function(btnLists){
			this.hasRowOperation = true;
			this.rowOperations= btnLists;
		};
		
		
		this.reSetSelectedRecords = function(){
			me.selectedRecords = [];
			for(var el in me.selectRowNumbers){
				var index = me.selectRowNumbers[el];
				me.selectedRecords.push(me.records[index]);
			}
			
		};
		
		this.deSelectRow = function(index){
			for(var i=0;i<me.selectRowNumbers.length;i++){
				if(index == this.selectRowNumbers[i]){
					me.selectRowNumbers.slice(i,1);
					return;
				}
			}
		};
		
		this.selectRow = function(index){
			me.selectRowNumbers.push(index);
		};
		
		this.setRowTheme = function(cellConfigs){
			var table = this.grid.children(".table");
			var $tr = $(document.createElement("tr"));
			if(this.hascheckBox){
				var checkBox = $('<th class="selectCell"><input class="selectAllRows" type="checkbox" /></th>');
				checkBox.on("change",this.toggleSelectAll);
				$tr.append(checkBox);
			}
			if(this.hasRowCounter){
				var rowCounterTh =  $('<th class="rowCounterCell">序号</th>');
				$tr.append(rowCounterTh);
			}
			this.cellConfigs = cellConfigs;
			for(var i=0,len = cellConfigs.length;i<len;i++){
				var th = document.createElement('th');
				th.innerText = cellConfigs[i].name;
				$tr.append($(th));
			}
			if(this.hasRowOperation){
				$tr.append($("<th>操作</th>"));
			}
			table.append($tr);
		};
		
		this.setCheckBox = function(){
			this.hascheckBox = true;
		};
		
		this.setStore = function(store){
			this.store = store;
		};
		
		this.getRecordByIndex = function(index){
			if(this.records.length>0){
				return this.records[index];
			}else{
				return null;
			}
		};
		
		this.createRow = function(index){
			var tr = $("<tr></tr>");
			if(this.hascheckBox){
				var checkBox = $('<td  class="selectCell"><input class="selectCurrentRow" type="checkbox" /></td>');
				checkBox.on("change",function(){
					if(this.value){
						me.selectRow(index);
					}else{
						me.deSelectRow(index);
					}
					me.reSetSelectedRecords();
				});
				tr.append(checkBox);
			}
			if(this.hasRowCounter){
				var rowNumber = $('<td  class="selectCell"></td>');
				rowNumber.text(index);
				tr.append(rowNumber);
			}
			for(var i=0 ; i <this.cellConfigs.length;i++){
				var td = document.createElement('td');
				td.innerText = this.records[index][this.cellConfigs[i].fieldName];
				tr.append($(td));
			}
			if(this.hasRowOperation){
				var opertateTd = $("<td></td>");
				for(var i=0,len=this.rowOperations.length;i<len;i++){
					var newDockWidget = $(formWidgetFactory(this.rowOperations[i]));
					newDockWidget.attr("data-index",index);
					opertateTd.append(newDockWidget);
				}
				tr.append(opertateTd);
			}
			return tr;
		};
		
		this.addRowsByData = function(){
			var table = this.grid.children(".table");
			var datas = this.store.records;
			for(var i = 0;i<datas.length;i++){
				var newRow = this.createRow(i);
				if(datas[i].id){
					newRow.attr("data-id",datas[i].id);
				}
				table.append(newRow);
			} 
		};
		
		this.refresh = function(){
			this.removeAllRows();
			this.store.load(function(records){
				me.records = records;
				me.addRowsByData();
			});
		};
		
		this.render = function(selector){
			this.store.load(function(records){
				me.records = records;
				me.addRowsByData();
				if(me.pageSize>0){
					me.addPagePlugin();
					me.changePagePluginInformation();
				}
				$(selector).append(me.grid);
			});
		};
		
	};
})(quan._||_,formWidgetFactory);
