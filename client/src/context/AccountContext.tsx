import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ApiClient, AuthResponse } from "../utils/ApiClient";

export interface UserData {
  userPhoto: string;
  id: string;
  email: string;
  login: string;
}

interface AccountContextValue {
  user: UserData | undefined | null;
  isLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  error: null | string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  cleanAfterLogout: () => void;
}

const initialState: AccountContextValue = {
  user: null,
  isLoggedIn: false,
  setIsLoggedIn: () => false,
  setUser: () => undefined,
  error: null,
  setError: () => null,
  cleanAfterLogout: () => undefined,
};

const AccountContext = createContext<AccountContextValue>(initialState);

const AccountContextProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  const [user, setUser] = useState<UserData | undefined | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const cleanAfterLogout = () => {
    setUser(undefined);
    setIsLoggedIn(false);
  };

  const refreshAccessToken = async () => {
    const apiClient = new ApiClient();
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return;

    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("You're not logged in!");
      }

      const response = await apiClient.get<{ data: AuthResponse }>(
        "/auth/refresh",
        {
          headers: { authorization: `Bearer ${refreshToken}` },
        }
      );
      const { data } = response;

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refreshToken);
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      console.error(error);
      setError(error);
      toast({
        title: "Error",
        description: `${error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const apiClient = new ApiClient();
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        cleanAfterLogout();
        return;
      }

      try {
        const response = await apiClient.get<UserData>("/user/me");
        setUser(response);
        setIsLoggedIn(true);
      } catch (error: any) {
        console.log(error);

        toast({
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshAccessToken();
    }, 10 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        cleanAfterLogout,
        error,
        setError,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountContextProvider };
