var express = require("express");
var router = express.Router();
var models = require("../../models");
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Days = models.Day;
var $ = require("jQuery");
// var ajax = require("ajax");

// $.get('/days', function (data) {console.log('GET response data', data)})
//   .fail( function (err) {console.error('err', err)} );

// $.ajax({
//     method: 'GET',
//     url: '/api/day',
//     // data: someDataToSend,
//     success: function () {
//         console.log("inside ajax get method")
//     },
//     error: function (errorObj) {
//         console.error(errorObj)
//     }
// });

//gets all the days
router.get("/day", function(req,res){
	console.dir($);
	Days.find({}).exec().then(function(days){
		res.send(days);
	});
});

//gets a specific day
router.get("/day/:number", function(req,res){
	var dayNum = req.params.number;
	Days.find({number: dayNum}).exec().then(function(day){
		res.send(day);
	});
});

//removes a specific day
router.delete("/day/:number", function(req,res){
	var dayNum = req.params.number;
	Days.remove({number: dayNum}).exec().then(function(day){
		res.send(day);
	});
});

//adds a day
router.post("/day", function(req,res){
	console.log(req.body)
	var dayNum = Days.find({}).length+1;
	var day = new Days({
		number: dayNum
	});
	day.save().then(function(e){
		console.log(e);
		console.log("it saved correctly");
	})
	console.log("we're here")
});

//add a restaurant
router.post("/day/:number/restaurant", function(req,res){
	var dayNum = req.params.number;
});

//add a activity
router.post("/day/:number/activity", function(req,res){
	var dayNum = req.params.number;
});

//add a hotel
router.post("/day/:number/hotel", function(req,res){
	var dayNum = req.params.number;
});


module.exports = router;
