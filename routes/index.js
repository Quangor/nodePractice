'use strict';
var express = require("express");
var router = express.Router();
var GameModel = require("../models/Game");

router.get("/",function(req,res){
	var gameModel = new GameModel();
	var joinObj = gameModel.getJoinQueryObj('user','challenged');
	joinObj.innerJoin();
	joinObj.find(function(err,results){
		
	});
	 res.render("index", {
	    title: "吴江权"
	 });
});

module.exports = router;