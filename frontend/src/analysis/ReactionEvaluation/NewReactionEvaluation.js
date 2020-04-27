import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import moment from "moment";
import DatePicker from '../../shared/components/DatePicker';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import '../AnalysisItem.css';

const NewReactionEvaluation = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId;
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [entranceDate, setEntranceDate] = useState(moment);
  const [exitDate, setExitDate] = useState(moment);

  const [formState, inputHandler] = useForm(
    {
      actualPortfolioWeight: {
        value: 0,
        isValid: true
      },
      singleDayReturn: {
        value: 0,
        isValid: true
      },
      actualReturn: {
        value: 0,
        isValid: true
      },
      returnOnPortfolio: {
        value: 0,
        isValid: false
      },
      notes: {
        value: 0,
        isValid: true
      }
    },
    false
  );

  const history = useHistory();

  const reactionEvaluationSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/reactionEvaluation',
        'POST',
        JSON.stringify({
          "actualPortfolioWeight": formState.inputs.actualPortfolioWeight.value,
          "entranceDate": entranceDate,
          "exitDate": exitDate,
          "singleDayReturn": formState.inputs.singleDayReturn.value,
          "actualReturn": formState.inputs.actualReturn.value,
          "returnOnPortfolio": formState.inputs.returnOnPortfolio.value,
          "notes": formState.inputs.notes.value,
          "transcript": transcriptId,
          "creator": auth.userId
        }), {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        });
        history.push('/');
        history.push(`/users/${auth.username}/transcripts/${transcriptId}/reaction-evaluation`);
      } catch (err) {}
    };

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <form className="create-form" onSubmit={reactionEvaluationSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Add Reaction Evaluation:</h2>
        <div className="form-container">
          <div className="side-by-side-container">
            <h3>Timing:</h3>  
            <label>
              Entrance Date:
              <DatePicker date={entranceDate} onChange={e => setEntranceDate(e.target.value)} />
            </label>
            <label>
              Exit Date:
              <DatePicker date={exitDate} onChange={e => setExitDate(e.target.value)} />
            </label>
          </div>
          <div className="side-by-side-container">
            <h3>Portfolio:</h3>
            <Input
              id="actualPortfolioWeight"
              element="input"
              type="text"
              label="Actual Portfolio Weight (%)"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid percentage +/- (0-999)."
              onInput={inputHandler}
            /> 
            <Input
              id="actualReturn"
              element="input"
              type="text"
              label="Actual Return"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid decimal."
              onInput={inputHandler}
            />   
            <Input
              id="returnOnPortfolio"
              element="input"
              type="text"
              label="Portfolio Return (%)"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid decimal."
              onInput={inputHandler}
            />    
          </div> 
          <div className="side-by-side-container">
            <h3>Post-Mortem:</h3>
            <Input
                id="singleDayReturn"
                element="input"
                type="text"
                label="Single-Day Return"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid decimal."
                onInput={inputHandler}
              />
              <Input
                id="notes"
                element="textarea"
                type="text"
                label="Notes:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid percentage +/- (0-999)."
                onInput={inputHandler}
              />
          </div>
        </div>
        <div className="analysis-form__button">
        <Button type="submit" disabled={!formState.isValid}>
            Submit
        </Button>
        </div>
      </form>
    </React.Fragment>
  );
};


export default NewReactionEvaluation;