import React, {useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TranscriptHome from '../components/TranscriptHome';
import TendenciesItem from '../../analysis/Tendencies/TendenciesItem';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const TranscriptHomeTendencies = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId

  const [loadedTendencies, setLoadedTendencies] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchTendencies = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tendencies/${auth.username}/${transcriptId}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedTendencies(responseData.tendencies);
      } catch (err) {}
    };
    fetchTendencies();
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
          {!isLoading && <TendenciesItem {...loadedTendencies} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TranscriptHomeTendencies;