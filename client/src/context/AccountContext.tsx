import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ApiClient } from "../utils/ApiClient";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { expiresTime } from "../utils/TimeOperations";

export interface UserData {
  userPhoto: string;
  id: string;
  email: string;
  login: string;
  createdAt: string;
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
  const [cookies, setCookie, removeCookie] = useCookies(["is_logged_in"]);
  const LoggedIn = cookies["is_logged_in"];

  const toast = useToast();

  const [user, setUser] = useState<UserData | undefined | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!LoggedIn);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const cleanAfterLogout = () => {
    removeCookie("is_logged_in", { path: "/" });
    setUser(undefined);
    setIsLoggedIn(false);
  };

  const fetchUserData = async () => {
    const apiClient = new ApiClient();

    try {
      const response = await apiClient.get<UserData>("/user/me");
      console.log(response);
      if (response) {
        setUser(response);
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      if (error.statusCode === 401) {
        try {
          await apiClient.get("/auth/refresh");
          const response = await apiClient.get<UserData>("/user/me");

          if (response) {
            setUser(response);
            setIsLoggedIn(true);
            setCookie("is_logged_in", true, {
              path: "/",
              expires: expiresTime,
            });
          }
        } catch (refreshError: any) {
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

  useEffect(() => {
    console.log(isLoggedIn);

    if (LoggedIn) fetchUserData();
    return;
  }, [isLoggedIn]);

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
