const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  tickerText: { type: String, required: true },
  company: { type: String, required: true },
  transcripts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Transcript'}],
  pastEvents: [{ type: mongoose.Types.ObjectId, required: true, ref: 'PastEvent'}],
});

module.exports = mongoose.model('Ticker', tickerSchema);