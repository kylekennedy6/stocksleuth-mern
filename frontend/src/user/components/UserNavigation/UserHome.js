import React from 'react';

import UserTitle from './UserTitle';
import UserNavigation from './UserNavigation';
import './UserHome.css';

const UserHome = () => {

  return (
    <React.Fragment>
        <div className="title-header-container">
        <UserTitle />
        <UserNavigation />
        </div>
    </React.Fragment>
  );
};

export default UserHome;