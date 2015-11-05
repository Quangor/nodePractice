var manageFrame = (function($){
	
	var Navigation = function(){
		var me = this;
		var navigats = $("#menu ul[role='navigation'] li");
		var higherNavigation = $("#menu ul[role='navigation'] li.higherNavigation>a");
		
		this.activeNavBar = function(id){
			$("#"+id).attr("data-state","active");
		};
		
		this.sleepNavBar = function(id){
			$("#"+id).attr("data-state","notActive");
		};
		
		this.getNavBarState = function(id){
			return $("#"+id).attr("data-state");
		};
		
		this.slideToggleLowerNavigation = function(){
			var childNavigationsContainer = $(this).parent().children("ul");
			if(childNavigationsContainer.length>0){
				childNavigationsContainer.slideToggle(1000);
			}
		};
		this.init = function(){
			higherNavigation.on('click',this.slideToggleLowerNavigation);
		};
		
	};
	
	var WorkPlace = function(){
		this.workplaceWraper = $("#views");
		this.tabBarWraper = $("#tabBar ul");
		var navigatsWraper = $("#menu ul[role='navigation']");
		this.sleepTabBar = function (){
			var tabBars = $("#tabBar>ul>li");
			tabBars.removeClass("currentNavigation");
			
		};
		
		this.sleepWorkplace = function(){
			var workplaces = $("#views iframe");
			workplaces.hide();
		};
		
		this.tabBarIdCreator = function(id){
			return id+"tabbar";
		};
		
		this.parseTabBarId = function(tabBarId){
			return tabBarId.replace("tabbar","");
		};
		
		this.addTabBar = function(id){
			var tabText = navigatsWraper.find("#"+id).children('a').text();
			var tabbarId = this.tabBarIdCreator(id);
			var newTab = $("<li class='currentNavigation' id="+ tabbarId +" title="+tabText+"><i class='close'></i><a>"+tabText+"</a><i class='refresh'></i></li>");
			this.sleepTabBar();
			this.tabBarWraper.append(newTab);
		};
		
		this.switchTabBar = function(id){
			this.sleepTabBar();
			var tabbarId = this.tabBarIdCreator(id);
			var thisTabBar = this.tabBarWraper.children("#" + tabbarId);
			thisTabBar.addClass("currentNavigation");
		};
		
		this.switchWorkplace = function(id){
			var thisWorkplaceId = this.workplaceIdCreator(id);
			var thisWorkplace = this.workplaceWraper.children("#"+thisWorkplaceId);
			this.sleepWorkplace();
			thisWorkplace.show();
		};
		
		
		this.workplaceIdCreator = function(id){
			return id + "iframe";
		};
		
		this.parseWorkplaceId = function(iframeId){
			return iframeId.replace("iframe","");
		};
		
		this.addWorkplace = function(id,route){
			var iframeId = this.workplaceIdCreator(id);
			var newIframe = $("<iframe src=" + route + " id= " + iframeId + "></iframe>");
			this.sleepWorkplace();
			this.workplaceWraper.append(newIframe);
		};
		
		this.removeTabBar = function(id){
			var tabBarId = this.tabBarIdCreator(id);
			$("#" + tabBarId).remove();
		};
		
		this.removeWorkplace = function(id){
			var workplaceId = this.workplaceIdCreator(id);
			$("#" + workplaceId).remove();
		};	
		
		this.refresh = function(id){
			var workplaceId = this.workplaceIdCreator(id);
			document.frames(workplaceId).location.reload(true);
		};
	};
	
	var ManageFrame = function(){
		var me = this;
		var navigation = new Navigation();
		
		var higherNavigation = $("#menu ul[role='navigation'] li");
		var workplace = new WorkPlace();
		this.openNewModule = function(id){
			workplace.addTabBar(id);
			this.addNewModuleWorkPlace(id);
		};
		
		this.addNewModuleWorkPlace = function(id){
			var thisNavigationMenu = $("#"+id);
			var workplaceRoute = thisNavigationMenu.attr("data-route");
			workplace.addWorkplace(id,workplaceRoute);
		};
		
		this.closeModule = function(idtabbar){
			var id = workplace.parseTabBarId(idtabbar);
			var preTabBarId = $("#" + idtabbar).prev()[0].id;
			var prevId = workplace.parseTabBarId(preTabBarId);
			if($("#" + idtabbar).hasClass("currentNavigation")){
				this.active(prevId);
			};
			workplace.removeTabBar(id);
			workplace.removeWorkplace(id);
			navigation.sleepNavBar(id);
			
		};
		
		
		this.active = function(id){
			workplace.switchTabBar(id);
			workplace.switchWorkplace(id);
		};
		
		this.init = function(){
			navigation.init();
			
			$(document).on("click","#tabBar>ul>li",function(event){
				var id = workplace.parseTabBarId(this.id);
				me.active(id);
			});
			
			$(document).on("click","#tabBar>ul>li>i.close",function(event){
				var evt = event ||  window.event;
				evt.cancelBubble = true;
				evt.stopPropagation();
				var id = $(this).parent()[0].id;
				me.closeModule(id);
			});
			
			
			
			$(".childNavi").on("click",function(){
				if("active" == navigation.getNavBarState(this.id)){
					me.active(this.id);
				}else{
					me.openNewModule(this.id);
					navigation.activeNavBar(this.id);
				}
			});
		};
		
	};
	return new ManageFrame();
})(window.$);
manageFrame.init();
