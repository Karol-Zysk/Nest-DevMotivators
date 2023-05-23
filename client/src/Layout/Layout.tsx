import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { Flex } from "@chakra-ui/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction={"column"} border={"8px"} w="full">
      <Navbar />
      {children}
    </Flex>
  );
};
export default Layout;
