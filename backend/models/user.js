const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  exchangeRatings: [{ type: mongoose.Types.ObjectId, required: true, ref: 'ExchangeRating'}],
  openingStatementRatings: [{ type: mongoose.Types.ObjectId, required: true, ref: 'OpeningStatementRating'}],
  transcriptRatings: [{ type: mongoose.Types.ObjectId, required: true, ref: 'TranscriptRating'}],
  guidanceVersusConsensusReports: [{ type: mongoose.Types.ObjectId, required: true, ref: 'GuidanceVersusConsensusReport'}],
  pastEvents: [{ type: mongoose.Types.ObjectId, required: true, ref: 'PastEvent'}],
  tendenciesReports: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Tendencies'}],
  sentimentReports: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Sentiment'}],
  tradeSubmissions: [{ type: mongoose.Types.ObjectId, required: true, ref: 'TradeSubmission'}],
  reactionEvaluations: [{ type: mongoose.Types.ObjectId, required: true, ref: 'ReactionEvaluation'}],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);