import React, { useState } from 'react';

import TranscriptHeader from './TranscriptHeader';
import TranscriptNavLinks from './TranscriptNavLinks';
import TranscriptDropdown from './TranscriptDropdown';
import Backdrop from '../../shared/components/UIElements/Backdrop';
import './TranscriptNavigation.css';

const TranscriptNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  
  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
      {drawerIsOpen &&
      <TranscriptDropdown>
        <nav className="transcript-navigation__drawer-nav">
          <TranscriptNavLinks />
        </nav>
      </TranscriptDropdown>}
      <TranscriptHeader>
        <button className="transcript-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <nav className="transcript-navigation__header-nav">
          <TranscriptNavLinks />
        </nav>
      </TranscriptHeader>
    </React.Fragment>
  );
};

export default TranscriptNavigation;