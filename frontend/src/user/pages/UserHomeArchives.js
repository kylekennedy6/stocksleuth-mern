import React, {useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import UserHome from '../components/UserNavigation/UserHome';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './UserHome.css';
const UserHomeArchives = () => {
  const auth = useContext(AuthContext);

  const [loadedShortSuccesses, setLoadedShortSuccesses] = useState();
  const [loadedShortMisinterpretedEvidence, setLoadedShortMisinterpretedEvidence] = useState();
  const [loadedShortAdverseReaction, setLoadedShortAdverseReaction] = useState();
  const [loadedLongSuccesses, setLoadedLongSuccesses] = useState();
  const [loadedLongMisinterpretedEvidence, setLoadedLongMisinterpretedEvidence] = useState();
  const [loadedLongAdverseReaction, setLoadedLongAdverseReaction] = useState();

  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transcripts/${auth.username}/archives/short-successes`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedShortSuccesses(responseData.transcripts);
      } catch (err) {}
    };
    fetchTranscripts();
  }, [sendRequest, auth.token, auth.username]);
  
  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transcripts/${auth.username}/archives/short-misinterpretedEvidence`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedShortMisinterpretedEvidence(responseData.transcripts);
      } catch (err) {}
    };
    fetchTranscripts();
  }, [sendRequest, auth.token, auth.username]);
  
  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transcripts/${auth.username}/archives/short-adverseReaction`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedShortAdverseReaction(responseData.transcripts);
      } catch (err) {}
    };
    fetchTranscripts();
  }, [sendRequest, auth.token, auth.username]);

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transcripts/${auth.username}/archives/long-successes`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedLongSuccesses(responseData.transcripts);
      } catch (err) {}
    };
    fetchTranscripts();
  }, [sendRequest, auth.token, auth.username]);
  
  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transcripts/${auth.username}/archives/long-misinterpretedEvidence`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedLongMisinterpretedEvidence(responseData.transcripts);
      } catch (err) {}
    };
    fetchTranscripts();
  }, [sendRequest, auth.token, auth.username]);
  
  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transcripts/${auth.username}/archives/long-adverseReaction`, 'GET', null, {
            Authorization: 'Bearer ' + auth.token
          });
        setLoadedLongAdverseReaction(responseData.transcripts);
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
        <div className="archives-container">
            <div className="archives-side-by-side-container">
              <h5>Shorts - Successes</h5>
              <hr />
              {!isLoading && loadedShortSuccesses && (
                <ul>
                  {loadedShortSuccesses.map((transcript) => (
                  <li><NavLink to={`/users/${auth.username}/transcripts/${transcript._id}/exchanges`} exact>{transcript.ticker.tickerText}: {transcript.fiscalQuarter} {transcript.fiscalYear}</NavLink></li>
                  ))}
                </ul>)}
            </div>
            <div className="archives-side-by-side-container">
              <h5>Shorts - Misinterpreted</h5>
              <hr />
              {!isLoading && loadedShortMisinterpretedEvidence && (
                <ul className="archive-list">
                  {loadedShortMisinterpretedEvidence.map((transcript) => (
                  <li><NavLink to={`/users/${auth.username}/transcripts/${transcript._id}/exchanges`} exact>{transcript.ticker.tickerText}: {transcript.fiscalQuarter} {transcript.fiscalYear}</NavLink></li>
                  ))}
                </ul>)}
            </div>
            <div className="archives-side-by-side-container">
              <h5>Shorts - Adverse Reaction</h5>
              <hr />
              {!isLoading && loadedShortAdverseReaction && (
              <ul>
                {loadedShortAdverseReaction.map((transcript) => (
                  <li><NavLink to={`/users/${auth.username}/transcripts/${transcript._id}/exchanges`} exact>{transcript.ticker.tickerText}: {transcript.fiscalQuarter} {transcript.fiscalYear}</NavLink></li>
                  ))}
              </ul>)}
            </div>
          </div>
          <div className="archives-container">
            <div className="archives-side-by-side-container">
              <h5>Longs - Successes</h5>
              <hr />
              {!isLoading && loadedLongSuccesses && (
              <ul>
                {loadedLongSuccesses.map((transcript) => (
                  <li><NavLink to={`/users/${auth.username}/transcripts/${transcript._id}/exchanges`} exact>{transcript.ticker.tickerText}: {transcript.fiscalQuarter} {transcript.fiscalYear}</NavLink></li>
                  ))}
              </ul>)}
            </div>
            <div className="archives-side-by-side-container">
              <h5>Longs - Misinterpreted</h5>
              <hr />
              {!isLoading && loadedLongMisinterpretedEvidence && (
              <ul>
                {loadedLongMisinterpretedEvidence.map((transcript) => (
                  <li><NavLink to={`/users/${auth.username}/transcripts/${transcript._id}/exchanges`} exact>{transcript.ticker.tickerText}: {transcript.fiscalQuarter} {transcript.fiscalYear}</NavLink></li>
                  ))}
              </ul>)}
            </div>
            <div className="archives-side-by-side-container">
              <h5>Longs - Adverse Reaction</h5>
              <hr />
              {!isLoading && loadedLongAdverseReaction && (
                <ul>
                  {loadedLongAdverseReaction.map((transcript) => (
                  <li><NavLink to={`/users/${auth.username}/transcripts/${transcript._id}/exchanges`} exact>{transcript.ticker.tickerText}: {transcript.fiscalQuarter} {transcript.fiscalYear}</NavLink></li>
                  ))}
                </ul>)}
            </div>
          </div>
        </div>
        </div>
    </React.Fragment>
  );
};

export default UserHomeArchives;