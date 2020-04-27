import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';
import './TranscriptItem.css';
import TickerItem from '../../tickers/TickerItem';
import { FORMAT_DATE } from '../../shared/util/formOptions';

const TranscriptItem = props => {
  const auth = useContext(AuthContext);

  return (
    <li className="transcript-item">
      <Card className="transcript__content">
        <Link to={`/users/${auth.username}/transcripts/${props.id}/exchanges`}>
          <div className="transcript-item__info">
              <TickerItem {...props.ticker} />
              <h3>{props.fiscalQuarter}{props.fiscalYear}</h3>
              <h4>Filter Rating: {props.programmaticRating}</h4>
              {props.userTradeSubmission && (
                <h4>{props.userTradeSubmission.direction} on {FORMAT_DATE(props.userTradeSubmission.entranceDate)}</h4>
              )}
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default TranscriptItem;