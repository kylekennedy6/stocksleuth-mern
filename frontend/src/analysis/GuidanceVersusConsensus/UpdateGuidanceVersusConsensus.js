import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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
import '../AnalysisForm.css';

const UpdateGuidanceVersusConsensus = props => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId;
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  
  const [formState, inputHandler] = useForm(
    {
      nextQuarterTLGuidanceLE: {
        value: '',
        isValid: false
      },
      nextQuarterTLGuidanceHE: {
        value: 0,
        isValid: false
      },
      nextQuarterTLCons: {
        value: 0,
        isValid: false
      },
      nextQuarterTLMidpointVsCons: {
        value: 0,
        isValid: false
      },
      nextQuarterBLGuidanceLE: {
        value: 0,
        isValid: false
      },
      nextQuarterBLGuidanceHE: {
        value: 0,
        isValid: false
      },
      nextQuarterBLCons: {
        value: 0,
        isValid: false
      },
      nextQuarterBLMidpointVsCons: {
        value: 0,
        isValid: false
      },
      fullYearTLGuidanceLE: {
        value: 0,
        isValid: false
      },
      fullYearTLGuidanceHE: {
        value: 0,
        isValid: false
      },
      fullYearTLCons: {
        value: 0,
        isValid: false
      },
      fullYearTLMidpointVsCons: {
        value: 0,
        isValid: false
      },
      fullYearBLGuidanceLE: {
        value: 0,
        isValid: false
      },
      fullYearBLGuidanceHE: {
        value: 0,
        isValid: false
      },
      fullYearBLCons: {
        value: 0,
        isValid: false
      },
      fullYearBLMidpointVsCons: {
        value: 0,
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const guidanceVersusConsensusSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/guidanceVersusConsensus/${props._id}`,
        'PATCH',
        JSON.stringify({
          "nextQuarterTLGuidanceLE": formState.inputs.nextQuarterTLGuidanceLE.value,
          "nextQuarterTLGuidanceHE": formState.inputs.nextQuarterTLGuidanceHE.value,
          "nextQuarterTLCons": formState.inputs.nextQuarterTLCons.value,
          "nextQuarterTLMidpointVsCons": formState.inputs.nextQuarterTLMidpointVsCons.value,
          "nextQuarterBLGuidanceLE": formState.inputs.nextQuarterBLGuidanceLE.value,
          "nextQuarterBLGuidanceHE": formState.inputs.nextQuarterBLGuidanceHE.value,
          "nextQuarterBLCons": formState.inputs.nextQuarterBLCons.value,
          "nextQuarterBLMidpointVsCons": formState.inputs.nextQuarterBLMidpointVsCons.value,
          "fullYearTLGuidanceLE": formState.inputs.fullYearTLGuidanceLE.value,
          "fullYearTLGuidanceHE": formState.inputs.fullYearTLGuidanceHE.value,
          "fullYearTLCons": formState.inputs.fullYearTLCons.value,
          "fullYearTLMidpointVsCons": formState.inputs.fullYearTLMidpointVsCons.value,
          "fullYearBLGuidanceLE": formState.inputs.fullYearBLGuidanceLE.value,
          "fullYearBLGuidanceHE": formState.inputs.fullYearBLGuidanceHE.value,
          "fullYearBLCons": formState.inputs.fullYearBLCons.value,
          "fullYearBLMidpointVsCons": formState.inputs.fullYearBLMidpointVsCons.value,
          "guidanceVersusConsensusId": props._id,
          "creator": auth.userId
        }), {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        });
        history.push('/');
        history.push(`/users/${auth.username}/transcripts/${transcriptId}/guidance-versus-consensus`);
      } catch (err) {}
    };

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <form className="create-form" onSubmit={guidanceVersusConsensusSubmitHandler}>
        <h2>Update Guidance vs. Consensus Data:</h2>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="form-container">
          <div className="side-by-side-container">
            <h3>Next Quarter Top-Line Data: </h3>
          <Input
            id="nextQuarterTLGuidanceLE"
            element="input"
            type="number"
            label="Guidance (Low End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.nextQuarterTLGuidanceLE}
            initialValid={true}
          />
          <Input
            id="nextQuarterTLGuidanceHE"
            element="input"
            type="number"
            label="Guidance (High End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.nextQuarterTLGuidanceHE}
            initialValid={true}
          />
          <Input
            id="nextQuarterTLCons"
            element="input"
            type="number"
            label="Consensus:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.nextQuarterTLCons}
            initialValid={true}
          />
          <Input
            id="nextQuarterTLMidpointVsCons"
            element="input"
            type="number"
            label="Guidance Midpoint vs. Consensus (%):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid percentage +/- (0-999)."
            onInput={inputHandler}
            initialValue={props.nextQuarterTLMidpointVsCons}
            initialValid={true}
          />
          </div>
          <div className="side-by-side-container">
          <h3>Full Year Top-Line Data: </h3>
          <Input
            id="fullYearTLGuidanceLE"
            element="input"
            type="number"
            label="Guidance (Low End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.fullYearTLGuidanceLE}
            initialValid={true}
          />
          <Input
            id="fullYearTLGuidanceHE"
            element="input"
            type="number"
            label="Guidance (High End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.fullYearTLGuidanceHE}
            initialValid={true}
          />
          <Input
            id="fullYearTLCons"
            element="input"
            type="number"
            label="Consensus:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.fullYearTLCons}
            initialValid={true}
          />
          <Input
            id="fullYearTLMidpointVsCons"
            element="input"
            type="number"
            label="Guidance Midpoint vs. Consensus (%):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid percentage +/- (0-999)."
            onInput={inputHandler}
            initialValue={props.fullYearTLMidpointVsCons}
            initialValid={true}
          />
          </div>
          <div className="side-by-side-container">
          <h3>Next Quarter Bottom-Line Data: </h3>
          <Input
            id="nextQuarterBLGuidanceLE"
            element="input"
            type="number"
            label="Guidance (Low End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.nextQuarterBLGuidanceLE}
            initialValid={true}
          />
          <Input
            id="nextQuarterBLGuidanceHE"
            element="input"
            type="number"
            label="Guidance (High End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.nextQuarterBLGuidanceHE}
            initialValid={true}
          />
          <Input
            id="nextQuarterBLCons"
            element="input"
            type="number"
            label="Consensus"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.nextQuarterBLCons}
            initialValid={true}
          />
          <Input
            id="nextQuarterBLMidpointVsCons"
            element="input"
            type="number"
            label="Guidance Midpoint vs. Consensus (%):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid percentage +/- (0-999)."
            onInput={inputHandler}
            initialValue={props.nextQuarterBLMidpointVsCons}
            initialValid={true}
          />
          </div>
          <div className="side-by-side-container">
          <h3>Full Year Bottom-Line Data: </h3>
          <Input
            id="fullYearBLGuidanceLE"
            element="input"
            type="number"
            label="Guidance (Low-End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.fullYearBLGuidanceLE}
            initialValid={true}
          />
          <Input
            id="fullYearBLGuidanceHE"
            element="input"
            type="number"
            label="Guidance (High-End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.fullYearBLGuidanceHE}
            initialValid={true}
          />
          <Input
            id="fullYearBLCons"
            element="input"
            type="number"
            label="Consensus"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
            initialValue={props.fullYearBLCons}
            initialValid={true}
          />
          <Input
            id="fullYearBLMidpointVsCons"
            element="input"
            type="number"
            label="Guidance Midpoint vs. Consensus (%):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid percentage +/- (0-999)."
            onInput={inputHandler}
            initialValue={props.fullYearBLMidpointVsCons}
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


export default UpdateGuidanceVersusConsensus;