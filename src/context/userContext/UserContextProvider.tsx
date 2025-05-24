import axios, { AxiosError } from "axios";
import { useEffect, useState, type ReactNode, useCallback, useMemo } from "react";
import { UserContext } from "./UserContext";
import type { UserData } from "./UserContext";

interface UserContextProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: UserContextProps) => {
  const [userToken, setUserToken] = useState<string | null>(() => {
    return localStorage.getItem("userToken");
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleAuthRequest = async <T,>(url: string, data: UserData, isSignupFlow: boolean) => {
    setIsLoading(true);
    setIsSignup(isSignupFlow);
    setError(null);

    try {
      // Fix: Pass data as the request body (second parameter), not as the config
      const response = await axios.post<T & { userToken: string }>(url, data);
      setUserToken(response.data.userToken);
      localStorage.setItem("userToken", response.data.userToken);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setError(err.response?.data?.message || err.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = useCallback(async (data: UserData) => {
    await handleAuthRequest("http://localhost:5001/api/user/signUp", data, true);
  }, []);

  const signIn = useCallback(async (data: UserData) => {
    await handleAuthRequest("http://localhost:5001/api/user/login", data, false);
  }, []);

  const signOut = useCallback(() => {
    setUserToken(null);
    localStorage.removeItem("userToken");
  }, []);

  const checkUser = useCallback(async (data: UserData) => {
    setIsChecked(true);
    setError(null);

    try {
      // Fix: Pass data as params in the config object for GET requests
      const response = await axios.get("http://localhost:5001/api/user/check", { params: data });
      setUserToken(response.data.userToken);
      localStorage.setItem("userToken", response.data.userToken);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setError(err.response?.data?.message || err.message || "Unknown error");
    }
    
}, []);

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("userToken", userToken);
    } else {
      localStorage.removeItem("userToken");
    }
  }, [userToken]);

  const contextValue = useMemo(
    () => ({
      userToken,
      signUp,
      signIn,
      signOut,
      checkUser,
      isLoading,
      error,
      isSignup,
      isChecked
    }),
    [userToken, signUp, signIn, signOut, checkUser, isLoading, error, isSignup, isChecked]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
