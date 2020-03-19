const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const TradeSubmission = require('../../models/analysis/tradeSubmission');
const Transcript = require('../../models/transcript/transcript');
const User = require('../../models/user');

const getTradeSubmissionByUserAndTranscriptId =  async (req, res, next) => {
  const transcriptId = req.params.transcriptId;
  const username = req.params.username;

  let tradeSubmission;
  let user;
  let userId;
  try {
    user = await User.findOne({"username": username });
    userId = user._id
    tradeSubmission = await TradeSubmission.findOne({"transcript": transcriptId, "creator": userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching report failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (!tradeSubmission) {
    tradeSubmission = [];
    res.json({tradeSubmission: []});
  } else {
  res.json({tradeSubmission: tradeSubmission.toObject( {getters: true }) });
  }
};

const getTradeSubmissionTranscriptsByUserId = async (req, res, next) => {
  const user = req.userData.userId
  let today = new Date(Date.now());

  let activeUserTradeSubmissions;
  let tradeSubmissionTranscripts;
  let transcriptsWithTradeSubmission;
  try {
    activeUserTradeSubmissions = await TradeSubmission.find({"creator": user, "entranceDate": {"$gt": today}}).populate('transcript');
    let tradeSubmissionIds = activeUserTradeSubmissions.map( submission => { return submission._id });
    tradeSubmissionTranscripts = await Transcript.find({"tradeSubmissions": {"$in": tradeSubmissionIds}}).populate('ticker tradeSubmissions');
    transcriptsWithTradeSubmission = tradeSubmissionTranscripts.map(transcript => transcript.toObject({ getters: true }));
    for (let i = 0; i < tradeSubmissionIds.length; i++){
      tradeSubmissionIds[i] = tradeSubmissionIds[i].toString();
    }
    for (let i = 0; i < transcriptsWithTradeSubmission.length; i++){
      let transcript = transcriptsWithTradeSubmission[i];
      for (let j = 0; j < transcript.tradeSubmissions.length; j++){
        let tradeSubmission = transcript.tradeSubmissions[j];
        if (tradeSubmissionIds.includes(tradeSubmission.id)){
          transcript["userTradeSubmission"] = tradeSubmission;
          break;
        }
      }
    }

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find highly rated exchanges.', 
      500
    );
    return next(error);
  }
  res.json({ transcriptsWithTradeSubmission });
}

const createTradeSubmission = async (req, res, next) => {
  const { hypothesis, predictionIntervalsHighDownside, predictionIntervalsModerateDownside, predictionIntervalsLowDownside, predictionIntervalsLowUpside, predictionIntervalsModerateUpside, predictionIntervalsHighUpside, direction, targetPortfolioWeight, likelyPreannounce, entranceDate, notes, transcript, creator } = req.body;
  const predictionIntervals = {
    "highDownside": predictionIntervalsHighDownside,
    "moderateDownside": predictionIntervalsModerateDownside,
    "lowDownside": predictionIntervalsLowDownside,
    "lowUpside": predictionIntervalsLowUpside,
    "moderateUpside": predictionIntervalsModerateUpside,
    "highUpside": predictionIntervalsHighUpside,    
  }
  const createdTradeSubmission = new TradeSubmission({
    hypothesis, predictionIntervals, direction, targetPortfolioWeight, likelyPreannounce, entranceDate, notes, transcript, creator });

  let user;
  let relevantTranscript;
  try {
    user = await User.findById(creator);
    relevantTranscript = await Transcript.findById(transcript);
  } catch (err) {
    const error = new HttpError(
      'Could not fetch user or tradeSubmission, please try again.',
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
      'Could not find tradeSubmission for provided id.',
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTradeSubmission.save({ session: sess});
    user.tradeSubmissions.push(createdTradeSubmission._id);
    await relevantTranscript.updateOne({"$push": {"tradeSubmissions": createdTradeSubmission._id}})
    await user.save({session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating report failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({tradeSubmission: createdTradeSubmission.toObject({ getters: true }) });
}

const updateTradeSubmission = async (req, res, next) => {
  const { hypothesis, predictionIntervalsHighDownside,  predictionIntervalsModerateDownside, predictionIntervalsLowDownside, predictionIntervalsLowUpside, predictionIntervalsModerateUpside, predictionIntervalsHighUpside, direction, targetPortfolioWeight, entranceDate, likelyPreannounce, notes, tradeSubmissionId, creator } = req.body;
  const predictionIntervals = {
    "highDownside": predictionIntervalsHighDownside,
    "moderateDownside": predictionIntervalsModerateDownside,
    "lowDownside": predictionIntervalsLowDownside,
    "lowUpside": predictionIntervalsLowUpside,
    "moderateUpside": predictionIntervalsModerateUpside,
    "highUpside": predictionIntervalsHighUpside,    
  }

  let tradeSubmission;
  try {
    tradeSubmission = await TradeSubmission.findById(tradeSubmissionId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  if (tradeSubmission.creator.toString() !== creator) {
    const error = new HttpError('You are not allowed to edit this report.', 401);
    return next(error);
  }

  tradeSubmission.hypothesis = hypothesis;
  tradeSubmission.predictionIntervals = predictionIntervals;
  tradeSubmission.direction = direction;
  tradeSubmission.targetPortfolioWeight = targetPortfolioWeight;
  tradeSubmission.entranceDate = entranceDate;
  tradeSubmission.likelyPreannounce = likelyPreannounce;
  tradeSubmission.notes = notes;

  try {
    await tradeSubmission.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  res.status(200).json({ tradeSubmission: tradeSubmission.toObject({ getters: true }) });
};

exports.getTradeSubmissionTranscriptsByUserId = getTradeSubmissionTranscriptsByUserId;
exports.getTradeSubmissionByUserAndTranscriptId = getTradeSubmissionByUserAndTranscriptId;
exports.createTradeSubmission = createTradeSubmission;
exports.updateTradeSubmission = updateTradeSubmission;