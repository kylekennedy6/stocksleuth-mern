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
import '../AnalysisItem.css';

const NewGuidanceVersusConsensus = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId;
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      nextQuarterTLGuidanceLE: {
        value: 0,
        isValid: true
      },
      nextQuarterTLGuidanceHE: {
        value: 0,
        isValid: true
      },
      nextQuarterTLCons: {
        value: 0,
        isValid: false
      },
      nextQuarterTLMidpointVsCons: {
        value: 0,
        isValid: true
      },
      nextQuarterBLGuidanceLE: {
        value: 0,
        isValid: true
      },
      nextQuarterBLGuidanceHE: {
        value: 0,
        isValid: true
      },
      nextQuarterBLCons: {
        value: 0,
        isValid: false
      },
      nextQuarterBLMidpointVsCons: {
        value: 0,
        isValid: true
      },
      fullYearTLGuidanceLE: {
        value: 0,
        isValid: true
      },
      fullYearTLGuidanceHE: {
        value: 0,
        isValid: true
      },
      fullYearTLCons: {
        value: 0,
        isValid: false
      },
      fullYearTLMidpointVsCons: {
        value: 0,
        isValid: true
      },
      fullYearBLGuidanceLE: {
        value: 0,
        isValid: true
      },
      fullYearBLGuidanceHE: {
        value: 0,
        isValid: true
      },
      fullYearBLCons: {
        value: 0,
        isValid: false
      },
      fullYearBLMidpointVsCons: {
        value: 0,
        isValid: true
      }
    },
    false
  );

  const history = useHistory();

  const guidanceVersusConsensusSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/guidanceVersusConsensus',
        'POST',
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
          "transcript": transcriptId,
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
        <h2>New Guidance vs. Consensus Report:</h2>
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
          />
          <Input
            id="nextQuarterTLGuidanceHE"
            element="input"
            type="number"
            label="Guidance (High End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
          />
          <Input
            id="nextQuarterTLCons"
            element="input"
            type="number"
            label="Consensus:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
          />
          <Input
            id="nextQuarterTLMidpointVsCons"
            element="input"
            type="number"
            label="Guidance Midpoint vs. Consensus (%):"
            validators={[VALIDATOR_REQUIRE()]}

            errorText="Please enter a valid percentage +/- (0-999)."
            onInput={inputHandler}
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
          />
          <Input
            id="fullYearTLGuidanceHE"
            element="input"
            type="number"
            label="Guidance (High End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
          />
          <Input
            id="fullYearTLCons"
            element="input"
            type="number"
            label="Consensus:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
          />
          <Input
            id="fullYearTLMidpointVsCons"
            element="input"
            type="number"
            label="Guidance Midpoint vs. Consensus (%):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid percentage +/- (0-999)."
            
            onInput={inputHandler}
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
          />
          <Input
            id="nextQuarterBLGuidanceHE"
            element="input"
            type="number"
            label="Guidance (High End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
          />
          <Input
            id="nextQuarterBLCons"
            element="input"
            type="number"
            label="Consensus"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
          />
          <Input
            id="nextQuarterBLMidpointVsCons"
            element="input"
            type="number"
            label="Guidance Midpoint vs. Consensus (%):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid percentage +/- (0-999)."
            onInput={inputHandler}
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
          />
          <Input
            id="fullYearBLGuidanceHE"
            element="input"
            type="number"
            label="Guidance (High-End):"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
          />
          <Input
            id="fullYearBLCons"
            element="input"
            type="number"
            label="Consensus"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid decimal."
            onInput={inputHandler}
          />
          <Input
            id="fullYearBLMidpointVsCons"
            element="input"
            type="number"
            label="Guidance Midpoint vs. Consensus (%):"
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


export default NewGuidanceVersusConsensus;