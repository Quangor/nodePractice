'use strict';
var express = require("express");
var router = express.Router();
var questionTyopeController = require("../../controllers/manage/QuessionType");

router.get("/",function(req,res){
	 res.render("manage/modules/typemanage");
});
router.post('/query',function(req,res){
	
	questionTyopeController.queryType(req,res);
});

router.post('/insert',function(req,res){
	questionTyopeController.insertType(req,res);
});

router.post('/remove',function(req,res){
	questionTyopeController.removeType(req,res);
});

router.post('/update',function(req,res){
	questionTyopeController.updateType(req,res);
});

module.exports = router;