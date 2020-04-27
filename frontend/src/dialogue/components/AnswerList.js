import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import AnswerItem from './AnswerItem';
import './AnswerList.css';

const AnswerList = props => {
  if (props.items.length === 0) {
    return (
      <div className="answer-container">
        <Card>
          <h2>No answers found for this exchange.</h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="answer-container">
      {props.items.map(answer => (
        <AnswerItem 
          key={answer.executive} 
          executive={answer.executive} 
          answer={answer.answer}
        />
      ))}
    </div>
  );

}
export default AnswerList;