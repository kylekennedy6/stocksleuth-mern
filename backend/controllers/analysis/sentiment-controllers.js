const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const Sentiment = require('../../models/analysis/sentiment');
const Transcript = require('../../models/transcript/transcript');
const User = require('../../models/user');

const getSentimentByUserAndTranscriptId =  async (req, res, next) => {
  const transcriptId = req.params.transcriptId;
  const username = req.params.username;

  let sentiment;
  let user;
  let userId;
  try {
    user = await User.findOne({"username": username });
    userId = user._id
    sentiment = await Sentiment.findOne({"transcript": transcriptId, "creator": userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching report failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (!sentiment) {
    sentiment = [];
    res.json({sentiment: []});
  } else {
  res.json({sentiment: sentiment.toObject( {getters: true }) });
}
};

const createSentiment = async (req, res, next) => {
  const { shortFloat, shortSharesChangePastMonth, quantRating, sellSideRating, revisionsRating, valueRating, growthRating, profitabilityRating, momentumRating, ownedByInsiders, transcript, creator } = req.body;

  const createdSentiment = new Sentiment({
    shortFloat, shortSharesChangePastMonth, quantRating, sellSideRating, revisionsRating, valueRating, growthRating, profitabilityRating, momentumRating, ownedByInsiders, transcript, creator });

  let user;
  let relevantTranscript;
  try {
    user = await User.findById(creator);
    relevantTranscript = await Transcript.findById(transcript);
  } catch (err) {
    const error = new HttpError(
      'Could not fetch user or sentiment, please try again.',
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

  if (!relevantTranscript) {
    const error = new HttpError(
      'Could not find sentiment for provided id.',
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdSentiment.save({ session: sess});
    user.sentimentReports.push(createdSentiment._id);
    await relevantTranscript.updateOne({"$push": {"sentimentReports": createdSentiment._id}})
    await user.save({session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating report failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({sentiment: createdSentiment.toObject({ getters: true }) });
}

const updateSentiment = async (req, res, next) => {
  const { shortFloat, shortSharesChangePastMonth, quantRating, sellSideRating, revisionsRating, valueRating, growthRating, profitabilityRating, momentumRating, ownedByInsiders, sentimentId, creator } = req.body;


  let sentiment;
  try {
    sentiment = await Sentiment.findById(sentimentId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  if (sentiment.creator.toString() !== creator) {
    const error = new HttpError('You are not allowed to edit this report.', 401);
    return next(error);
  }

  sentiment.shortFloat = shortFloat;
  sentiment.shortSharesChangePastMonth = shortSharesChangePastMonth;
  sentiment.quantRating = quantRating;
  sentiment.sellSideRating = sellSideRating;
  sentiment.revisionsRating = revisionsRating;
  sentiment.valueRating = valueRating;
  sentiment.growthRating = growthRating;
  sentiment.profitabilityRating = profitabilityRating;
  sentiment.momentumRating = momentumRating;
  sentiment.ownedByInsiders = ownedByInsiders;

  try {
    await sentiment.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  res.status(200).json({ sentiment: sentiment.toObject({ getters: true }) });
};

exports.getSentimentByUserAndTranscriptId = getSentimentByUserAndTranscriptId;
exports.createSentiment = createSentiment;
exports.updateSentiment = updateSentiment;