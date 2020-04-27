import React from 'react';

import './TranscriptHeader.css';

const TranscriptHeader = props => {
  return (
    <header className="transcript-header">
      {props.children}
    </header>
  );
};

export default TranscriptHeader