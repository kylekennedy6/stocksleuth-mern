const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const OpeningStatementRating = require('../../models/openingStatement/openingStatementRating');
const OpeningStatement = require('../../models/openingStatement/openingStatement');
const User = require('../../models/user');

const getOpeningStatementRatingByUserAndOpeningStatementId =  async (req, res, next) => {
  const openingStatementId = req.params.openingStatementId;
  const username = req.params.username;

  let openingStatementRating;
  try {
    user = await User.findOne({"username": username });
    const userId = user._id
    openingStatementRating = await OpeningStatementRating.findOne({"creator": userId, "openingStatement": openingStatementId });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find an opening statement rating with the given transcript id and username.', 
      500
    );
    return next(error);
  }

  if (!openingStatementRating) {
    const error = new HttpError(
      'Could not find an openingStatement rating for the provided opening statement rating id.', 
      404
    );
  }

  res.json({openingStatementRating: openingStatementRating.toObject( {getters: true }) });
};

const createOpeningStatementRating = async (req, res, next) => {
  const { rating, primaryEvidence, contraryEvidence, openingStatement, creator } = req.body;
  const createdOpeningStatementRating = new OpeningStatementRating({
    rating,
    primaryEvidence,
    contraryEvidence,
    openingStatement,
    creator
  });


  let user;
  let ratedOpeningStatement;
  try {
    user = await User.findById(creator);
    ratedOpeningStatement = await OpeningStatement.findById(openingStatement);
  } catch (err) {
    const error = new HttpError(
      'Could not fetch user or openingStatement, please try again.',
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

  if (!ratedOpeningStatement) {
    const error = new HttpError(
      'Could not find opening statement for provided id.',
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdOpeningStatementRating.save({ session: sess});
    user.openingStatementRatings.push(createdOpeningStatementRating._id);
    await ratedOpeningStatement.updateOne({"$push": {"openingStatementRatings": createdOpeningStatementRating._id}})
    await user.save({session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating opening statement rating failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({openingStatementRating: createdOpeningStatementRating.toObject({ getters: true }) });
}

const updateOpeningStatementRating = async (req, res, next) => {
  const { rating, primaryEvidence, contraryEvidence, openingStatementRatingId, creator } = req.body;

  let openingStatementRating;
  try {
    openingStatementRating = await OpeningStatementRating.findById(openingStatementRatingId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update openingStatement rating.',
      500
    );
    return next(error);
  }

  if (openingStatementRating.creator.toString() !== creator) {
    const error = new HttpError('You are not allowed to edit this openingStatement rating.', 401);
    return next(error);
  }

  openingStatementRating.rating = rating;
  openingStatementRating.primaryEvidence = primaryEvidence;
  openingStatementRating.contraryEvidence = contraryEvidence;

  try {
    await openingStatementRating.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update openingStatement rating.',
      500
    );
    return next(error);
  }

  res.status(200).json({ openingStatementRating: openingStatementRating.toObject({ getters: true }) });
};

exports.getOpeningStatementRatingByUserAndOpeningStatementId = getOpeningStatementRatingByUserAndOpeningStatementId;
exports.createOpeningStatementRating = createOpeningStatementRating;
exports.updateOpeningStatementRating = updateOpeningStatementRating;