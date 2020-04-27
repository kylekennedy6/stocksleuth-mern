import React from 'react';

import NewTendencies from './NewTendencies';
import UpdateTendencies from './UpdateTendencies';
import '../AnalysisItem.css';

const TendenciesItem = props => {

  if (!props._id) {
    return (
      <React.Fragment>
        <NewTendencies />
      </React.Fragment>
    );
  }

  return (
    <UpdateTendencies {...props}/>
  );

}
export default TendenciesItem;