import React, {useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TranscriptHome from '../components/TranscriptHome';
import GuidanceVersusConsensusItem from '../../analysis/GuidanceVersusConsensus/GuidanceVersusConsensusItem';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const TranscriptHomeGuidanceVersusConsensus = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId

  const [loadedGuidanceVersusConsensus, setLoadedGuidanceVersusConsensus] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchGuidanceVersusConsensus = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/guidanceVersusConsensus/${auth.username}/${transcriptId}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedGuidanceVersusConsensus(responseData.guidanceVersusConsensus);
      } catch (err) {}
    };
    fetchGuidanceVersusConsensus();
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
          {!isLoading && <GuidanceVersusConsensusItem {...loadedGuidanceVersusConsensus} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TranscriptHomeGuidanceVersusConsensus;