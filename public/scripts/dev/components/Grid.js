var Grid = (function(_,formComponents,PagePlugin){
	
	var makeSelectorAsHTMLElement = function(selector){
		if('string' == typeof selector){
			selector = document.querySelector(selector);
		}
		return selector;
	};
	
	var ButtonDockMaker = function(items){
		
		var dock = document.createElement("div");
		dock.className += "button-dock";
		this.renderButtonDock = function(selector){
			selector = makeSelectorAsHTMLElement(selector);
			selector.appendChild(dock);
		};
		
		this.createDockerItems = function(){
			var btnLists = items;
			for(var i=0,len=btnLists.length;i<len;i++){
				var newDockWidget = formWidgetFactory(btnLists[i]);
				dock.appendChild(newDockWidget);
			}
			return dock;
		};
	};
	
	var Table;
	
	var Grid = function(config){
		var me = this;
		var grid = document.createElement('div');
		grid.className = "manage-grid";
		this.store = config.store;
		this.form  = {};
		
		this.createDock = function(config){
			var buttonDock = new ButtonDockMaker(config.dockItems);
			buttonDock.createDockerItems();
			return buttonDock;
		};
		
		this.createForm = function(config){
			this.form = formComponents.formMaker(config.form);
			return formComponents;
		};
		
		this.getStore = function(){
			return this.store;
		};
		
		
		this.renderDock = function(buttonDock){
			buttonDock.renderButtonDock(grid);
		};
		
		this.renderForm = function(formComponents){
			formComponents.render(this.form,grid);
			return this;
		};
		
		this.setTable = function(){
			return this;
		};
		
		this.setPagePlugin = function(){
			return this;
		};
		
		this.build = function(){
			if(config.form){
				var formComponents = this.createForm(config);
				this.renderForm(formComponents);
			}
			if(config.dockItems){
				var dock = this.createDock(config);
				this.renderDock(dock);
			}
			
			//.setDocker(config).setTable(config).setPagePlugin(config);
		};
		
		this.render = function(selector){
			selector = makeSelectorAsHTMLElement(selector);
			selector.appendChild(grid);
		};
	};
	return Grid;
})(quan._||_,formComponents,PagePlugin);
