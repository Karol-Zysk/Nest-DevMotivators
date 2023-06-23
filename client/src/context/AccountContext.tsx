import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ApiClient } from "../utils/ApiClient";
import { useCookies } from "react-cookie";
import { expiresTime } from "../utils/TimeOperations";
import { Role, Seniority, Technology } from "../utils/enums";

export interface UserData {
  userPhoto: string;
  id: string;
  email: string;
  login: string;
  createdAt: string;
  seniority?: Seniority;
  aboutMe: string;
  technology: Technology;
  role: Role;
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

  const cleanAfterLogout = () => {
    removeCookie("is_logged_in", { path: "/" });
    setUser(undefined);
    setIsLoggedIn(false);
  };

  const fetchUserData = async () => {
    const apiClient = new ApiClient();

    try {
      const response = await apiClient.get<UserData>("/user/me");

      if (response) {
        setUser(response);
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      if (error.statusCode === 401) {
        try {
          console.log("elo");
          await apiClient.get("/auth/refresh");

          const response = await apiClient.get<UserData>("/user/me");

          if (!response) {
            toast({
              title: "Error",
              description: `Something Went Wrong`,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
          setUser(response);
          setIsLoggedIn(true);
          setCookie("is_logged_in", true, {
            path: "/",
            expires: expiresTime,
          });
        } catch (refreshError: any) {
          cleanAfterLogout();

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
    if (isLoggedIn) fetchUserData();
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
