import React, { useState } from 'react';

import UserHeader from './UserHeader';
import UserNavLinks from './UserNavLinks';
import UserDropdown from './UserDropdown';
import Backdrop from '../../../shared/components/UIElements/Backdrop';
import './UserNavigation.css';

const UserNavigation = props => {
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
      <UserDropdown>
        <nav className="user-navigation__drawer-nav">
          <UserNavLinks />
        </nav>
      </UserDropdown>}
      <UserHeader>
        <button className="user-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <nav className="user-navigation__header-nav">
          <UserNavLinks />
        </nav>
      </UserHeader>
    </React.Fragment>
  );
};

export default UserNavigation;