import React from 'react';

import './QuestionItem.css';

const QuestionItem = props => {
  return (
    <React.Fragment>
      <div className="question-item">
        <h4>Q: {props.analyst}</h4>
        <p>{props.questionText}</p>
      </div>
    </React.Fragment>
  );
};

export default QuestionItem;
