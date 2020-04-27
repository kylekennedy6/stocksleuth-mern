import React from 'react';

import './UserHeader.css';

const UserHeader = props => {

  return (
    <header className="user-header">
      {props.children}
    </header>
  );
};

export default UserHeader