var mongoose = require('mongoose');

module.exports = mongoose.model('Workout', {
    name: String,
    text: {
        type: String,
        default: ''
    },
    date: { type: Date, default: Date.now }
});
