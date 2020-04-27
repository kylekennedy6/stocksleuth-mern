import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { BEAT_MISS_OPTIONS, RAISE_CUT_OPTIONS } from '../../shared/util/formOptions';
import { AuthContext } from '../../shared/context/auth-context';
import '../AnalysisForm.css';

const UpdateTendencies = props => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId;
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  
  const [beatsPastTwoYears, setBeatsPastTwoYears] = useState(props.beatsPastTwoYears);
  const [missesPastTwoYears, setMissesPastTwoYears] = useState(props.missesPastTwoYears);
  const [sameEventRaisesPastThree, setSameEventRaisesPastThree] = useState(props.sameEventRaisesPastThree);
  const [sameEventCutsPastThree, setSameEventCutsPastThree] = useState(props.sameEventCutsPastThree);

  const beatsPastTwoYearsChangeHandler = event => {
    setBeatsPastTwoYears(event.target.value);
  };

  const missesPastTwoYearsChangeHandler = event => {
    setMissesPastTwoYears(event.target.value);
  };

  const sameEventRaisesPastThreeChangeHandler = event => {
    setSameEventRaisesPastThree(event.target.value);
  };

  const sameEventCutsPastThreeChangeHandler = event => {
    setSameEventCutsPastThree(event.target.value);
  };

  const history = useHistory();

  const tendenciesSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/tendencies/${props._id}`,
        'PATCH',
        JSON.stringify({
          "beatsPastTwoYears": beatsPastTwoYears,
          "missesPastTwoYears": missesPastTwoYears,
          "sameEventRaisesPastThree": sameEventRaisesPastThree,
          "sameEventCutsPastThree": sameEventCutsPastThree,
          "tendenciesId": props._id,
          "creator": auth.userId
        }), {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json',
        });
        history.push('/');
        history.push(`/users/${auth.username}/transcripts/${transcriptId}/tendencies`);
      } catch (err) {}
    };

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <form className="create-form" onSubmit={tendenciesSubmitHandler}>
        <h2>Update Historical Tendencies:</h2>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="form-container">
          <div className="side-by-side-container">
            <h3>Recent Beat/Miss History:</h3>
          <label>
            # of Beats Past Two Years:
            <select value={beatsPastTwoYears} onChange={beatsPastTwoYearsChangeHandler}>
              {BEAT_MISS_OPTIONS()}
            </select>
          </label>
          <label>
          # of Misses Past Two Years:
            <select value={missesPastTwoYears} onChange={missesPastTwoYearsChangeHandler}>
              {BEAT_MISS_OPTIONS()}
            </select>
          </label>
          </div>
          <div className="side-by-side-container">
            <h3>Recent Raise/Cut History:</h3>
          <label>
          # of Same Event Raises Past Three Years:
            <select value={sameEventRaisesPastThree} onChange={sameEventRaisesPastThreeChangeHandler}>
              {RAISE_CUT_OPTIONS()}
            </select>
          </label>
          <label>
          # of Same Event Cuts Past Three Years:
            <select value={sameEventCutsPastThree} onChange={sameEventCutsPastThreeChangeHandler}>
              {RAISE_CUT_OPTIONS()}
            </select>
          </label>  
          </div>                                                          
        </div>
        <div className="analysis-form__button">
        <Button type="submit">
            Update
        </Button>
        </div>
      </form>
    </React.Fragment>
  );
};


export default UpdateTendencies;