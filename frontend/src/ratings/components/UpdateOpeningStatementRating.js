import React, { useContext, useState } from 'react';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './RatingForm.css';

const UpdateOpeningStatementRating = props => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const [rating, setRating] = useState(props.rating);
  const [primaryEvidence, setPrimaryEvidence] = useState(props.primaryEvidence);
  const [contraryEvidence, setContraryEvidence] = useState(props.contraryEvidence);

  const ratingChangeHandler = event => {
    setRating(event.target.value);
  };

  const primaryEvidenceChangeHandler = event => {
    setPrimaryEvidence(!primaryEvidence);
  };

  const contraryEvidenceChangeHandler = event => {
    setContraryEvidence(event.target.checked);
  };

  const ratingSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/openingStatementRatings/${props._id}`,
        'PATCH', 
        JSON.stringify({
          "rating": rating,
          "primaryEvidence": primaryEvidence,
          "contraryEvidence": contraryEvidence,
          "openingStatementRatingId": props._id,
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
    <form className="rating-form" onSubmit={ratingSubmitHandler}>
      {isLoading && <LoadingSpinner as Overlay />}
      <div className="rating-container">
      <div className="ratings-side-by-side-container">
      <label>
        Rating:
        <select value={rating} onChange={ratingChangeHandler}>
          <option value="Unrated">Unrated</option>
          <option value="Off-Topic">Off-Topic</option>
          <option value="Results">Results</option>
          <option value="Guidance">Guidance</option>
          <option value="Magnitudinal Guidance">Magnitudinal Guidance</option>
          <option value="Downside Guidance">Downside Guidance</option>
          <option value="Upside Guidance">Upside Guidance</option>
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

export default UpdateOpeningStatementRating;