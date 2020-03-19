const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reactionEvaluationSchema = new Schema({
  actualPortfolioWeight: { type: Number, required: true },
  entranceDate: { type: Date, required: true },
  exitDate: { type: Date, required: true },
  singleDayReturn: { type: Number, required: true },
  actualReturn: { type: Number, required: true },
  returnOnPortfolio: { type: Number, required: true },
  notes: { type: String, required: true },
  transcript: { type: mongoose.Types.ObjectId, required: true, ref: 'Transcript'},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('ReactionEvaluation', reactionEvaluationSchema);