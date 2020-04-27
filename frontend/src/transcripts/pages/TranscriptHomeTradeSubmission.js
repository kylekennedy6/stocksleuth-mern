import React, {useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TranscriptHome from '../components/TranscriptHome';
import TradeSubmissionItem from '../../analysis/TradeSubmission/TradeSubmissionItem';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const TranscriptHomeTradeSubmission = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId

  const [loadedTradeSubmission, setLoadedTradeSubmission] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchTradeSubmission = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tradeSubmission/${auth.username}/${transcriptId}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedTradeSubmission(responseData.tradeSubmission);
      } catch (err) {}
    };
    fetchTradeSubmission();
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
          {!isLoading && <TradeSubmissionItem {...loadedTradeSubmission} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TranscriptHomeTradeSubmission;