import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import NewOpeningStatementRating from '../../ratings/components/NewOpeningStatementRating';
import './OpeningStatementItem.css';
import UpdateOpeningStatementRating from '../../ratings/components/UpdateOpeningStatementRating';

const OpeningStatementItem = props => {

  return (
    <React.Fragment>
      <li className="openingStatement-item">
        <Card className="openingStatement-item__content">
          <h3>OS{props.number} (Programmatic Rating: {props.programmaticRating})</h3>
          <h5>{props.executive}</h5>
          <p>{props.text}</p>
          {!props.openingStatementRating &&
          <NewOpeningStatementRating {...props} />}
          {props.openingStatementRating &&
          <UpdateOpeningStatementRating {...props.openingStatementRating} />}
        </Card>
      </li>
    </React.Fragment>
  );
};

export default OpeningStatementItem;
