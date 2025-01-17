/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCookie from "@/hooks/useCookie";
import { AuthContextType, AuthProviderProps, UserType } from "@/types/types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken, removeToken] = useCookie("token", null);
  const [expiresIn, _setExpiresIn, removeExpiresIn] = useCookie(
    "expiresIn",
    null
  );
  const [userType, setUserType, removeUserType] = useCookie<UserType>("userType", null);
  const [userId, setUserId, removeUserId] = useCookie("userId", null);

  const navigate = useNavigate();

    const onLogOut = (event: any) => {
      event.preventDefault();
      removeToken();
      removeExpiresIn();
      removeUserType();
      removeUserId();
      navigate("/login");
    };

  useEffect(() => {
    if (expiresIn) {
      const currentTime = Date.now();
      const expirationTime = currentTime + expiresIn; 
      const remainingTime = expirationTime - currentTime;

      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          toast.warning("Session expired. Logging out...");
          removeToken();
          removeExpiresIn();
          removeUserId();
          removeUserType();
          navigate("/login");
        }, remainingTime);

        return () => clearTimeout(timer);
      } else {
        toast.warning("Session expired. Logging out...");
        removeToken();
        removeExpiresIn();
        removeUserId();
        removeUserType();
        navigate("/login");
      }
    }
  }, [
    expiresIn,
    removeToken,
    removeExpiresIn,
    removeUserId,
    removeUserType,
    navigate,
  ]);

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
    onLogOut
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
