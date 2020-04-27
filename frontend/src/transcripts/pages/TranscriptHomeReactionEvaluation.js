import React, {useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TranscriptHome from '../components/TranscriptHome';
import ReactionEvaluationItem from '../../analysis/ReactionEvaluation/ReactionEvaluationItem';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const TranscriptHomeReactionEvaluation = () => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId

  const [loadedReactionEvaluation, setLoadedReactionEvaluation] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchReactionEvaluation = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/reactionEvaluation/${auth.username}/${transcriptId}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedReactionEvaluation(responseData.reactionEvaluation);
      } catch (err) {}
    };
    fetchReactionEvaluation();
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
          {!isLoading && <ReactionEvaluationItem {...loadedReactionEvaluation} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TranscriptHomeReactionEvaluation;