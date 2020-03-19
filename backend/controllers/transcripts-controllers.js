const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Transcript = require('../models/transcript/transcript');
const Ticker = require('../models/ticker');
const TranscriptRating = require('../models/transcript/transcriptRating');
const User = require('../models/user');

const getTranscriptById =  async (req, res, next) => {
  const transcriptId = req.params.tid;
  let transcript;
  try {
    transcript = await Transcript.findOne({_id: transcriptId}).populate('ticker');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a transcript.', 
      500
    );
    return next(error);
  }

  if (!transcript) {
    const error = new HttpError(
      'Could not find a transcript for the provided transcript id.', 
      404
    );
  }

  res.json({transcript: transcript.toObject( {getters: true }) });
};

const getUnreadTranscripts = async (req, res, next) => {
  let user = req.userData.userId;
  let unratedTranscripts;
  try {
    const user_transcript_rating_ids = [];
    const user_transcript_ratings = await TranscriptRating.find({"creator": user}).select('_id');
    user_transcript_ratings.map(rating => user_transcript_rating_ids.push(rating._id))
    unratedTranscripts = await Transcript.find({'transcriptRatings' : {"$nin" : user_transcript_rating_ids}}).sort('-programmaticRating').populate('ticker');
  } catch (err) {
    const error = new HttpError(
      'Fetching transcripts failed.', 
      500
    );
    return next(error);
  }
  res.json({ transcripts: unratedTranscripts.map(transcript => transcript.toObject({ getters: true })) });
};

const getTranscriptsByTickerId = async (req, res, next) => {
  tickerId = req.params.tickerid
  let transcripts;
  
  try {
    transcripts = await Transcript.find( {ticker: tickerId });
  } catch (err) {
    const error = new HttpError(
      'Fetching exchanges failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!transcripts || transcripts.length === 0) {
    return next(
      new HttpError('Could not find exchanges for the provided transcript id.', 404)
    );
  }

  res.json({ transcripts: unratedTranscripts.map(transcript => transcript.toObject({ getters: true })) });
}

const getArchives = async (req, res, next) => {
  const user = req.userData.userId
  const archiveType = req.params.archiveType;
  let rating;

  switch(archiveType) {
    case 'short-successes':
      rating = '(Post-Report): Short - Success'
      break;
    case 'short-misinterpretedEvidence':
      rating = '(Post-Report): Short - Misinterpreted Evidence'
      break;   
    case 'short-adverseReaction':
      rating = '(Post-Report): Short - Adverse Reaction'
      break;
    case 'long-successes':
      rating = '(Post-Report): Long - Success'
      break;
    case 'long-misinterpretedEvidence':
      rating = '(Post-Report): Long - Misinterpreted Evidence'
      break;   
    case 'long-adverseReaction':
      rating = '(Post-Report): Long - Adverse Reaction'
      break;                 
    default:
      rating = '(Post-Report): Short - Success'
  }

  let archivedTranscripts;
  
  try {
    const user_transcript_rating_ids = [];
    const user_transcript_ratings = await TranscriptRating.find({"creator": user, "rating" : rating }).select('_id');
    user_transcript_ratings.map(rating => user_transcript_rating_ids.push(rating._id));
    archivedTranscripts = await Transcript.find({'transcriptRatings' : {"$in" : user_transcript_rating_ids}}).populate('ticker');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find tier one transcripts.', 
      500
    );
    return next(error);
  }
  res.json({ transcripts: archivedTranscripts.map(transcript => transcript.toObject({ getters: true })) });
}

exports.getArchives = getArchives;
exports.getTranscriptById = getTranscriptById;
exports.getUnreadTranscripts = getUnreadTranscripts;
exports.getTranscriptsByTickerId = getTranscriptsByTickerId;