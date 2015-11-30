var mongoose = require('mongoose');
var Hotel = require('./hotel').schema;
var Restaurant = require('./restaurant').schema;
var Activity = require('./activity').schema;


var DaySchema = new mongoose.Schema({
	number: {type: Number, required: true},
	hotel: {type: mongoose.Schema.Types.ObjectId, ref: "Hotel"},
	restaurants: {type: [mongoose.Schema.Types.ObjectId], ref: "Restaurant"},
	activities: {type: [mongoose.Schema.Types.ObjectId], ref: "Activity"}
});

module.exports = mongoose.model('Day', DaySchema);


