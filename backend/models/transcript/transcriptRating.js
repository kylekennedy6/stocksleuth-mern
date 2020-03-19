const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transcriptRatingSchema = new Schema({
  rating: { type: String, required: true },
  transcript: { type: mongoose.Types.ObjectId, required: true, ref: 'Transcript'},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
  });

module.exports = mongoose.model('TranscriptRating', transcriptRatingSchema);