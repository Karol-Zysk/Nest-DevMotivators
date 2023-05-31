import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ApiClient, AuthResponse } from "../utils/ApiClient";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const cleanAfterLogout = () => {
    setUser(undefined);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const apiClient = new ApiClient();

      try {
        const response = await apiClient.get<UserData>("/user/me");
        setUser(response);
        setIsLoggedIn(true);
      } catch (error: any) {
        if (error.statusCode === 401) {
          try {
            await apiClient.get("/refresh"); // odświeżamy tokeny
            const response = await apiClient.get<UserData>("/user/me");
            setUser(response);
            setIsLoggedIn(true);
          } catch (refreshError: any) {
            console.log(refreshError.statusCode);

            cleanAfterLogout();
            navigate("/login");

            toast({
              title: "Error",
              description: `${refreshError.message}`,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          toast({
            title: "Error",
            description: `${error.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };

    fetchUserData();
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
