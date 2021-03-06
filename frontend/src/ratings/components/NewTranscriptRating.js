import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './RatingForm.css';

const NewTranscriptRating = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId;
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const [rating, setRating] = useState('Unrated');

  const ratingChangeHandler = event => {
    setRating(event.target.value);
  };

  const currentPage = window.location.href.split(3000)[1]
  const history = useHistory();

  const ratingSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/transcriptRatings',
        'POST', 
        JSON.stringify({
          "rating": rating,
          "transcript": transcriptId,
          "creator": auth.userId
        }), {
        Authorization: 'Bearer ' + auth.token,
        'Content-Type': 'application/json',
      });
      history.push('/');
      history.push(currentPage);
  } catch (err) {}
  };

  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <form className="rating-form" onSubmit={ratingSubmitHandler}>
      {isLoading && <LoadingSpinner as Overlay />}
      <div className="rating-container">
        <div className="transcript-ratings-side-by-side-container">
          <label className="transcript-rating__label">
            Transcript Rating:
            <select value={rating} onChange={ratingChangeHandler}>
              <option value="Unrated">Unrated</option>
              <option value="Empty">Empty</option>
              <option value="Weak">Weak</option>
              <option value="(Pre-Report): Short - Tier Two">(Pre-Report): Short - Tier Two</option>
              <option value="(Pre-Report): Long - Tier Two">(Pre-Report): Long - Tier Two</option>
              <option value="(Pre-Report): Short - Tier One">(Pre-Report): Short - Tier One</option>
              <option value="(Pre-Report): Long - Tier One">(Pre-Report): Long - Tier One</option>
              <option value="(Post-Report): Short - Success">(Post-Report): Short - Success</option>
              <option value="(Post-Report): Long - Success">(Post-Report): Long - Success</option>
              <option value="(Post-Report): Short - Misinterpreted">(Post-Report): Short - Misinterpreted Evidence</option>
              <option value="(Post-Report): Long - Misinterpreted">(Post-Report): Long - Misinterpreted Evidence</option>
              <option value="(Post-Report): Short - Adverse Reaction">(Post-Report): Short - Adverse Reaction</option>
              <option value="(Post-Report): Long - Adverse Reaction">(Post-Report): Long - Adverse Reaction</option>
            </select>
          </label>
        </div>
        <div className="transcript-ratings-side-by-side-container">
          <div className="transcript-rating-form__button">
            <Button type="submit">
                Update Transcript Rating
            </Button>
          </div>
        </div>
      </div>
    </form>
    </React.Fragment>
  );
};

export default NewTranscriptRating;