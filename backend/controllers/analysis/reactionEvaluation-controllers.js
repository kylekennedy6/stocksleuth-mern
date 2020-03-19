const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const ReactionEvaluation = require('../../models/analysis/reactionEvaluation');
const Transcript = require('../../models/transcript/transcript');
const User = require('../../models/user');

const getReactionEvaluationByUserAndTranscriptId =  async (req, res, next) => {
  const transcriptId = req.params.transcriptId;
  const username = req.params.username;

  let reactionEvaluation;
  let user;
  let userId;
  try {
    user = await User.findOne({"username": username });
    userId = user._id
    reactionEvaluation = await ReactionEvaluation.findOne({"transcript": transcriptId, "creator": userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching report failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (!reactionEvaluation) {
    reactionEvaluation = [];
    res.json({reactionEvaluation: []});
  } else {
  res.json({reactionEvaluation: reactionEvaluation.toObject( {getters: true }) });
  }
};

const createReactionEvaluation = async (req, res, next) => {
  const { actualPortfolioWeight, entranceDate, exitDate, singleDayReturn, actualReturn, returnOnPortfolio, notes, transcript, creator } = req.body;

  const createdReactionEvaluation = new ReactionEvaluation({
    actualPortfolioWeight, 
    entranceDate, 
    exitDate, 
    singleDayReturn, 
    actualReturn, 
    returnOnPortfolio, 
    notes, 
    transcript, 
    creator });

  let user;
  let relevantTranscript;
  try {
    user = await User.findById(creator);
    relevantTranscript = await Transcript.findById(transcript);
  } catch (err) {
    const error = new HttpError(
      'Could not fetch user or reactionEvaluation, please try again.',
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
      'Could not find reactionEvaluation for provided id.',
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdReactionEvaluation.save({ session: sess});
    console.log(user)
    user.reactionEvaluations.push(createdReactionEvaluation._id);
    await relevantTranscript.updateOne({"$push": {"reactionEvaluationReports": createdReactionEvaluation._id}})
    await user.save({session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating report failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({reactionEvaluation: createdReactionEvaluation.toObject({ getters: true }) });
}

const updateReactionEvaluation = async (req, res, next) => {
  const { actualPortfolioWeight, entranceDate, exitDate, singleDayReturn, actualReturn, returnOnPortfolio, notes, reactionEvaluationId, creator } = req.body;


  let reactionEvaluation;
  try {
    reactionEvaluation = await ReactionEvaluation.findById(reactionEvaluationId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  if (reactionEvaluation.creator.toString() !== creator) {
    const error = new HttpError('You are not allowed to edit this report.', 401);
    return next(error);
  }

  reactionEvaluation.actualPortfolioWeight = actualPortfolioWeight;
  reactionEvaluation.entranceDate = entranceDate;
  reactionEvaluation.exitDate = exitDate;
  reactionEvaluation.singleDayReturn = singleDayReturn;
  reactionEvaluation.actualReturn = actualReturn;
  reactionEvaluation.returnOnPortfolio = returnOnPortfolio;
  reactionEvaluation.notes = notes;
  try {
    console.log(reactionEvaluation)
    await reactionEvaluation.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  res.status(200).json({ reactionEvaluation: reactionEvaluation.toObject({ getters: true }) });
};

exports.getReactionEvaluationByUserAndTranscriptId = getReactionEvaluationByUserAndTranscriptId;
exports.createReactionEvaluation = createReactionEvaluation;
exports.updateReactionEvaluation = updateReactionEvaluation;