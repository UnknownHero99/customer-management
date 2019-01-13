var mongoose = require('mongoose');

var TherapyScheme = require('./Therapy').therapyScheme;

var ClientSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    birthYear: {
      type: Number,
    },
    gender: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    bloodPressure: {
      type: Number,
    },
    healthStatus: {
      type: String,
      required: true
    },
    profession: {
      type: String,
      required: true
    },
    sportActivity: {
      type: String
    },
    nutrition: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    telNumber: {
      type: String
    },
    email: {
      type: String
    },
    other: {
      type: String
    },
    therapies: [TherapyScheme]
});
ClientSchema.index({ name: 1, surname: 1 }, { unique: true });
mongoose.model('Client', ClientSchema);

module.exports = mongoose.model('Client');
