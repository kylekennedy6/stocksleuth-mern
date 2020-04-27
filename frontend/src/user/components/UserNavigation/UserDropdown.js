import React from 'react';
import ReactDOM from 'react-dom';

import './UserDropdown.css';

const UserDropdown = props => {
  const content = (
    <aside className="user-dropdown">{props.children}</aside>
  );
  return ReactDOM.createPortal(content, document.getElementById('dropdown-hook'));
};

export default UserDropdown;