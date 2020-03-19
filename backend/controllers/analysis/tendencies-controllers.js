const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const Tendencies = require('../../models/analysis/tendencies');
const Transcript = require('../../models/transcript/transcript');
const User = require('../../models/user');

const getTendenciesByUserAndTranscriptId =  async (req, res, next) => {
  const transcriptId = req.params.transcriptId;
  const username = req.params.username;

  let tendencies;
  let user;
  let userId;
  try {
    user = await User.findOne({"username": username });
    userId = user._id
    tendencies = await Tendencies.findOne({"transcript": transcriptId, "creator": userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching report failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (!tendencies) {
    tendencies = [];
    res.json({tendencies: []});
  } else {
  res.json({tendencies: tendencies.toObject( {getters: true }) });
  }
};

const createTendencies = async (req, res, next) => {
  const { beatsPastTwoYears, missesPastTwoYears, sameEventRaisesPastThree, sameEventCutsPastThree, transcript, creator } = req.body;

  const createdTendencies = new Tendencies({
    beatsPastTwoYears, missesPastTwoYears, sameEventRaisesPastThree, sameEventCutsPastThree, transcript, creator });
  
  let user;
  let relevantTranscript;
  try {
    user = await User.findById(creator);
    relevantTranscript = await Transcript.findById(transcript);
    console.log(user)
    console.log(relevantTranscript)
  } catch (err) {
    const error = new HttpError(
      'Could not fetch user or tendencies, please try again.',
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
      'Could not find tendencies for provided id.',
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTendencies.save({ session: sess});
    user.tendenciesReports.push(createdTendencies._id);
    await relevantTranscript.updateOne({"$push": {"tendenciesReports": createdTendencies._id}})
    await user.save({session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating report failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({tendencies: createdTendencies.toObject({ getters: true }) });
}

const updateTendencies = async (req, res, next) => {
  console.log("HERE")
  const { beatsPastTwoYears, missesPastTwoYears, sameEventRaisesPastThree, sameEventCutsPastThree, tendenciesId, creator } = req.body;

  let tendencies;
  try {
    tendencies = await Tendencies.findById(tendenciesId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  if (tendencies.creator.toString() !== creator) {
    const error = new HttpError('You are not allowed to edit this report.', 401);
    return next(error);
  }

  tendencies.beatsPastTwoYears = beatsPastTwoYears;
  tendencies.missesPastTwoYears = missesPastTwoYears;
  tendencies.sameEventRaisesPastThree = sameEventRaisesPastThree;
  tendencies.sameEventCutsPastThree = sameEventCutsPastThree;

  try {
    await tendencies.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  res.status(200).json({ tendencies: tendencies.toObject({ getters: true }) });
};

exports.getTendenciesByUserAndTranscriptId = getTendenciesByUserAndTranscriptId;
exports.createTendencies = createTendencies;
exports.updateTendencies = updateTendencies;