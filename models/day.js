var mongoose = require('mongoose');
var Hotel = require('./hotel').schema;
var Restaurant = require('./restaurant').schema;
var Activity = require('./activity').schema;
// var findOrCreate = require('mongoose-findorcreate');


var DaySchema = new mongoose.Schema({
	number: {type: Number, required: true},
	hotels: {type: mongoose.Schema.Types.ObjectId, ref: "Hotel"},
	restaurants: {type: [mongoose.Schema.Types.ObjectId], ref: "Restaurant"},
	activities: {type: [mongoose.Schema.Types.ObjectId], ref: "Activity"}
});

// DaySchema.plugin(findOrCreate);

var dayModel = mongoose.model('Day', DaySchema);

// Creates a first day
// dayModel.findOrCreate({
// 		number: 1
// 	})
// 	.then(function() {
// 		var newDay = new dayModel({
// 			number: 1
// 		});
// 		return newDay.save();
// 	}).then(function(){
// 		console.log("this was successful")
// 	});




module.exports = dayModel;


