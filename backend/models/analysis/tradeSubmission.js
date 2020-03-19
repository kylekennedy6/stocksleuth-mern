const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tradeSubmissionSchema = new Schema({
  hypothesis: { type: String},
  predictionIntervals: {
    highDownside: { type: Number, required: true },
    moderateDownside: { type: Number, required: true },
    lowDownside: { type: Number, required: true },
    lowUpside: { type: Number, required: true },
    moderateUpside: { type: Number, required: true },
    highUpside: { type: Number, required: true }
  },
  direction: { type: String, required: true },
  targetPortfolioWeight: { type: Number, required: true },
  likelyPreannounce: { type: Boolean, required: true },
  entranceDate: { type: Date, required: true },
  notes: { type: String },
  transcript: { type: mongoose.Types.ObjectId, required: true, ref: 'Transcript'},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
  });

module.exports = mongoose.model('TradeSubmission', tradeSubmissionSchema);
