const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const TranscriptRating = require('../../models/transcript/transcriptRating');
const Transcript = require('../../models/transcript/transcript');
const Ticker = require('../../models/ticker');
const User = require('../../models/user');

const getTranscriptRatingByUserAndTranscriptId =  async (req, res, next) => {
  const transcriptId = req.params.transcriptId;
  const username = req.params.username;
  let transcriptRating;
  let userId
  try {
    user = await User.findOne({"username": username });
    userId = user._id
    transcriptRating = await TranscriptRating.findOne({"creator": userId, "transcript": transcriptId });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find an transcript rating with the given transcript id and username.', 
      500
    );
    return next(error);
  }

  if (!transcriptRating) {
    transcriptRating = {
      rating: "Unrated",
      transcript: transcriptId,
      creator: userId
    }
    res.json({transcriptRating});
  } else {
    res.json({transcriptRating: transcriptRating.toObject( {getters: true }) });
  }

};

const getTierOneTranscripts = async (req, res, next) => {
  let user = req.params.username

  let tierOneTranscripts;
  try {
    user = await User.findOne({"username": user});
    user = user._id
    const user_transcript_rating_ids = [];
    const user_transcript_ratings = await TranscriptRating.find({"creator": user, "rating" : {$regex : ".*Tier One.*"} }).select('_id');
    user_transcript_ratings.map(rating => user_transcript_rating_ids.push(rating._id));
    tierOneTranscripts = await Transcript.find({'transcriptRatings' : {"$in" : user_transcript_rating_ids}}).populate('ticker');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find tier one transcripts.', 
      500
    );
    return next(error);
  }
  res.json({ transcripts: tierOneTranscripts.map(transcript => transcript.toObject({ getters: true })) });
}

const getTierTwoTranscripts = async (req, res, next) => {
  let user = req.params.username

  let tierTwoTranscripts;
  try {
    user = await User.findOne({"username": user});
    user = user._id
    const user_transcript_rating_ids = [];
    const user_transcript_ratings = await TranscriptRating.find({"creator": user, "rating" : {$regex : ".*Tier Two.*"} }).select('_id');
    user_transcript_ratings.map(rating => user_transcript_rating_ids.push(rating._id));
    tierTwoTranscripts = await Transcript.find({'transcriptRatings' : {"$in" : user_transcript_rating_ids}}).populate('ticker');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find tier one transcripts.', 
      500
    );
    return next(error);
  }
  res.json({ transcripts: tierTwoTranscripts.map(transcript => transcript.toObject({ getters: true })) });
}
const createTranscriptRating = async (req, res, next) => {
  const { rating, transcript, creator } = req.body;
  const createdTranscriptRating = new TranscriptRating({
    rating,
    transcript,
    creator
  });


  let user;
  let ratedTranscript;
  try {
    user = await User.findById(creator);
    ratedTranscript = await Transcript.findById(transcript);
  } catch (err) {
    const error = new HttpError(
      'Could not fetch user or transcript, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      'Could not find user for provided id.',
      404
    );
    return next(error);
  }

  if (!ratedTranscript) {
    const error = new HttpError(
      'Could not find transcript for provided id.',
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTranscriptRating.save({ session: sess});
    user.transcriptRatings.push(createdTranscriptRating._id);
    await ratedTranscript.updateOne({"$push": {"transcriptRatings": createdTranscriptRating._id}})
    await user.save({session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating transcript rating failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({transcriptRating: createdTranscriptRating.toObject({ getters: true }) });
}

const updateTranscriptRating = async (req, res, next) => {
  const { rating, primaryEvidence, contraryEvidence, transcriptRatingId, creator } = req.body;

  let transcriptRating;
  try {
    transcriptRating = await TranscriptRating.findById(transcriptRatingId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update transcript rating.',
      500
    );
    return next(error);
  }

  if (transcriptRating.creator.toString() !== creator) {
    const error = new HttpError('You are not allowed to edit this transcript rating.', 401);
    return next(error);
  }

  transcriptRating.rating = rating;
  transcriptRating.primaryEvidence = primaryEvidence;
  transcriptRating.contraryEvidence = contraryEvidence;

  try {
    await transcriptRating.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update transcript rating.',
      500
    );
    return next(error);
  }

  res.status(200).json({ transcriptRating: transcriptRating.toObject({ getters: true }) });
};

exports.getTranscriptRatingByUserAndTranscriptId = getTranscriptRatingByUserAndTranscriptId;
exports.getTierOneTranscripts = getTierOneTranscripts;
exports.getTierTwoTranscripts = getTierTwoTranscripts;
exports.createTranscriptRating = createTranscriptRating;
exports.updateTranscriptRating = updateTranscriptRating;