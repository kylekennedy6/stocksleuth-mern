const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const openingStatementSchema = new Schema({
  number: { type: Number, required: true },
  executive: { type: String, required: true },
  text: { type: String, required: true },
  openingStatementRatings: [{ type: mongoose.Types.ObjectId, required: true, ref: 'OpeningStatementRating'}],
  transcript: { type: mongoose.Types.ObjectId, requred: true, ref: 'Transcript'}
});

module.exports = mongoose.model('OpeningStatement', openingStatementSchema);