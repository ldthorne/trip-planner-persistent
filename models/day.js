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

//gabe's code for find or creating in a collection
function findOrCreate(model, properties) {
    return model.findOne(properties).exec().then(function(instance) {
        if (instance) return instance; // --> promise for found instance
        return model.create(properties); // --> promise for created instance
    });
}

//checks if there is a day in the collection. if there isn't, it adds a day.
findOrCreate(dayModel, {number: 1})
	.then(function(day){
		console.log(day)
	}).then(null, function(err){
		console.error(err)
	})




module.exports = dayModel;


