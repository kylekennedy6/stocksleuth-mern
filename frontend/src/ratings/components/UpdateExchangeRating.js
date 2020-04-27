import React, { useContext, useState } from 'react';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './RatingForm.css';

const UpdateExchangeRating = props => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const [contextRating, setContextRating] = useState(props.contextRating);
  const [questionRating, setQuestionRating] = useState(props.questionRating);
  const [overallRating, setOverallRating] = useState(props.overallRating);
  const [primaryEvidence, setPrimaryEvidence] = useState(props.primaryEvidence);
  const [contraryEvidence, setContraryEvidence] = useState(props.contraryEvidence);

  const contextRatingChangeHandler = event => {
    setContextRating(event.target.value);
  };

  const questionRatingChangeHandler = event => {
    setQuestionRating(event.target.value);
  };

  const overallRatingChangeHandler = event => {
    setOverallRating(event.target.value);
  };

  const primaryEvidenceChangeHandler = event => {
    setPrimaryEvidence(event.target.checked);
  };

  const contraryEvidenceChangeHandler = event => {
    setContraryEvidence(event.target.checked);
  };

  const ratingSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/exchangeRatings/${props._id}`,
        'PATCH',
        JSON.stringify({
          "contextRating": contextRating,
          "questionRating": questionRating,
          "overallRating": overallRating,
          "primaryEvidence": primaryEvidence,
          "contraryEvidence": contraryEvidence,
          "exchangeRatingId": props._id,
          "creator": auth.userId
        }), {
        Authorization: 'Bearer ' + auth.token,
        'Content-Type': 'application/json',
      });
  } catch (err) {}
  };

  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <form className="rating-form rating-form-title" onSubmit={ratingSubmitHandler}>
      {isLoading && <LoadingSpinner as Overlay />}
      <div className="rating-container">
      <div className="ratings-side-by-side-container">
      <label>
        Context Rating:
        <select value={contextRating} onChange={contextRatingChangeHandler}>
          <option value="Unrated">Unrated</option>
          <option value="Off-Topic">Off-Topic</option>
          <option value="Future-Looking">Future-Looking</option>
          <option value="Secondary Guidance">Secondary Guidance</option>
          <option value="Primary Guidance">Primary Guidance</option>
        </select>
      </label>
      <label>
        Question Rating:
        <select value={questionRating} onChange={questionRatingChangeHandler}>
          <option value="Unrated">Unrated</option>
          <option value="Neutral">Neutral</option>
          <option value="Concern">Concern</option>
          <option value="Optimism">Optimism</option>
          <option value="Negative Skepticism">Negative Skepticism</option>
          <option value="Positive Skepticism">Positive Skepticism</option>
        </select>
      </label>
      <label>
        Overall Rating:
        <select value={overallRating} onChange={overallRatingChangeHandler}>
          <option value="Unrated">Unrated</option>
          <option value="No Hypothesis">No Hypothesis</option>
          <option value="Concern About Near-Term Performance">Concern About Near-Term Performance</option>
          <option value="Optimism About Near-Term Performance">Optimism About Near-Term Performance</option>
          <option value="Possibly Aggressive Guidance">Possibly Aggressive Guidance</option>
          <option value="Possibly Conservative Guidance">Possibly Conservative Guidance</option>
          <option value="Likely Aggressive Guidance">Likely Aggressive Guidance</option>
          <option value="Likely Conservative Guidance">Likely Conservative Guidance</option>
          <option value="Likely Guidance Cut on Next Event">Likely Guidance Cut on Next Event</option>
          <option value="Likely Guidance Raise on Next Event">Likely Guidance Raise on Next Event</option>
        </select>
      </label>
      </div>
      <div className="ratings-side-by-side-container">
      <label>
        Primary Evidence (Y/N):
        <input
          name="primaryEvidence"
          type="checkbox"
          onChange={primaryEvidenceChangeHandler}
          checked={primaryEvidence} />
      </label>
      <label>
        Contrary Evidence (Y/N)?:
        <input
          name="contraryEvidence"
          type="checkbox"
          onChange={contraryEvidenceChangeHandler}
          checked={contraryEvidence} />
      </label>
      <div className="rating-form__button">
        <Button type="submit">
            Update Ratings
        </Button>
      </div>
      </div>
      </div>
    </form>
    </React.Fragment>
  );
};

export default UpdateExchangeRating;
