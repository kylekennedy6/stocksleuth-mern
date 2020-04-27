import React from 'react';

import TranscriptTitle from './TranscriptTitle';
import TranscriptNavigation from './TranscriptNavigation';
import './TranscriptHome.css';

const TranscriptHome = () => {

  return (
    <React.Fragment>
      <div className="transcript-home-title-container">
        <TranscriptTitle />
        <TranscriptNavigation />
      </div>
    </React.Fragment>
  );
};

export default TranscriptHome;