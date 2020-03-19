const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const PastEvent = require('../../models/analysis/pastEvent');
const Ticker = require('../../models/ticker');
const Transcript = require('../../models/transcript/transcript');
const User = require('../../models/user');

const getPastEventsByUserAndTranscriptId =  async (req, res, next) => {
  const transcriptId = req.params.transcriptId;
  const transcript = await Transcript.findById(transcriptId);
  const tickerId = transcript.ticker;
  const username = req.params.username;

  let pastEvents;
  let user;
  let userId;
  try {
    user = await User.findOne({"username": username });
    userId = user._id
    pastEvents = await PastEvent.find({"ticker": tickerId, "creator": userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching report failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (!pastEvents) {
    pastEvent = [];
    res.json({pastEvents: []});
  } else {
  res.json({ pastEvents: pastEvents.map(event => event.toObject({ getters: true })) });
  }
};

const createPastEvent = async (req, res, next) => {
  const { eventType, fiscalQuarter, fiscalYear, reactionDate, revenueVersusConsensus,
    epsVersusConsensus, tlChangeType, tlMidpointChangePercentage, blChangeType, 
    blMidpointChangePercentage, reaction, transcript, creator } = req.body;
  
  let relevantTicker;
  let ticker;
  let createdPastEvent;
  try {
    relevantTicker = await Ticker.findOne({ transcripts: { "$in" : [transcript]}});
    ticker = relevantTicker._id;
    createdPastEvent = new PastEvent({
      eventType, fiscalQuarter, fiscalYear, reactionDate, revenueVersusConsensus,
      epsVersusConsensus, tlChangeType, tlMidpointChangePercentage, blChangeType, 
      blMidpointChangePercentage, reaction, ticker, creator });
  } catch (err) {
    const error = new HttpError(
      'Could not fetch ticker, please try again.'
    );
    return next(error);
  }

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      'Could not fetch user, please try again.',
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

  if (!ticker) {
    const error = new HttpError(
      'Could not find ticker for provided id.',
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPastEvent.save({ session: sess});
    user.pastEvents.push(createdPastEvent._id);
    await relevantTicker.updateOne({"$push": {"pastEvents": createdPastEvent._id}})
    await user.save({session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating report failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({pastEvent: createdPastEvent.toObject({ getters: true }) });
}

const updatePastEvent = async (req, res, next) => {
  const { eventType, fiscalQuarter, fiscalYear, reactionDate, revenueVersusConsensus,
    epsVersusConsensus, tlChangeType, tlMidpointChangePercentage, blChangeType, 
    blMidpointChangePercentage, reaction, pastEventId, creator } = req.body;


  let pastEvent;
  try {
    pastEvent = await PastEvent.findById(pastEventId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  if (pastEvent.creator.toString() !== creator) {
    const error = new HttpError('You are not allowed to edit this report.', 401);
    return next(error);
  }

  pastEvent.eventType = eventType;
  pastEvent.fiscalQuarter = fiscalQuarter;
  pastEvent.fiscalYear = fiscalYear;
  pastEvent.reactionDate = reactionDate;
  pastEvent.reaction = reaction;
  pastEvent.revenueVersusConsensus = revenueVersusConsensus;
  pastEvent.epsVersusConsensus = epsVersusConsensus;
  pastEvent.tlChangeType = tlChangeType;
  pastEvent.tlMidpointChangePercentage = tlMidpointChangePercentage;
  pastEvent.blChangeType = blChangeType;
  pastEvent.blMidpointChangePercentage = blMidpointChangePercentage;

  try {
    await pastEvent.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update report.',
      500
    );
    return next(error);
  }

  res.status(200).json({ pastEvent: pastEvent.toObject({ getters: true }) });
};

exports.getPastEventsByUserAndTranscriptId = getPastEventsByUserAndTranscriptId;
exports.createPastEvent = createPastEvent;
exports.updatePastEvent = updatePastEvent;