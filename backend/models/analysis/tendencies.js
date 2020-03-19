const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tendenciesSchema = new Schema({
  beatsPastTwoYears: { type: Number, required: true },
  missesPastTwoYears: { type: Number, required: true },
  sameEventRaisesPastThree: { type: Number, required: true},
  sameEventCutsPastThree: { type: Number, required: true},
  transcript: { type: mongoose.Types.ObjectId, required: true, ref: 'Transcript'},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Tendencies', tendenciesSchema);