/* Hook is used to make use of the presisted user authentication data
 *
 */
import { useEffect } from 'react';
import { useAppDispatch } from './index';
import { setToken, setLogoutTimer, userLogoutThunk } from '../store';
import { calculateRemainingTime } from '../store';

const retrieveTokenData = () => {
  const storedToken = localStorage.getItem('token');
  const storeExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = storeExpirationDate
    ? calculateRemainingTime(storeExpirationDate)
    : 0;
  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const useTokenData = () => {
  const dispatch = useAppDispatch();

  // restore login when opening the website
  useEffect(() => {
    const tokenData = retrieveTokenData();

    if (tokenData && tokenData.token && tokenData.duration) {
      dispatch(setToken({ token: tokenData.token }));

      setLogoutTimer(
        setTimeout.bind(null, () => userLogoutThunk, tokenData.duration)
      );
    }
  }, []);
};
