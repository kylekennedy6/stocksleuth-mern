const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const guidanceVersusConsensusSchema = new Schema({
  nextQuarterTLGuidanceLE: { type: Number},
  nextQuarterTLGuidanceHE: { type: Number},
  nextQuarterTLCons: { type: Number},
  nextQuarterTLMidpointVsCons: { type: Number},
  nextQuarterBLGuidanceLE: { type: Number},
  nextQuarterBLGuidanceHE: { type: Number},
  nextQuarterBLCons: { type: Number},
  nextQuarterBLMidpointVsCons: { type: Number},
  fullYearTLGuidanceLE: { type: Number},
  fullYearTLGuidanceHE: { type: Number},
  fullYearTLCons: { type: Number},
  fullYearTLMidpointVsCons: { type: Number},
  fullYearBLGuidanceLE: { type: Number},
  fullYearBLGuidanceHE: { type: Number},
  fullYearBLCons: { type: Number},
  fullYearBLMidpointVsCons: { type: Number},
  transcript: { type: mongoose.Types.ObjectId, required: true, ref: 'Transcript'},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'} 
});

module.exports = mongoose.model('GuidanceVersusConsensus', guidanceVersusConsensusSchema);