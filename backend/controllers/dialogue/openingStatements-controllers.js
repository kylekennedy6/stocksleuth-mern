const HttpError = require('../../models/http-error');

const User = require('../../models/user');
const OpeningStatement = require('../../models/openingStatement/openingStatement');
const OpeningStatementRating = require ('../../models/openingStatement/openingStatementRating');

const getHighlyRatedOpeningStatements = async (req, res, next) => {
  const user = req.userData.userId
  const transcriptId = req.params.transcriptId;
  let highlyRatedOpeningStatements;
  let openingStatementsWithUserOpeningStatementRatings;
  try {
    const transcriptOpeningStatements = await OpeningStatement.find({"transcript": transcriptId});
    let transcriptOpeningStatementsIds = [];
    transcriptOpeningStatements.map( openingStatement => {transcriptOpeningStatementsIds.push(openingStatement._id)});
    let highlyRatedOpeningStatementRatings = await OpeningStatementRating.find({"creator": user, "rating": {$regex : ".*Guidance.*"}, "openingStatement" : {"$in" : transcriptOpeningStatementsIds}}).select('_id');
    let highlyRatedOpeningStatementRatingsIds = [];
    highlyRatedOpeningStatementRatings.map( rating => {highlyRatedOpeningStatementRatingsIds.push(rating._id)})
    let allOpeningStatementRatings = await OpeningStatementRating.find({"creator": user, "openingStatement" : {"$in" : transcriptOpeningStatementsIds}}).select('_id');
    let allOpeningStatementRatingsIds = [];
    allOpeningStatementRatings.map( rating => {allOpeningStatementRatingsIds.push(rating._id)})
    highlyRatedOpeningStatements = await OpeningStatement.find({ $or: [{'openingStatementRatings': {"$in": highlyRatedOpeningStatementRatingsIds}}, {"transcript": transcriptId, "programmaticRating": {"$gt": 2}, "openingStatementRatings": {"$nin": allOpeningStatementRatingsIds}}]}).populate('openingStatementRatings');
    openingStatementsWithUserOpeningStatementRatings = highlyRatedOpeningStatements.map(openingStatement => openingStatement.toObject({ getters: true }));
    for (let i = 0; i < allOpeningStatementRatingsIds.length; i++){
      allOpeningStatementRatingsIds[i] = allOpeningStatementRatingsIds[i].toString();
    }
    for (let i = 0; i < openingStatementsWithUserOpeningStatementRatings.length; i++){
      let openingStatement = openingStatementsWithUserOpeningStatementRatings[i];
      for (let j = 0; j < openingStatement.openingStatementRatings.length; j++){
        let openingStatementRating = openingStatement.openingStatementRatings[j];
        if (allOpeningStatementRatingsIds.includes(openingStatementRating.id)){
          openingStatement["userOpeningStatementRating"] = openingStatementRating;
          break;
        }
      }
    }

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find highly rated openingStatements.', 
      500
    );
    return next(error);
  }
  res.json({ openingStatementsWithUserOpeningStatementRatings });
}

