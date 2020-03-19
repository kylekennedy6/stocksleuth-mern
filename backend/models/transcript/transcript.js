const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transcriptSchema = new Schema({
  ticker: { type: mongoose.Types.ObjectId, required: true, ref: 'Ticker'},
  fiscalQuarter: { type: String, required: true },
  fiscalYear: { type: Number, required: true },
  eventDate: { type: Date, required: true },
  projectedReportDate: { type: Date, required: true },
  programmaticRating: { type: Number, required: true },
  transcriptRatings: [ {type: mongoose.Types.ObjectId, required: true,  ref: 'TranscriptRating'}],
  openingStatements: [ {type: mongoose.Types.ObjectId, required: true,  ref: 'OpeningStatement'}],
  exchanges: [ {type: mongoose.Types.ObjectId, required: true,  ref: 'Exchange'}],
  guidanceVersusConsensusReports: [ {type: mongoose.Types.ObjectId, required: true,  ref: 'GuidanceVersusConsensus'}],
  tendenciesReports: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Tendencies'}],
  sentimentReports: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Sentiment'}],
  tradeSubmissions: [{ type: mongoose.Types.ObjectId, required: true, ref: 'TradeSubmission'}],
  reactionEvaluations: [{ type: mongoose.Types.ObjectId, required: true, ref: 'ReactionEvaluation'}]
  });

module.exports = mongoose.model('Transcript', transcriptSchema);