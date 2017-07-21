var mongoose = require('mongoose');


var set = new mongoose.Schema({
	setID: String,
	weight: Number,
	reps: Number,
	sets: Number
});

var exercise = new mongoose.Schema({
  name: String,
  sets: set
});


module.exports = mongoose.model('Workout', {
    name: String,
    text: {
        type: String,
        default: ''
    },
    date: { type: Date, default: Date.now },
    exercise1: exercise

});
