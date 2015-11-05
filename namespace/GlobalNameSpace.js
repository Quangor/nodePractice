var makeDataDoubleBit = function(data){
	if(parseInt(data)<10){
		return "0"+data;
	}
	return data;
};

var getYMD = function(time){
	var date = new Date(time);
	var year = date.getFullYear();
	var month = date.getMonth() +1;
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

module.exports = {
	timeFormat : {
		getYMD : getYMD,
		getHMS : getHMS,
		getFullTime : getFullTime
	},
	
	parseRequestData : function(req){
		var data = req.body.data;
		return JSON.parse(data);
	},
	
	parseRequestFilter : function(req){
		var filters = req.body.filters;
		return JSON.parse(filters);
	},
	
	dbOpSuccess : function(res,err,results){
		var status = err?202:200;
		var errmsg = err?err:'操作成功';
		res.json({
				status : status,
				err : err,
				errmsg : errmsg,
				datas : results
		});
	}
};
