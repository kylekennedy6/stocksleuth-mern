import React from 'react';

import NewTradeSubmission from './NewTradeSubmission';
import '../AnalysisItem.css';
import UpdateTradeSubmission from './UpdateTradeSubmission';

const TradeSubmissionItem = props => {

  if (!props._id) {
    return (
      <React.Fragment>
        <NewTradeSubmission />
      </React.Fragment>
    );
  }

  return (
    <UpdateTradeSubmission {...props}/>
  );

}
export default TradeSubmissionItem;