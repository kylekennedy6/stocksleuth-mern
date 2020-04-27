import React, {useEffect, useState, useContext } from 'react';

import { useParams } from 'react-router-dom';
import TranscriptHome from '../components/TranscriptHome';
import ExchangeList from '../../dialogue/components/ExchangeList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './TranscriptHome.css';

const TranscriptHomeExchanges = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId
  const [ loadedExchanges, setLoadedExchanges ] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/exchanges/${auth.username}/${transcriptId}/highlyRated`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedExchanges(responseData.exchangesWithUserExchangeRatings);
      } catch (err) {}
    };
    fetchExchanges();
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
          {!isLoading && loadedExchanges && <ExchangeList items={loadedExchanges} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TranscriptHomeExchanges;