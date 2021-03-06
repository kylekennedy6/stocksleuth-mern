import React, {useEffect, useState, useContext } from 'react';

import { useParams } from 'react-router-dom';
import TranscriptHome from '../components/TranscriptHome';
import PastEventList from '../../analysis/PastEvents/PastEventList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const TranscriptHomePastEvents = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId
  const [ loadedPastEvents, setLoadedPastEvents ] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/pastEvent/${auth.username}/${transcriptId}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedPastEvents(responseData.pastEvents);
      } catch (err) {}
    };
    fetchPastEvents();
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
          {!isLoading && loadedPastEvents && <PastEventList items={loadedPastEvents} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TranscriptHomePastEvents;