import React from 'react';

import '../AnalysisItem.css';
import UpdatePastEvent from './UpdatePastEvent';

const PastEventItem = props => {

  return (
    <React.Fragment>
      <UpdatePastEvent {...props} />
    </React.Fragment>
  );
};

export default PastEventItem;
