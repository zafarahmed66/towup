import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCookie from "@/hooks/useCookie";
import {
  AuthContextType,
  AuthData,
  AuthProviderProps,
  UserType,
} from "@/types/types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken, removeToken] = useCookie<string>("token", "");
  const [expiresIn, setExpiresIn, removeExpiresIn] = useCookie<number>(
    "expiresIn",
    0
  );
  const [userType, setUserType, removeUserType] = useCookie<UserType>(
    "userType",
    null
  );
  const [userId, setUserId, removeUserId] = useCookie<string>("userId", "");

  const navigate = useNavigate();

  const clearAuthData = useCallback(() => {
    removeToken();
    removeExpiresIn();
    removeUserType();
    removeUserId();
  }, [removeToken, removeExpiresIn, removeUserType, removeUserId]);

  const handleLogout = useCallback(
    (message?: string, redirectPath: string = "/login") => {
      if (message) {
        toast.warning(message);
      }
      clearAuthData();
      navigate(redirectPath);
    },
    [clearAuthData, navigate]
  );

  const setAuthData = useCallback(
    (data: AuthData) => {
      const expirationTimestamp = Date.now() + data.expiresIn;
      const expirationDate = new Date(expirationTimestamp);

      const cookieOptions = {
        expires: expirationDate,
        secure: true,
        sameSite: "strict" as const,
      };

      setToken(data.token, cookieOptions);
      setExpiresIn(expirationTimestamp, cookieOptions);
      setUserId(data.entityId, cookieOptions);
      setUserType(data.userType, cookieOptions);
    },
    [setToken, setExpiresIn, setUserId, setUserType]
  );

  const onLogOut = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      handleLogout("Logged out successfully");
    },
    [handleLogout]
  );

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (
        window.location.pathname.includes("/signup") ||
        window.location.pathname.includes("/login")
      ) {
        return;
      }
      if (!expiresIn) {
        handleLogout("Session information missing");
        return;
      }

      const currentTime = Date.now();
      const remainingTime = expiresIn - currentTime;

      if (remainingTime <= 0) {
        handleLogout("Session expired");
        return;
      }
    };

    if (token) {
      checkTokenExpiration();
    }

    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [token, expiresIn, handleLogout, navigate]);

  const contextValue: AuthContextType = {
    token,
    setToken,
    removeToken,
    userType,
    setUserType,
    removeUserType,
    userId,
    setUserId,
    removeUserId,
    onLogOut,
    setAuthData,
    handleLogout,
    setExpiresIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
