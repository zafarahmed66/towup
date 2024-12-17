import { useState } from 'react';
import Cookies from 'js-cookie';

function useCookie(key: string, defaultValue: any) {
  const [cookie, setCookieState] = useState(() => Cookies.get(key) || defaultValue);

  // Function to update the cookie
  const setCookie = (value: any, options = {}) => {
    Cookies.set(key, value, options);
    setCookieState(value); // Update state
  };

  // Function to remove the cookie
  const removeCookie = (options = {}) => {
    Cookies.remove(key, options);
    setCookieState(null); // Clear state
  };

  return [cookie, setCookie, removeCookie];
}

export default useCookie;