import React, { useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom'

import NewTranscriptRating from './NewTranscriptRating';
import UpdateTranscriptRating from './UpdateTranscriptRating';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './RatingForm.css';

const TranscriptRatingForm = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId;
  const [ loadedTranscriptRating, setLoadedTranscriptRating ] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchTranscriptRating = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transcriptRatings/${auth.username}/${transcriptId}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedTranscriptRating(responseData.transcriptRating);
      } catch (err) {}
    };
    fetchTranscriptRating();
  }, [sendRequest, auth.token, auth.username, transcriptId])

  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && (<div className="center">
      <LoadingSpinner />
    </div>
    )}
    <header className="rating-header">
    {!isLoading && loadedTranscriptRating && !loadedTranscriptRating._id && (
    <NewTranscriptRating />)}
    {!isLoading && loadedTranscriptRating && loadedTranscriptRating._id && (
    <UpdateTranscriptRating {...loadedTranscriptRating} />)}
    </header>
  </React.Fragment>
  );
}

export default TranscriptRatingForm;