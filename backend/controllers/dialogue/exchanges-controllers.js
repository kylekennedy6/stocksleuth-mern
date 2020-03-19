const HttpError = require('../../models/http-error');

const User = require('../../models/user');
const Exchange = require('../../models/exchange/exchange');
const ExchangeRating = require('../../models/exchange/exchangeRating');

const getHighlyRatedExchanges = async (req, res, next) => {
  const user = req.userData.userId
  const transcriptId = req.params.transcriptId;
  let highlyRatedExchanges;
  let exchangesWithUserExchangeRatings;
  try {
    const transcriptExchanges = await Exchange.find({"transcript": transcriptId});
    let transcriptExchangesIds = [];
    transcriptExchanges.map( exchange => {transcriptExchangesIds.push(exchange._id)});
    let highlyRatedExchangeRatings = await ExchangeRating.find({"creator": user, "overallRating": {$regex : ".*Likely.*"}, "exchange" : {"$in" : transcriptExchangesIds}}).select('_id');
    let highlyRatedExchangeRatingsIds = [];
    highlyRatedExchangeRatings.map( rating => {highlyRatedExchangeRatingsIds.push(rating._id)})
    let allExchangeRatings = await ExchangeRating.find({"creator": user, "exchange" : {"$in" : transcriptExchangesIds}}).select('_id');
    let allExchangeRatingsIds = [];
    allExchangeRatings.map( rating => {allExchangeRatingsIds.push(rating._id)})
    highlyRatedExchanges = await Exchange.find({ $or: [{'exchangeRatings': {"$in": highlyRatedExchangeRatingsIds}}, {"transcript": transcriptId, "programmaticRating": {"$gt": 3}, "exchangeRatings": {"$nin": allExchangeRatingsIds}}]}).populate('exchangeRatings').sort('-programmaticRating');
    exchangesWithUserExchangeRatings = highlyRatedExchanges.map(exchange => exchange.toObject({ getters: true }));
    for (let i = 0; i < allExchangeRatingsIds.length; i++){
      allExchangeRatingsIds[i] = allExchangeRatingsIds[i].toString();
    }
    for (let i = 0; i < exchangesWithUserExchangeRatings.length; i++){
      let exchange = exchangesWithUserExchangeRatings[i];
      for (let j = 0; j < exchange.exchangeRatings.length; j++){
        let exchangeRating = exchange.exchangeRatings[j];
        if (allExchangeRatingsIds.includes(exchangeRating.id)){
          exchange["userExchangeRating"] = exchangeRating;
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
  res.json({ exchangesWithUserExchangeRatings });
}

const getExchangesByTranscriptIdAndUsername = async (req, res, next) => {
  const user = req.userData.userId
  const transcriptId = req.params.transcriptId;
  let exchangesWithUserExchangeRatings;
  try {
    const transcriptExchanges = await Exchange.find({"transcript": transcriptId}).sort('number').populate('exchangeRatings');
    let transcriptExchangesIds = [];
    transcriptExchanges.map( exchange => {transcriptExchangesIds.push(exchange._id)});
    let allExchangeRatings = await ExchangeRating.find({"creator": user, "exchange" : {"$in" : transcriptExchangesIds}}).select('_id');
    let allExchangeRatingsIds = [];
    allExchangeRatings.map( rating => {allExchangeRatingsIds.push(rating._id)})
    exchangesWithUserExchangeRatings = transcriptExchanges.map(exchange => exchange.toObject({ getters: true }));
    for (let i = 0; i < allExchangeRatingsIds.length; i++){
      allExchangeRatingsIds[i] = allExchangeRatingsIds[i].toString();
    }
    for (let i = 0; i < exchangesWithUserExchangeRatings.length; i++){
      let exchange = exchangesWithUserExchangeRatings[i];
      for (let j = 0; j < exchange.exchangeRatings.length; j++){
        let exchangeRating = exchange.exchangeRatings[j];
        if (allExchangeRatingsIds.includes(exchangeRating.id)){
          exchange["userExchangeRating"] = exchangeRating;
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
  res.json({ exchangesWithUserExchangeRatings });
}

const getPrimaryEvidenceExchanges = async (req, res, next) => {
  const user = req.userData.userId
  const transcriptId = req.params.transcriptId;
  let primaryEvidenceExchanges;
  let exchangesWithUserExchangeRatings;
  try {
    const transcriptExchanges = await Exchange.find({"transcript": transcriptId});
    let transcriptExchangesIds = [];
    transcriptExchanges.map( exchange => {transcriptExchangesIds.push(exchange._id)});
    let primaryEvidenceExchangeRatings = await ExchangeRating.find({"creator": user, "primaryEvidence": true, "exchange" : {"$in" : transcriptExchangesIds}}).select('_id');
    let primaryEvidenceExchangeRatingsIds = [];
    primaryEvidenceExchangeRatings.map( rating => {primaryEvidenceExchangeRatingsIds.push(rating._id)})
    let allExchangeRatings = await ExchangeRating.find({"creator": user, "exchange" : {"$in" : transcriptExchangesIds}}).select('_id');
    let allExchangeRatingsIds = [];
    allExchangeRatings.map( rating => {allExchangeRatingsIds.push(rating._id)})
    primaryEvidenceExchanges = await Exchange.find({'exchangeRatings': {"$in": primaryEvidenceExchangeRatingsIds}}).populate('exchangeRatings');
    exchangesWithUserExchangeRatings = primaryEvidenceExchanges.map(exchange => exchange.toObject({ getters: true }));
    for (let i = 0; i < allExchangeRatingsIds.length; i++){
      allExchangeRatingsIds[i] = allExchangeRatingsIds[i].toString();
    }
    for (let i = 0; i < exchangesWithUserExchangeRatings.length; i++){
      let exchange = exchangesWithUserExchangeRatings[i];
      for (let j = 0; j < exchange.exchangeRatings.length; j++){
        let exchangeRating = exchange.exchangeRatings[j];
        if (allExchangeRatingsIds.includes(exchangeRating.id)){
          exchange["userExchangeRating"] = exchangeRating;
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
  res.json({ exchangesWithUserExchangeRatings });
}

exports.getHighlyRatedExchanges = getHighlyRatedExchanges;
exports.getExchangesByTranscriptIdAndUsername = getExchangesByTranscriptIdAndUsername;
exports.getPrimaryEvidenceExchanges = getPrimaryEvidenceExchanges;