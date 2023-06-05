import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const NaviBtn = ({ href, btnTxt }: { href: string; btnTxt: string }) => {
  const navigate = useNavigate();

  const handleNavigate = async () => {
    navigate(href);
  };

  return (
    <Button
      size={["xs", "sm", "md"]}
      bg="transparent"
      color="white"
      ml="2"
      border="2px"
      borderStyle="dashed"
      _hover={{ bg: "white", color: "black", borderColor: "black" }}
      borderColor="white"
      onClick={handleNavigate}
    >
      {btnTxt}
    </Button>
  );
};

export default NaviBtn;
