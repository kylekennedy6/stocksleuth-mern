const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exchangeRatingSchema = new Schema({
  contextRating: { type: String, required: true },
  questionRating: { type: String, required: true },
  overallRating: { type: String, required: true },
  primaryEvidence: { type: Boolean, required: true,  default: false },
  contraryEvidence: { type: Boolean, required: true, default: false }, 
  exchange: { type: mongoose.Types.ObjectId, required: true, ref: 'Exchange' },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('ExchangeRating', exchangeRatingSchema);