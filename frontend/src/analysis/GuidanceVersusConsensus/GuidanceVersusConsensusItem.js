import React from 'react';

import NewGuidanceVersusConsensus from './NewGuidanceVersusConsensus';
import '../AnalysisItem.css';
import UpdateGuidanceVersusConsensus from './UpdateGuidanceVersusConsensus';

const GuidanceVersusConsensusItem = props => {

  if (!props._id) {
    return (
      <React.Fragment>
          <NewGuidanceVersusConsensus />
      </React.Fragment>
    );
  }

  return (
    <UpdateGuidanceVersusConsensus {...props}/>
  );

}
export default GuidanceVersusConsensusItem;