const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const GuidanceVersusConsensus = require('../../models/analysis/guidanceVersusConsensus');
const Transcript = require('../../models/transcript/transcript');
const User = require('../../models/user');

const getGuidanceVersusConsensusByUserAndTranscriptId =  async (req, res, next) => {
  const transcriptId = req.params.transcriptId;
  const username = req.params.username;

  let guidanceVersusConsensus;
  let user;
  let userId;
  try {
    user = await User.findOne({"username": username });
    userId = user._id
    guidanceVersusConsensus = await GuidanceVersusConsensus.findOne({"transcript": transcriptId, "creator": userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching report failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (!guidanceVersusConsensus) {
    guidanceVersusConsensus = [];
    res.json({guidanceVersusConsensus: []});
  } else {
  res.json({guidanceVersusConsensus: guidanceVersusConsensus.toObject( {getters: true }) });
  }
};

const createGuidanceVersusConsensus = async (req, res, next) => {
  const { nextQuarterTLGuidanceLE, nextQuarterTLGuidanceHE, nextQuarterTLCons, nextQuarterTLMidpointVsCons, 
    nextQuarterBLGuidanceLE, nextQuarterBLGuidanceHE, nextQuarterBLCons, nextQuarterBLMidpointVsCons, 
    fullYearTLGuidanceLE, fullYearTLGuidanceHE, fullYearTLCons, fullYearTLMidpointVsCons, 
    fullYearBLGuidanceLE, fullYearBLGuidanceHE, fullYearBLCons, fullYearBLMidpointVsCons,
    transcript, creator } = req.body;

  const createdGuidanceVersusConsensus = new GuidanceVersusConsensus({
    nextQuarterTLGuidanceLE, nextQuarterTLGuidanceHE, nextQuarterTLCons, nextQuarterTLMidpointVsCons, 
    nextQuarterBLGuidanceLE, nextQuarterBLGuidanceHE, nextQuarterBLCons, nextQuarterBLMidpointVsCons, 
    fullYearTLGuidanceLE, fullYearTLGuidanceHE, fullYearTLCons, fullYearTLMidpointVsCons, 
    fullYearBLGuidanceLE, fullYearBLGuidanceHE, fullYearBLCons, fullYearBLMidpointVsCons,
    transcript, creator });

  let user;
  let relevantTranscript;
  try {
    user = await User.findById(creator);
    relevantTranscript = await Transcript.findById(transcript);
  } catch (err) {
    const error = new HttpError(
      'Could not fetch user or guidanceVersusConsensus, please try again.',
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
      'Could not find guidanceVersusConsensus for provided id.',
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdGuidanceVersusConsensus.save({ session: sess});
    user.guidanceVersusConsensusReports.push(createdGuidanceVersusConsensus._id);
    await relevantTranscript.updateOne({"$push": {"guidanceVersusConsensusReports": createdGuidanceVersusConsensus._id}})
    await user.save({session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating report failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({guidanceVersusConsensus: createdGuidanceVersusConsensus.toObject({ getters: true }) });
}

const updateGuidanceVersusConsensus = async (req, res, next) => {
  console.log("HERE")
  const { nextQuarterTLGuidanceLE, nextQuarterTLGuidanceHE, nextQuarterTLCons, nextQuarterTLMidpointVsCons, 
    nextQuarterBLGuidanceLE, nextQuarterBLGuidanceHE, nextQuarterBLCons, nextQuarterBLMidpointVsCons, 
    fullYearTLGuidanceLE, fullYearTLGuidanceHE, fullYearTLCons, fullYearTLMidpointVsCons, 
    fullYearBLGuidanceLE, fullYearBLGuidanceHE, fullYearBLCons, fullYearBLMidpointVsCons, 
    guidanceVersusConsensusId, creator } = req.body;

  let guidanceVersusConsensus;
  try {
    guidanceVersusConsensus = await GuidanceVersusConsensus.findById(guidanceVersusConsensusId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  if (guidanceVersusConsensus.creator.toString() !== creator) {
    const error = new HttpError('You are not allowed to edit this report.', 401);
    return next(error);
  }

  guidanceVersusConsensus.nextQuarterTLGuidanceLE = nextQuarterTLGuidanceLE;
  guidanceVersusConsensus.nextQuarterTLGuidanceHE = nextQuarterTLGuidanceHE;
  guidanceVersusConsensus.nextQuarterTLCons = nextQuarterTLCons;
  guidanceVersusConsensus.nextQuarterTLMidpointVsCons = nextQuarterTLMidpointVsCons;
  guidanceVersusConsensus.nextQuarterBLGuidanceLE = nextQuarterBLGuidanceLE;
  guidanceVersusConsensus.nextQuarterBLGuidanceHE = nextQuarterBLGuidanceHE;
  guidanceVersusConsensus.nextQuarterBLCons = nextQuarterBLCons;
  guidanceVersusConsensus.nextQuarterBLMidpointVsCons = nextQuarterBLMidpointVsCons;
  guidanceVersusConsensus.fullYearTLGuidanceLE = fullYearTLGuidanceLE;
  guidanceVersusConsensus.fullYearTLGuidanceHE = fullYearTLGuidanceHE;
  guidanceVersusConsensus.fullYearTLCons = fullYearTLCons;
  guidanceVersusConsensus.fullYearTLMidpointVsCons = fullYearTLMidpointVsCons;
  guidanceVersusConsensus.fullYearBLGuidanceLE = fullYearBLGuidanceLE;
  guidanceVersusConsensus.fullYearBLGuidanceHE = fullYearBLGuidanceHE;
  guidanceVersusConsensus.fullYearBLCons = fullYearBLCons;
  guidanceVersusConsensus.fullYearBLMidpointVsCons = fullYearBLMidpointVsCons;

  try {
    await guidanceVersusConsensus.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  res.status(200).json({ guidanceVersusConsensus: guidanceVersusConsensus.toObject({ getters: true }) });
};

exports.getGuidanceVersusConsensusByUserAndTranscriptId = getGuidanceVersusConsensusByUserAndTranscriptId;
exports.createGuidanceVersusConsensus = createGuidanceVersusConsensus;
exports.updateGuidanceVersusConsensus = updateGuidanceVersusConsensus;