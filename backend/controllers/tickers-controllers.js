const HttpError = require('../models/http-error');
const Ticker = require('../models/ticker');
const Transcript = require('../models/transcript/transcript');

const getTickerByTranscriptId = async (req, res, next) => {
  transcriptId = req.params.transcriptId;
  let ticker;
  
  try {
    transcript = await Transcript.findById(transcriptId);
    ticker = await Ticker.findById(transcript["ticker"]);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a ticker associated with the given transcript id.', 
      500
    );
    return next(error);
  }

  if (!ticker) {
    const error = new HttpError(
      'Could not find a ticker for the provided transcript id.', 
      404
    );
  }

  res.json({ticker: ticker.toObject( {getters: true }) });
};

exports.getTickerByTranscriptId = getTickerByTranscriptId;