const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const ExchangeRating = require('../../models/exchange/exchangeRating');
const Exchange = require('../../models/exchange/exchange');
const User = require('../../models/user');

const getExchangeRatingByUserAndExchangeId =  async (req, res, next) => {
  const exchangeId = req.params.exchangeId;
  const username = req.params.username;

  let exchangeRating;
  try {
    user = await User.findOne({"username": username });
    const userId = user._id
    exchangeRating = await ExchangeRating.findOne({"creator": userId, "exchange": exchangeId });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find an exchange rating with the given transcript id and username.', 
      500
    );
    return next(error);
  }

  if (!exchangeRating) {
    const error = new HttpError(
      'Could not find an exchange rating for the provided exchange rating id.', 
      404
    );
    res.json({exchangeRating})
  } else {
    res.json({exchangeRating: exchangeRating.toObject( {getters: true }) });
  }
};

const createExchangeRating = async (req, res, next) => {
  const { contextRating, questionRating, overallRating, primaryEvidence, contraryEvidence, exchange, creator } = req.body;
  const createdExchangeRating = new ExchangeRating({
    contextRating,
    questionRating,
    overallRating,
    primaryEvidence,
    contraryEvidence,
    exchange,
    creator
  });


  let user;
  let ratedExchange;
  try {
    user = await User.findById(creator);
    ratedExchange = await Exchange.findById(exchange);
    console.log(user)
    console.log(ratedExchange)
  } catch (err) {
    const error = new HttpError(
      'Could not fetch user or exchange, please try again.',
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

  if (!ratedExchange) {
    const error = new HttpError(
      'Could not find exchange for provided id.',
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdExchangeRating.save({ session: sess});
    user.exchangeRatings.push(createdExchangeRating._id);
    await ratedExchange.updateOne({"$push": {"exchangeRatings": createdExchangeRating._id}})
    await user.save({session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating exchange rating failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({exchangeRating: createdExchangeRating.toObject({ getters: true }) });
}

const updateExchangeRating = async (req, res, next) => {
  const { contextRating, questionRating, overallRating, primaryEvidence, contraryEvidence, exchangeRatingId, creator } = req.body;

  let exchangeRating;
  try {
    exchangeRating = await ExchangeRating.findById(exchangeRatingId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update exchange rating.',
      500
    );
    return next(error);
  }

  if (exchangeRating.creator.toString() !== creator) {
    const error = new HttpError('You are not allowed to edit this exchange rating.', 401);
    return next(error);
  }

  exchangeRating.contextRating = contextRating;
  exchangeRating.questionRating = questionRating;
  exchangeRating.overallRating = overallRating;
  exchangeRating.primaryEvidence = primaryEvidence;
  exchangeRating.contraryEvidence = contraryEvidence;

  try {
    await exchangeRating.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update exchange rating.',
      500
    );
    return next(error);
  }

  res.status(200).json({ exchangeRating: exchangeRating.toObject({ getters: true }) });
};

exports.getExchangeRatingByUserAndExchangeId = getExchangeRatingByUserAndExchangeId;
exports.createExchangeRating = createExchangeRating;
exports.updateExchangeRating = updateExchangeRating;