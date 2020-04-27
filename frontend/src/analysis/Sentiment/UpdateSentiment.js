import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { SA_RATING_OPTIONS, SA_GRADING_OPTIONS } from '../../shared/util/formOptions';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import '../AnalysisForm.css';

const UpdateSentiment = props => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId;
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [ loadedTranscript, setLoadedTranscript] = useState();
  
  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transcripts/${transcriptId}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedTranscript(responseData.transcript);
      } catch (err) {}
    };
    fetchTranscript();
  }, [sendRequest, auth.token, auth.username, transcriptId]);

  const [quantRating, setQuantRating] = useState(props.quantRating);
  const [sellSideRating, setSellSideRating] = useState(props.sellSideRating);
  const [revisionsRating, setRevisionsRating] = useState(props.revisionsRating);
  const [valueRating, setValueRating] = useState(props.valueRating);
  const [growthRating, setGrowthRating] = useState(props.growthRating);
  const [profitabilityRating, setProfitabilityRating] = useState(props.profitabilityRating);
  const [momentumRating, setMomentumRating] = useState(props.momentumRating);

  const quantRatingChangeHandler = event => {
    setQuantRating(event.target.value);
  };

  const sellSideRatingChangeHandler = event => {
    setSellSideRating(event.target.value);
  };

  const revisionsRatingChangeHandler = event => {
    setRevisionsRating(event.target.value);
  };

  const valueRatingChangeHandler = event => {
    setValueRating(event.target.value);
  };

  const growthRatingChangeHandler = event => {
    setGrowthRating(event.target.value);
  };

  const profitabilityRatingChangeHandler = event => {
    setProfitabilityRating(event.target.value);
  };

  const momentumRatingChangeHandler = event => {
    setMomentumRating(event.target.value);
  };
  
  const [formState, inputHandler] = useForm(
    {
      shortFloat: {
        value: 0,
        isValid: true
      },
      shortSharesChangePastMonth: {
        value: 0,
        isValid: true
      },
      ownedByInsiders: {
        value: 0,
        isValid: true
      }
    },
    false
  );

  const history = useHistory();

  const sentimentSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/sentiment/${props._id}`,
        'PATCH',
        JSON.stringify({
          "shortFloat": formState.inputs.shortFloat.value,
          "shortSharesChangePastMonth": formState.inputs.shortSharesChangePastMonth.value,
          "quantRating": quantRating,
          "sellSideRating": sellSideRating,
          "revisionsRating": revisionsRating,
          "valueRating": valueRating,
          "growthRating": growthRating,
          "profitabilityRating": profitabilityRating,
          "momentumRating": momentumRating,
          "ownedByInsiders": formState.inputs.ownedByInsiders.value,
          "transcript": transcriptId,
          "sentimentId": props._id,
          "creator": auth.userId
        }), {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        });
        history.push('/');
        history.push(`/users/${auth.username}/transcripts/${transcriptId}/sentiment`);
      } catch (err) {}
    };

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <form className="create-form" onSubmit={sentimentSubmitHandler}>
          <h2>Sentiment Data:</h2>
          {isLoading && <LoadingSpinner asOverlay />}
          {!isLoading && loadedTranscript && (<React.Fragment>
          <h4 className="sa-link"><a href={`https://seekingalpha.com/symbol/${loadedTranscript.ticker.tickerText}/ratings/quant-ratings`}>SeekingAlpha Ratings and Grades</a></h4>
          <h4 className="sa-link"><a href={`https://finance.yahoo.com/quote/${loadedTranscript.ticker.tickerText}/key-statistics?p=${loadedTranscript.ticker.tickerText}`}>YahooFinance Short Float/Insider Info</a></h4>
        <div className="form-container">
          <div className="side-by-side-container">
          <h3>Ratings: </h3>
            <label>
              Quant Rating:
              <select value={quantRating} onChange={quantRatingChangeHandler}>
                {SA_RATING_OPTIONS()}
              </select>
            </label>
            <label>
              Sell-Side Rating:
              <select value={sellSideRating} onChange={sellSideRatingChangeHandler}>
                {SA_RATING_OPTIONS()}
              </select>
            </label>
            </div>
            <div className="side-by-side-container">
            <h3>Grades: </h3>
            <label>
              Revisions Rating:
              <select value={revisionsRating} onChange={revisionsRatingChangeHandler}>
                {SA_GRADING_OPTIONS()}
              </select>
            </label>
            <label>
              Value Rating:
              <select value={valueRating} onChange={valueRatingChangeHandler}>
                {SA_GRADING_OPTIONS()}
              </select>
            </label>
            <label>
              Growth Rating:
              <select value={growthRating} onChange={growthRatingChangeHandler}>
                {SA_GRADING_OPTIONS()}
              </select>
            </label>
            <label>
              Profitability Rating:
              <select value={profitabilityRating} onChange={profitabilityRatingChangeHandler}>
                {SA_GRADING_OPTIONS()}
              </select>
            </label>
            <label>
              Momentum Rating:
              <select value={momentumRating} onChange={momentumRatingChangeHandler}>
                {SA_GRADING_OPTIONS()}
              </select>
            </label>
          </div>
          <div className="side-by-side-container">
            <h3>Other:</h3>            
            <Input
              id="shortFloat"
              element="input"
              type="number"
              label="Short Float (%):"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid decimal."
              onInput={inputHandler}
              initialValue={props.shortFloat}
              initialValid={true}
            />
            <Input
              id="shortSharesChangePastMonth"
              element="input"
              type="number"
              label="Shares Sold Short Change Past Month (%):"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid decimal."
              onInput={inputHandler}
              initialValue={props.shortSharesChangePastMonth}
              initialValid={true}
            />          
            <Input
              id="ownedByInsiders"
              element="input"
              type="number"
              label="Owned By Insiders (%):"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid decimal."
              onInput={inputHandler}
              initialValue={props.ownedByInsiders}
              initialValid={true}
            /> 
          </div>                                                   
        </div>
        <div className="analysis-form__button">
        <Button type="submit" disabled={!formState.isValid}>
            Update
        </Button>
        </div>
        </React.Fragment>)}
      </form>
    </React.Fragment>
  );
};


export default UpdateSentiment;