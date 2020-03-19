const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const openingStatementRatingSchema = new Schema({
  rating: { type: String, required: true },
  primaryEvidence: { type: Boolean, required: true,  default: false },
  contraryEvidence: { type: Boolean, required: true, default: false }, 
  openingStatement: { type: mongoose.Types.ObjectId, required: true, ref: 'OpeningStatement' },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('OpeningStatementRating', openingStatementRatingSchema);