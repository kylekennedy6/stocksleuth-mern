import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../shared/context/auth-context';
import './UserNavLinks.css';

const UserNavLinks = props => {
  const auth = useContext(AuthContext);
  return (
    <ul className="user-nav-links">
      <li>
        <NavLink to={`/users/${auth.username}/upcoming-trades`} exact>Upcoming Trades</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/unread`} exact>Unread Transcripts</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/tier-one`} exact>Tier 1</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/tier-two`} exact>Tier 2</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${auth.username}/archives`} exact>Archives</NavLink>
      </li>
    </ul>
  );
};

export default UserNavLinks;