import React from 'react';

import NewSentiment from './NewSentiment';
import '../AnalysisItem.css';
import UpdateSentiment from './UpdateSentiment';

const SentimentItem = props => {
  if (!props._id) {
    return (
      <React.Fragment>
        <NewSentiment />
      </React.Fragment>
    );
  }

  return (
    <UpdateSentiment {...props}/>
  );

}
export default SentimentItem;