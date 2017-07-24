var mongoose = require('mongoose');


var set = new mongoose.Schema({
	setID: { type: String, default: null },
	weight: { type: Number, default: null },
	reps: { type: Number, default: null },
	sets: { type: Number, default: null }
});

var set = new mongoose.Schema({
  set1: set,
  set2: set,
  set3: set,
  set4: set,
  set5: set
})

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
    exercise1: exercise,
    exercise2: exercise,
    exercise3: exercise

});
