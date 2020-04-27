import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import DatePicker from '../../shared/components/DatePicker';
import moment from "moment";

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import {
  YEAR_OPTIONS
} from '../../shared/util/formOptions';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import '../AnalysisForm.css';

const UpdatePastEvent = props => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId;
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  
  console.log(props.fiscalQuarter)
  const [eventType, setEventType] = useState(props.eventType);
  const [fiscalQuarter, setFiscalQuarter] = useState(props.fiscalQuarter);
  const [fiscalYear, setFiscalYear] = useState(props.fiscalYear);
  const [tlChangeType, setTlChangeType] = useState(props.tlChangeType);
  const [blChangeType, setBlChangeType] = useState(props.blChangeType);
  const [reactionDate, setReactionDate] = useState(moment(props.reactionDate));

  const eventTypeChangeHandler = event => {
    setEventType(event.target.value);
  };

  const fiscalQuarterChangeHandler = event => {
    setFiscalQuarter(event.target.value);
  };

  const fiscalYearChangeHandler = event => {
    setFiscalYear(event.target.value);
  };

  const tlChangeTypeChangeHandler = event => {
    setTlChangeType(event.target.value);
  };

  const blChangeTypeChangeHandler = event => {
    setBlChangeType(event.target.value);
  };

  const [formState, inputHandler] = useForm(
    {
      revenueVersusConsensus: {
        value: 0,
        isValid: true
      },
      epsVersusConsensus: {
        value: 0,
        isValid: true
      },
      tlMidpointChangePercentage: {
        value: 0,
        isValid: true
      },
      blMidpointChangePercentage: {
        value: 0,
        isValid: true
      },
      reaction: {
        value: 0,
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const pastEventSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/pastEvent/${props.id}`,
        'PATCH',
        JSON.stringify({
          "eventType": eventType,
          "fiscalQuarter": fiscalQuarter,
          "fiscalYear": fiscalYear,
          "reactionDate": reactionDate,
          "revenueVersusConsensus": formState.inputs.revenueVersusConsensus.value,
          "epsVersusConsensus": formState.inputs.epsVersusConsensus.value,
          "tlChangeType": tlChangeType,
          "tlMidpointChangePercentage": formState.inputs.tlMidpointChangePercentage.value,
          "blChangeType": blChangeType,
          "blMidpointChangePercentage": formState.inputs.blMidpointChangePercentage.value,
          "reaction": formState.inputs.reaction.value,
          "pastEventId": props.id,
          "creator": auth.userId
        }), {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        });
        history.push('/');
        history.push(`/users/${auth.username}/transcripts/${transcriptId}/past-events`);
      } catch (err) {}
    };

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <form className="create-form" onSubmit={pastEventSubmitHandler}>
        <h2>{props.fiscalQuarter}{props.fiscalYear} {props.eventType}:</h2>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="form-container">
        <div className="side-by-side-container">
            <h3>Event Info:</h3>
            <label>
            Event Type:
            <select value={eventType} onChange={eventTypeChangeHandler}>
              <option value="Earnings Call">Earnings Call</option>
              <option value="Preannounce">Preannouncement</option>
            </select>
          </label>
          <label>
            Fiscal Quarter:
            <select value={fiscalQuarter} onChange={fiscalQuarterChangeHandler}>
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
          </label>
          <label>
            Fiscal Year:
            <select value={fiscalYear} onChange={fiscalYearChangeHandler}>
              {YEAR_OPTIONS().map( year =>
                <option value={year}>{year}</option>)}
            </select>
          </label>
          </div>
          <div className="side-by-side-container">
            <h3>Reaction Info:</h3>
            <label>
            Reaction Date:
            <DatePicker date={reactionDate} onChange={e => setReactionDate(e.target.value)} />
            </label>
            <Input
              id="reaction"
              element="input"
              type="text"
              label="Reaction (%)"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid decimal."
              onInput={inputHandler}
              initialValue={props.reaction}
              initialValid={true}
            />
          </div>
          <div className="side-by-side-container">
            <h3>Top-Line Info:</h3>
            <Input
              id="revenueVersusConsensus"
              element="input"
              type="text"
              label="Revenue vs. Consensus:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid decimal."
              onInput={inputHandler}
              initialValue={props.revenueVersusConsensus}
              initialValid={true}
            />
            <label>
              Guidance Change Type:
              <select value={tlChangeType} onChange={tlChangeTypeChangeHandler}>
                <option value="Initialized">Initialized</option>
                <option value="Maintained">Maintained</option>
                <option value="Narrowed Down">Narrowed Down</option>
                <option value="Narrowed In-Line">Narrowed In-Line</option>
                <option value="Narrowed Up">Narrowed Up</option>
                <option value="Broadened Down">Broadened Down</option>
                <option value="Broadened In-Line">Broadened In-Line</option>
                <option value="Broadened Up">Broadened Up</option>
                <option value="Lowered Both Ends">Lowered Both Ends</option>
                <option value="Raised Both Ends">Raised Both Ends</option>
              </select>
            </label>
            <Input
              id="tlMidpointChangePercentage"
              element="input"
              type="text"
              label="Change in Guidance Midpoint (%):"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid percentage +/- (0-999)."
              onInput={inputHandler}
              initialValue={props.tlMidpointChangePercentage}
              initialValid={true}
            />
          </div>
          <div className="side-by-side-container">
            <h3>Bottom-Line Info:</h3>
            <Input
              id="epsVersusConsensus"
              element="input"
              type="text"
              label="EPS vs. Consensus:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid decimal."
              onInput={inputHandler}
              initialValue={props.epsVersusConsensus}
              initialValid={true}
            />
            <label>
              Guidance Change Type:
              <select value={blChangeType} onChange={blChangeTypeChangeHandler}>
                <option value="Initialized">Initialized</option>
                <option value="Maintained">Maintained</option>
                <option value="Narrowed Down">Narrowed Down</option>
                <option value="Narrowed In-Line">Narrowed In-Line</option>
                <option value="Narrowed Up">Narrowed Up</option>
                <option value="Broadened Down">Broadened Down</option>
                <option value="Broadened In-Line">Broadened In-Line</option>
                <option value="Broadened Up">Broadened Up</option>
                <option value="Lowered Both Ends">Lowered Both Ends</option>
                <option value="Raised Both Ends">Raised Both Ends</option>
              </select>
            </label>
            <Input
              id="blMidpointChangePercentage"
              element="input"
              type="text"
              label="Change in Guidance Midpoint (%)"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid decimal."
              onInput={inputHandler}
              initialValue={props.blMidpointChangePercentage}
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


export default UpdatePastEvent;