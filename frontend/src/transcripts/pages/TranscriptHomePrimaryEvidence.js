import React, {useEffect, useState, useContext } from 'react';

import { useParams } from 'react-router-dom';
import TranscriptHome from '../components/TranscriptHome';
import OpeningStatementList from '../../dialogue/components/OpeningStatementList';
import ExchangeList from '../../dialogue/components/ExchangeList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const TranscriptHomePrimaryEvidence = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId;
  const [ loadedOpeningStatements, setLoadedOpeningStatements ] = useState();
  const [ loadedExchanges, setLoadedExchanges ] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchOpeningStatements = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/openingStatements/primaryEvidence/${auth.username}/${transcriptId}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedOpeningStatements(responseData.openingStatementsWithUserOpeningStatementRatings);
      } catch (err) {}
    };
    fetchOpeningStatements();
  }, [sendRequest, auth.token, auth.username, transcriptId])

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/exchanges/primaryEvidence/${auth.username}/${transcriptId}`, 'GET', null, {
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
        {!isLoading && loadedOpeningStatements && <OpeningStatementList items={loadedOpeningStatements} />}
        {!isLoading && loadedExchanges && <ExchangeList items={loadedExchanges} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TranscriptHomePrimaryEvidence;