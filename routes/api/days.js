var express = require("express");
var router = express.Router();
var models = require("../../models");
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Days = models.Day;
var $ = require("jQuery");

//gets all the days
router.get("/day", function(req,res){
	Days.find({})
		.then(function(foundDays) {
			console.log("Inside the router get / function", foundDays);
			res.send(foundDays);
		})
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
	var currentDay = req.body.numDays;
	Days.create({
		number: (Number(currentDay) + 1)	
	})
	.then(function(newDay) {
		console.log(newDay)
	})
});

//add an attraction
router.post("/day/:number", function(req,res,next){
	var attractionName = req.body.sectionName;
	var attractionType = req.body.attractionType;
	// console.log(attractionName);
	// console.log(attractionType);

	var dayNum = req.params.number;

	Days.findOne({number: dayNum})
	.then(function(foundDay) {
			// foundDay.hotel.push(someId)
			console.log("this is the found day",foundDay);
		if (attractionType === 'hotels') {
			Hotel.findOne({name: attractionName})
				.then(function(hotel) {
					var hotelId = hotel._id;
					foundDay.hotels = hotelId;
					foundDay.save();
				})
		}
		else if (attractionType === 'restaurants') {
			Restaurant.findOne({name: attractionName})
				.then(function(restaurant) {
					// console.log("this is inside the rest else if",restaurant)
					var restaurantId = restaurant._id;
					foundDay.restaurants.push(restaurantId);
					foundDay.save();
					// console.log(foundDay);
					// console.log("we found our restaurant", restaurant);
				})
		}
		else if (attractionType === 'activities') {
			Activity.findOne({name: attractionName})
				.then(function(activity) {
					var activityId = activity._id;
					foundDay.activities.push(activityId);
					foundDay.save();
					// console.log("we found our activity", activity);
				})
		}
	})

});


module.exports = router;
