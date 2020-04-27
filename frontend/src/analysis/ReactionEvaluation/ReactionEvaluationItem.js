import React from 'react';

import NewReactionEvaluation from './NewReactionEvaluation';
import '../AnalysisItem.css';
import UpdateReactionEvaluation from './UpdateReactionEvaluation';

const ReactionEvaluationItem = props => {

  if (!props._id) {
    return (
      <React.Fragment>
        <NewReactionEvaluation />
      </React.Fragment>
    );
  }

  return (
    <UpdateReactionEvaluation {...props}/>
  );

}
export default ReactionEvaluationItem;