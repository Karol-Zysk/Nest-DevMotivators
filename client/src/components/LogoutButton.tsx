import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";

import { AccountContext } from "../context/AccountContext";
import { useNavigate } from "react-router";
import { ApiClient } from "../utils/ApiClient";

const LogoutButton = () => {
  const { cleanAfterLogout } = useContext(AccountContext);
  const toast = useToast();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const apiClient = new ApiClient();
    try {
      await apiClient.get(`/auth/logout`);

      cleanAfterLogout();

      setTimeout(() => {
        navigate("/");
      }, 500);

      toast({
        title: "Success",
        description: "You have successfully logged out.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while logging out.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Button
      display={{ base: "none", md: "flex" }}
      size={["xs", "sm", "md"]}
      bg="transparent"
      color="white"
      ml="2"
      border="2px"
      borderStyle="dashed"
      _hover={{ bg: "white", color: "black", borderColor: "black" }}
      borderColor="white"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
