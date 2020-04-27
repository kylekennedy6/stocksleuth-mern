import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import moment from "moment";
import DatePicker from '../../shared/components/DatePicker';
import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import { HYPOTHESIS_OPTIONS, DIRECTION_OPTIONS } from '../../shared/util/formOptions';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import '../AnalysisForm.css';

const UpdateTradeSubmission = props => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId;
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  
  const [likelyPreannounce, setLikelyPreannounce] = useState(props.likelyPreannounce);
  const [hypothesis, setHypothesis] = useState(props.hypothesis);
  const [direction, setDirection] = useState(props.direction);
  const [entranceDate, setEntranceDate] = useState(moment(props.entranceDate));

  const likelyPreannounceChangeHandler = event => {
    setLikelyPreannounce(event.target.checked);
  };

  const hypothesisChangeHandler = event => {
    setHypothesis(event.target.value);
  }

  const directionChangeHandler = event => {
    setDirection(event.target.value);
  }
  const [formState, inputHandler] = useForm(
    {
      predictionIntervalsHighDownside: {
        value: 0,
        isValid: true
      },
      predictionIntervalsModerateDownside: {
        value: 0,
        isValid: false
      },
      predictionIntervalsLowDownside: {
        value: 0,
        isValid: true
      },
      predictionIntervalsLowUpside: {
        value: 0,
        isValid: true
      },
      predictionIntervalsModerateUpside: {
        value: 0,
        isValid: true
      },
      predictionIntervalsHighUpside: {
        value: 0,
        isValid: false
      },
      targetPortfolioWeight: {
        value: 0,
        isValid: true
      },
      notes: {
        value: 0,
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const tradeSubmissionSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/tradeSubmission/${props._id}`,
        'PATCH',
        JSON.stringify({
          "hypothesis": hypothesis,
          "predictionIntervalsHighDownside": formState.inputs.predictionIntervalsHighDownside.value,
          "predictionIntervalsModerateDownside": formState.inputs.predictionIntervalsModerateDownside.value,
          "predictionIntervalsLowDownside": formState.inputs.predictionIntervalsLowDownside.value,
          "predictionIntervalsLowUpside": formState.inputs.predictionIntervalsLowUpside.value,
          "predictionIntervalsModerateUpside": formState.inputs.predictionIntervalsModerateUpside.value,
          "predictionIntervalsHighUpside": formState.inputs.predictionIntervalsHighUpside.value,
          "direction": direction,
          "targetPortfolioWeight": formState.inputs.targetPortfolioWeight.value,
          "likelyPreannounce": likelyPreannounce,
          "entranceDate": entranceDate,
          "notes": formState.inputs.notes.value,
          "transcript": transcriptId,
          "tradeSubmissionId": props._id,
          "creator": auth.userId
        }), {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        });
        history.push('/');
        history.push(`/users/${auth.username}/transcripts/${transcriptId}/trade-submission`);
      } catch (err) {}
    };

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <form className="create-form" onSubmit={tradeSubmissionSubmitHandler}>
        <h2>Trade Idea:</h2>        
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="form-container">
        <div className="side-by-side-container">
          <h3> Submit Trade Idea: </h3>
          <label>
            Hypothesis:
            <select value={hypothesis} onChange={hypothesisChangeHandler}>
              {HYPOTHESIS_OPTIONS()}
            </select>
          </label>
          <label>
            Direction:
            <select value={direction} onChange={directionChangeHandler}>
              {DIRECTION_OPTIONS()}
            </select>
          </label>
          <Input
            id="targetPortfolioWeight"
            element="input"
            type="text"
            label="Target Portfolio Weight"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.targetPortfolioWeight}
            initialValid={true}
          />
          <Input
          id="notes"
          element="textarea"
          type="text"
          label="Notes"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid decimal."
          onInput={inputHandler}
          initialValue={props.notes}
          initialValid={true}
          />
        </div>
        <div className="side-by-side-container">
          <h3>Timing: </h3>            
          <label>
            Likely Preannounce (Y/N):
            <input
              name="likelyPreannounce"
              type="checkbox"
              onChange={likelyPreannounceChangeHandler}
              checked={likelyPreannounce} 
            />
          </label>
          <label>
            Entrance Date:
            <DatePicker date={entranceDate} onChange={e => setEntranceDate(e.target.value)} />
          </label>
        </div>
        <div className="side-by-side-container">
          <h3>Prediction Intervals: </h3>    
          <Input
          id="predictionIntervalsHighDownside"
          element="input"
          type="text"
          label="-10%+"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid decimal."
          onInput={inputHandler}
          initialValue={props.predictionIntervals.highDownside}
          initialValid={true}
          />
          <Input
            id="predictionIntervalsModerateDownside"
            element="input"
            type="text"
            label="[-4%, -10%)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.predictionIntervals.moderateDownside}
            initialValid={true}
          />
          <Input
            id="predictionIntervalsLowDownside"
            element="input"
            type="text"
            label="(-4%, 0%]"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.predictionIntervals.lowDownside}
            initialValid={true}
          />
          <Input
            id="predictionIntervalsLowUpside"
            element="input"
            type="text"
            label="(0%, 4%)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.predictionIntervals.lowUpside}
            initialValid={true}
          />
          <Input
            id="predictionIntervalsModerateUpside"
            element="input"
            type="text"
            label="[4%, 10%)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.predictionIntervals.moderateUpside}
            initialValid={true}
          />
          <Input
            id="predictionIntervalsHighUpside"
            element="input"
            type="text"
            label="10%+"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.predictionIntervals.highUpside}
            initialValid={true}
          />
          </div>
          <div className="side-by-side-container">
              <h3>Allocation:</h3>
            <Input
              id="targetPortfolioWeight"
              element="input"
              type="text"
              label="Target Portfolio Weight:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid decimal."
              onInput={inputHandler}
              initialValue={props.targetPortfolioWeight}
              initialValid={true}
            />
          </div>
        </div>
        <div className="analysis-form__button">
        <Button type="submit" disabled={!formState.isValid}>
            Update
        </Button>
        </div>
      </form>
    </React.Fragment>
  );
};


export default UpdateTradeSubmission;