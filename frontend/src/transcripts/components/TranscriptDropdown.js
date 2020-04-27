import React from 'react';
import ReactDOM from 'react-dom';

import './TranscriptDropdown.css';

const TranscriptDropdown = props => {
  const content = (
    <aside className="transcript-dropdown">{props.children}</aside>
  );
  return ReactDOM.createPortal(content, document.getElementById('dropdown-hook'));
};

export default TranscriptDropdown;