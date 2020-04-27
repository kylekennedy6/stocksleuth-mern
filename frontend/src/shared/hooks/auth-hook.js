import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState(false);

  const login = useCallback((uid, username, token, expirationDate) => {
    setUserId(uid);
    setUsername(username)
    setToken(token);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 12);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData', 
      JSON.stringify({
        userId: uid, 
        username: username, 
        token: token, 
        expiration: tokenExpirationDate.toISOString() 
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setTokenExpirationDate(null);
    setUsername(null);
    setToken(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData && 
      storedData.token && 
      new Date(storedData.expiration) > new Date()
     ) {
      login(storedData.userId, storedData.username, storedData.token, new Date(storedData.expiration));
    } 
  }, [login]);

  return { token, login, logout, userId, username };
};