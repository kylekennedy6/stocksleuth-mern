import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './TranscriptTitle.css';
import TranscriptRatingForm from '../../ratings/components/TranscriptRatingForm';

const TranscriptTitle = () => {
  const auth = useContext(AuthContext);
  const [ loadedTranscript, setLoadedTranscript] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const transcriptId = useParams().transcriptId;
  const pageName = () => {
    const currentUrl = window.location.href;
    if (currentUrl.includes('exchanges')) {
      return 'Highly-Rated QA'
    } else if (currentUrl.includes('opening-statements')) {
      return 'Highly-Rated OS'
    } else if (currentUrl.includes('full-transcript')) {
      return 'Full Transcript'
    } else if (currentUrl.includes('primary-evidence')) {
      return 'Upcoming Trades'
    } else if (currentUrl.includes('guidance-versus-consensus')) {
      return 'Guidance vs. Consensus'
    } else if (currentUrl.includes('past-events')) {
      return 'Past Events'
    } else if (currentUrl.includes('tendencies')) {
      return 'Tendencies'
    } else if (currentUrl.includes('sentiment')) {
      return 'Sentiment'
    } else if (currentUrl.includes('trade-submission')) {
      return 'Trade Submission'
    } else if (currentUrl.includes('reaction-evaluation')) {
      return 'Reaction Evaluation'
    }
  }

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transcripts/${transcriptId}`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedTranscript(responseData.transcript);
      } catch (err) {}
    };
    fetchTranscript();
  }, [sendRequest, auth.token, auth.username, transcriptId])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (<div className="center">
        <LoadingSpinner />
      </div>
      )}
      {!isLoading && loadedTranscript && (
        <header className="transcript-title">
          <h2>{loadedTranscript.ticker.tickerText} {loadedTranscript.fiscalQuarter} {loadedTranscript.fiscalYear}: {pageName()}</h2>
        </header>)}
        <TranscriptRatingForm />
    </React.Fragment>
  );
};

export default TranscriptTitle;