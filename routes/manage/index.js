'use strict';
var express = require("express");
var router = express.Router();
var GameModel = require("../../models/Game");
var typemanageRoter = require("./typemanage");

router.get("/",function(req,res){
	var gameModel = new GameModel();
	var joinObj = gameModel.getJoinQueryObj('user','challenged');
	joinObj.innerJoin();
	joinObj.find(function(err,results){
		
	});
	 res.render("manage/index", {
	    title: "吴江权"
	 });
});

router.get("/index",function(req,res){
	 res.render("manage/modules/index", {
	    title: "吴江权"
	 });
});

router.use("/typemanage",typemanageRoter);

router.get("/quessionmanage",function(req,res){
	 res.render("manage/modules/quessionmanage", {
	    title: "题目管理"
	 });
});

router.get("/scoremanage",function(req,res){
	 res.render("manage/modules/scoremanage", {
	    title: "成绩管理"
	 });
});

router.get("/usermanage",function(req,res){
	 res.render("manage/modules/usermanage", {
	    title: "用户管理"
	 });
});



router.post("/questionQuery",function(req,res){
	 res.json({status:200,message:'hello'});
});


module.exports = router;