const getOpeningStatementsByTranscriptIdAndUsername = async (req, res, next) => {
  const user = req.userData.userId
  const transcriptId = req.params.transcriptId;
  let openingStatementsWithUserOpeningStatementRatings;
  try {
    const transcriptOpeningStatements = await OpeningStatement.find({"transcript": transcriptId}).sort('number').populate('openingStatementRatings');
    let transcriptOpeningStatementsIds = [];
    transcriptOpeningStatements.map( openingStatement => {transcriptOpeningStatementsIds.push(openingStatement._id)});
    let allOpeningStatementRatings = await OpeningStatementRating.find({"creator": user, "openingStatement" : {"$in" : transcriptOpeningStatementsIds}}).select('_id');
    let allOpeningStatementRatingsIds = [];
    allOpeningStatementRatings.map( rating => {allOpeningStatementRatingsIds.push(rating._id)})
    openingStatementsWithUserOpeningStatementRatings = transcriptOpeningStatements.map(openingStatement => openingStatement.toObject({ getters: true }));
    for (let i = 0; i < allOpeningStatementRatingsIds.length; i++){
      allOpeningStatementRatingsIds[i] = allOpeningStatementRatingsIds[i].toString();
    }
    for (let i = 0; i < openingStatementsWithUserOpeningStatementRatings.length; i++){
      let openingStatement = openingStatementsWithUserOpeningStatementRatings[i];
      for (let j = 0; j < openingStatement.openingStatementRatings.length; j++){
        let openingStatementRating = openingStatement.openingStatementRatings[j];
        if (allOpeningStatementRatingsIds.includes(openingStatementRating.id)){
          openingStatement["userOpeningStatementRating"] = openingStatementRating;
          break;
        }
      }
    }

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find highly rated openingStatements.', 
      500
    );
    return next(error);
  }
  res.json({ openingStatementsWithUserOpeningStatementRatings });
}

const getPrimaryEvidenceOpeningStatements = async (req, res, next) => {
  const user = req.userData.userId
  const transcriptId = req.params.transcriptId;
  let primaryEvidenceOpeningStatements;
  let openingStatementsWithUserOpeningStatementRatings;
  try {
    const transcriptOpeningStatements = await OpeningStatement.find({"transcript": transcriptId});
    let transcriptOpeningStatementsIds = [];
    transcriptOpeningStatements.map( openingStatement => {transcriptOpeningStatementsIds.push(openingStatement._id)});
    let primaryEvidenceOpeningStatementRatings = await OpeningStatementRating.find({"creator": user, "primaryEvidence": true, "openingStatement" : {"$in" : transcriptOpeningStatementsIds}}).select('_id');
    let primaryEvidenceOpeningStatementRatingsIds = [];
    primaryEvidenceOpeningStatementRatings.map( rating => {primaryEvidenceOpeningStatementRatingsIds.push(rating._id)})
    let allOpeningStatementRatings = await OpeningStatementRating.find({"creator": user, "openingStatement" : {"$in" : transcriptOpeningStatementsIds}}).select('_id');
    let allOpeningStatementRatingsIds = [];
    allOpeningStatementRatings.map( rating => {allOpeningStatementRatingsIds.push(rating._id)})
    primaryEvidenceOpeningStatements = await OpeningStatement.find({'openingStatementRatings': {"$in": primaryEvidenceOpeningStatementRatingsIds}}).populate('openingStatementRatings');
    openingStatementsWithUserOpeningStatementRatings = primaryEvidenceOpeningStatements.map(openingStatement => openingStatement.toObject({ getters: true }));
    for (let i = 0; i < allOpeningStatementRatingsIds.length; i++){
      allOpeningStatementRatingsIds[i] = allOpeningStatementRatingsIds[i].toString();
    }
    for (let i = 0; i < openingStatementsWithUserOpeningStatementRatings.length; i++){
      let openingStatement = openingStatementsWithUserOpeningStatementRatings[i];
      for (let j = 0; j < openingStatement.openingStatementRatings.length; j++){
        let openingStatementRating = openingStatement.openingStatementRatings[j];
        if (allOpeningStatementRatingsIds.includes(openingStatementRating.id)){
          openingStatement["userOpeningStatementRating"] = openingStatementRating;
          break;
        }
      }
    }

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find highly rated openingStatements.', 
      500
    );
    return next(error);
  }
  res.json({ openingStatementsWithUserOpeningStatementRatings });
}

exports.getHighlyRatedOpeningStatements = getHighlyRatedOpeningStatements;
exports.getOpeningStatementsByTranscriptIdAndUsername = getOpeningStatementsByTranscriptIdAndUsername;
exports.getPrimaryEvidenceOpeningStatements = getPrimaryEvidenceOpeningStatements;