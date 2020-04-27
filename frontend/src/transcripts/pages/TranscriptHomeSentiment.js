import React, {useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TranscriptHome from '../components/TranscriptHome';
import SentimentItem from '../../analysis/Sentiment/SentimentItem';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const TranscriptHomeSentiment = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId

  const [loadedSentiment, setLoadedSentiment] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/sentiment/${auth.username}/${transcriptId}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedSentiment(responseData.sentiment);
      } catch (err) {}
    };
    fetchSentiment();
  }, [sendRequest, auth.token, auth.username, transcriptId])

  return (
    <React.Fragment>
      <div className="main-container">
        <TranscriptHome />
        <div className="content-container">
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && (<div className="center">
            <LoadingSpinner />
          </div>
          )}
          {!isLoading && <SentimentItem {...loadedSentiment} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TranscriptHomeSentiment;