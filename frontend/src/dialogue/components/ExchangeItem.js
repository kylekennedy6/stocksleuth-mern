import React from 'react';

import AnswerList from './AnswerList';
import Card from '../../shared/components/UIElements/Card';
import './ExchangeItem.css';
import QuestionItem from './QuestionItem';
import NewExchangeRating from '../../ratings/components/NewExchangeRating';
import UpdateExchangeRating from '../../ratings/components/UpdateExchangeRating';

const ExchangeItem = props => {

  return (
    <React.Fragment>
      <li className="exchange-item">
        <Card className="exchange-item__content">
            <h3>QA{props.number} (Programmatic Rating: {props.programmaticRating})</h3>
            <QuestionItem {...props} />
            <AnswerList items={props.answers} />
            {!props.exchangeRating &&
            <NewExchangeRating {...props} />}
            {props.exchangeRating &&
            <UpdateExchangeRating {...props.exchangeRating} />}
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ExchangeItem;
