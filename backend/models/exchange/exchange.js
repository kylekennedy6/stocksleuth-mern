const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  number: { type: Number, required: true },
  analyst: { type: String, required: true },
  questionText: { type: String, required: true },
  answers: [
    {
      executive: { type: String, required: true },
      answerText: { type: String, required: true}
    }],
  transcript: { type: mongoose.Types.ObjectId, required: true, ref: 'Transcript'},
  exchangeRatings: [{ type: mongoose.Types.ObjectId, required: true, ref: 'ExchangeRating'}],
});

module.exports = mongoose.model('Exchange', exchangeSchema);