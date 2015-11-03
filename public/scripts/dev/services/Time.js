var Time = (function(){
	var makeDataDoubleBit = function(data){
		if(parseInt(data)<10){
			return "0"+data;
		}
		return data;
	};
	
	var getYMD = function(time){
		var date = new Date(time);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var date = date.getDate();
		
		return year+"-"+makeDataDoubleBit(month)+"-"+makeDataDoubleBit(date);
	};
	
	var getHMS = function(time){
		var date = new Date(time);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		
		return hours+":"+makeDataDoubleBit(minutes)+":"+makeDataDoubleBit(seconds);
	};
	
	var getFullTime = function(time){
		return getYMD(time) + " " + getHMS(time);
	};
	

	return new function Time(){
		this.now = function(){
			var date = new Date();
			return getFullTime(date);
		};
		
		this.getHMS = getHMS;
		
		this.getFullTime = getFullTime;
		
		this.getYMD = getYMD;
	};
})();
