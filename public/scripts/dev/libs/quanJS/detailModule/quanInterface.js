//模仿接口
var quanInterFace = (function(){
	return function(childObj){
		this.abstractMembers = [{
			memberName : '',
			memberType : ''
		}];
		
		var checkInterfaceAbstractMembersArray = function(abstractMembers){
			for(var i=0;i<abstractMembers.length;i++){
				if(!abstractMembers[i].memberName){
					var errmsg = i+" 抽象成员类型不能为空";
					console.log(errmsg);
					throw new Error(errmsg);
				}
				if(!abstractMembers[i].memberType){
					var errmsg = i+" 抽象成员类型不能为空";
					console.log(errmsg);
					throw new Error(errmsg);
				}
			}
		};
		
		this.checkAbstract = function(obj){
			
			if( 0 < obj.abstractMembers.length){
				checkInterfaceAbstractMembersArray(obj.abstractMembers);
				for(var i=0;i<obj.abstractMembers.length;i++){
					if(! obj[obj.abstractMembers[i].memberName]){
						var errmsg = "必须重写"+obj.abstractMembers[i].memberName+"抽象成员";
						console.log(errmsg);
						throw new Error(errmsg);
					};
					if(typeof obj[obj.abstractMembers[i].memberName] != obj.abstractMembers[i].memberType){
						var errmsg = "抽象成员"+obj.abstractMembers[i].memberName+"类型不对";
						console.log(errmsg);
						throw new Error(errmsg);
					};
				};
			};
		};
	};
})();
