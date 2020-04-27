import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import OpeningStatementItem from './OpeningStatementItem';
import './OpeningStatementList.css';

const OpeningStatementList = props => {
  if (props.items.length === 0) {
    return (
        <Card className="empty-list-card">
          <h2>No opening statements found.</h2>
        </Card>
    );
  }

  return (
    <ul className="openingStatement-list">
      {props.items.map(openingStatement => (
        <OpeningStatementItem 
          key={openingStatement._id} 
          id={openingStatement._id} 
          number={openingStatement.number}
          executive={openingStatement.executive}
          text={openingStatement.text}
          openingStatementRating={openingStatement.userOpeningStatementRating}
          programmaticRating={openingStatement.programmaticRating}
        />
      ))}
    </ul>
  );

}
export default OpeningStatementList;