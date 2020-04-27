import React from 'react';

import './AnswerItem.css';

const AnswerItem = props => {
  return (
    <React.Fragment>
      <div className="answer-item">
        <h4>A: {props.executive}</h4>
        <p>{props.answer}</p>
      </div>
    </React.Fragment>
  );
};

export default AnswerItem;
