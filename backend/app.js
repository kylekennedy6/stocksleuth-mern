const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); mongoose.set('useCreateIndex', true);
require('dotenv').config();

const tickersRoutes = require('./routes/tickers-routes');
const transcriptsRoutes = require('./routes/transcripts-routes');
const usersRoutes = require('./routes/users-routes');
const exchangesRoutes = require('./routes/dialogue/exchanges-routes');
const exchangeRatingsRoutes = require('./routes/rating/exchangeRatings-routes');
const openingStatementsRoutes = require('./routes/dialogue/openingStatements-routes');
const openingStatementRatingsRoutes = require('./routes/rating/openingStatementRatings-routes');
const transcriptRatingsRoutes = require('./routes/rating/transcriptRatings-routes');
const guidanceVersusConsensusRoutes = require ('./routes/analysis/guidanceVersusConsensus-routes');
const pastEventRoutes = require ('./routes/analysis/pastEvent-routes');
const reactionEvaluationRoutes = require ('./routes/analysis/reactionEvaluation-routes');
const sentimentRoutes = require ('./routes/analysis/sentiment-routes');
const tendenciesRoutes = require ('./routes/analysis/tendencies-routes');
const tradeSubmissionRoutes = require ('./routes/analysis/tradeSubmission-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
  next();
});

app.use('/api/tickers', tickersRoutes);
app.use('/api/transcripts', transcriptsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/exchanges', exchangesRoutes);
app.use('/api/exchangeRatings', exchangeRatingsRoutes);
app.use('/api/openingStatements', openingStatementsRoutes);
app.use('/api/openingStatementRatings', openingStatementRatingsRoutes);
app.use('/api/transcriptRatings', transcriptRatingsRoutes);
app.use('/api/guidanceVersusConsensus', guidanceVersusConsensusRoutes);
app.use('/api/pastEvent', pastEventRoutes);
app.use('/api/reactionEvaluation', reactionEvaluationRoutes);
app.use('/api/sentiment', sentimentRoutes);
app.use('/api/tendencies', tendenciesRoutes);
app.use('/api/tradeSubmission', tradeSubmissionRoutes);


app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-9rura.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err)
  });
