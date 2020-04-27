import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import NewPastEvent from './NewPastEvent';
import PastEventItem from './PastEventItem';
import '../AnalysisList.css';

const PastEventList = props => {
  if (props.items.length === 0) {
    return (
      <React.Fragment>
        <Card className="smaller">
          <h2>No past events found. Best practice is to add an event report for each comparable next quarter event over the past three years.</h2>
        </Card>
      <NewPastEvent />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ul className="analysis-list">
        {props.items.map(pastEvent => (
          <PastEventItem
            key={pastEvent.id}
            id={pastEvent.id}
            eventType={pastEvent.eventType}
            fiscalQuarter={pastEvent.fiscalQuarter}
            fiscalYear={pastEvent.fiscalYear}
            reactionDate={pastEvent.reactionDate}
            revenueVersusConsensus={pastEvent.revenueVersusConsensus}
            epsVersusConsensus={pastEvent.epsVersusConsensus}
            tlChangeType={pastEvent.tlChangeType}
            tlMidpointChangePercentage={pastEvent.tlMidpointChangePercentage}
            blChangeType={pastEvent.blChangeType}
            blMidpointChangePercentage={pastEvent.blMidpointChangePercentage}
            reaction={pastEvent.reaction}
          />
        ))}
      </ul>
      <NewPastEvent />
    </React.Fragment>
  );
};

export default PastEventList;
