import { useState } from "react";
import Cookies from "js-cookie";
import { CookieAttributes } from "@/types/types";



function useCookie<T = string>(key: string, defaultValue: T) {
  const [cookie, setCookieState] = useState<T>(() => {
    const cookieValue = Cookies.get(key);
    return cookieValue ? (JSON.parse(cookieValue) as T) : defaultValue;
  });

  const setCookie = (value: T, options: CookieAttributes = {}) => {
    Cookies.set(key, JSON.stringify(value), options);
    setCookieState(value);
  };

  const removeCookie = (options: CookieAttributes = {}) => {
    Cookies.remove(key, options);
    setCookieState(defaultValue);
  };

  return [cookie, setCookie, removeCookie] as const;
}

export default useCookie;
