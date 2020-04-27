import React, { useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import './TranscriptNavLinks.css';

const TranscriptNavLinks = props => {
  const auth = useContext(AuthContext);
  const transcriptId = useParams().transcriptId;
  return (
    <ul className="transcript-nav-links">
      <li>
        <NavLink to={`/users/${auth.username}/transcripts/${transcriptId}/exchanges`} exact>QA</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/transcripts/${transcriptId}/opening-statements`} exact>OS</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/transcripts/${transcriptId}/full-transcript`} exact>Full Transcript</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/transcripts/${transcriptId}/guidance-versus-consensus`} exact>Guidance vs. Consensus</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/transcripts/${transcriptId}/past-events`}  exact>Past Events</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/transcripts/${transcriptId}/tendencies`}  exact>Tendencies</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/transcripts/${transcriptId}/sentiment`}  exact>Sentiment</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/transcripts/${transcriptId}/trade-submission`}  exact>Trade Submission</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/transcripts/${transcriptId}/reaction-evaluation`}  exact>Reaction Evaluation</NavLink>
      </li>
    </ul>
  );
};

export default TranscriptNavLinks;