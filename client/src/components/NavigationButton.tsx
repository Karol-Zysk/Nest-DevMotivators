import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const NaviBtn = ({ href, btnTxt }: { href: string; btnTxt: string }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate(href);
  };

  return (
    <Button
      size={["xs", "sm", "md"]}
      bg="facebook.400"
      color="white"
      rounded="xl"
      border="2px"
      _hover={{ bg: "facebook.200", color: "black", borderColor: "black" }}
      borderColor="white"
      onClick={handleLogout}
    >
      {btnTxt}
    </Button>
  );
};

export default NaviBtn;
