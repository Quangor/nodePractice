//@version 0.0.1
// author @WuJianquan . email: 854197426@qq.com
// using jquey and underscore。
var quan = (
	function(jQuery,_,baseform,validator){
		var Quan = {
			query : jQuery,
			$ : jQuery,
			_ : _,
			baseform : baseform,
			validator:validator
		};
		return Quan; 
	}
)(window.$||jQuery,window._,BaseForm,Validator );
