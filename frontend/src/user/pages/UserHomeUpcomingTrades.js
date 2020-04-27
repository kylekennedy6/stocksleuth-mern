import React, {useEffect, useState, useContext } from 'react';

import TranscriptsList from '../../transcripts/components/TranscriptsList';
import UserHome from '../components/UserNavigation/UserHome';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const UserHomeUpcomingTrades = () => {
  const auth = useContext(AuthContext);

  const [loadedUpcomingTradeTranscripts, setLoadedUpcomingTradeTranscripts] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tradeSubmission/${auth.username}/upcomingTrades`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedUpcomingTradeTranscripts(responseData.transcriptsWithTradeSubmission);
      } catch (err) {}
    };
    fetchTranscripts();
  }, [sendRequest, auth.token, auth.username]);

  return (
    <React.Fragment>
      <div className="main-container">
        <UserHome />
        <div className="content-container">
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && (<div className="center">
            <LoadingSpinner />
          </div>
          )}
          {!isLoading && loadedUpcomingTradeTranscripts && <TranscriptsList items={loadedUpcomingTradeTranscripts}/>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserHomeUpcomingTrades;