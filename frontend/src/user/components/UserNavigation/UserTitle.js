import React, { useContext } from 'react';

import { AuthContext } from '../../../shared/context/auth-context';
import './UserTitle.css';

const UserTitle = props => {
  const auth = useContext(AuthContext);
  const pageName = () => {
    const currentUrl = window.location.href;
    if (currentUrl.includes('unread')) {
      return 'Unread Transcripts'
    } else if (currentUrl.includes('tier-one')) {
      return 'Tier One Transcripts'
    } else if (currentUrl.includes('tier-two')) {
      return 'Tier Two Transcripts'
    } else if (currentUrl.includes('upcoming')) {
      return 'Upcoming Trades'
    } else if (currentUrl.includes('archives')) {
      return 'Archives'
    }
  }
  return (
  <header className="user-title">
    <h3>{auth.username}'s {pageName()}</h3>
  </header>
  );
};

export default UserTitle;