import React from 'react';

import TranscriptItem from './TranscriptItem';
import Card from '../../shared/components/UIElements/Card';
import './TranscriptsList.css';

const TranscriptsList = props => {
  if (props.items.length === 0) {
    return (
      <Card className="empty-list-card-center">
        <h2>No transcripts found.</h2>
      </Card>
  );
  }
  return (
    <ul className="transcripts-list">
      {props.items.map(transcript => (
        <TranscriptItem 
          key={transcript.id} 
          id={transcript.id}
          ticker={transcript.ticker}
          fiscalQuarter={transcript.fiscalQuarter}
          fiscalYear={transcript.fiscalYear}
          eventDate={transcript.eventDate}
          projectedReportDate = {transcript.projectedReportDate}
          programmaticRating = {transcript.programmaticRating}
          userTradeSubmission = {transcript.userTradeSubmission}
        />
      ))}
    </ul>
  );
};

export default TranscriptsList;