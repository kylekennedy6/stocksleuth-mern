const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pastEventSchema = new Schema({
  eventType: { type: String, required: true },
  fiscalQuarter: { type: String, required: true },
  fiscalYear: { type: Number, required: true },
  reactionDate: { type: Date, required: true },
  reaction: { type: Number, required: true },
  revenueVersusConsensus: { type: Number, required: true },
  epsVersusConsensus: { type: Number, required: true },
  tlChangeType: { type: String, required: true },
  tlMidpointChangePercentage: { type: Number, required: true },
  blChangeType: { type: String, required: true },
  blMidpointChangePercentage: { type: Number, required: true },
  ticker: { type: mongoose.Types.ObjectId, required: true, ref: 'Ticker'},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('PastEvent', pastEventSchema);