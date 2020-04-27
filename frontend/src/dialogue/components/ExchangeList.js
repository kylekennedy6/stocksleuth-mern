import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import ExchangeItem from './ExchangeItem';
import './ExchangeList.css';

const ExchangeList = props => {
  if (props.items.length === 0) {
    return (
        <Card className="empty-list-card">
          <h2>No exchanges found.</h2>
        </Card>
    );
  }

  return (
    <ul className="exchange-list">
      {props.items.map(exchange => (
        <ExchangeItem
          key={exchange.id} 
          id={exchange.id} 
          number={exchange.number}
          analyst={exchange.analyst}
          questionText={exchange.questionText}
          answers={exchange.answers}
          exchangeRating={exchange.userExchangeRating}
          programmaticRating={exchange.programmaticRating}
        />
      ))}
    </ul>
  );

}
export default ExchangeList;