const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sentimentSchema = new Schema({
  shortFloat: { type: Number },
  shortSharesChangePastMonth: { type: Number },
  sellSideRating: { type: String },
  revisionsRating: { type: String },
  valueRating: { type: String },
  growthRating: { type: String },
  profitabilityRating: { type: String },
  momentumRating: { type: String },
  quantRating: { type: String },
  ownedByInsiders: { type: Number },
  transcript: { type: mongoose.Types.ObjectId, required: true, ref: 'Transcript'},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Sentiment', sentimentSchema);