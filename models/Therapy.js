var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var TherapyScheme = new mongoose.Schema({
    date: {
        type: Date
    },
    reason: {
        type: String
    },
    expectations: {
        type: String
    },
    changes: {
        type: String
    },
    therapyType: {
        type: String
    },
    feedback: {
        type: String
    },
    advice: {
        type: String
    },
    notes: {
        type: String
    }
}, { _id: false });
TherapyScheme.plugin(AutoIncrement, {inc_field: '_id'});
mongoose.model('Therapy', TherapyScheme);

module.exports.mongooseModel = mongoose.model('Therapy');
module.exports.therapyScheme = TherapyScheme;
