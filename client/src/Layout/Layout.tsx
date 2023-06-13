import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { Flex, useColorModeValue } from "@chakra-ui/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bg = useColorModeValue("facebook.200", "gray.900");
  return (
    <Flex minH="100vh" borderTop="8px" borderX="4px" direction="column">
      <Navbar />

      <Flex bg={bg} direction="column" h="100%" flex="1">
        {children}
      </Flex>

      {/* <Footer /> */}
    </Flex>
  );
};
export default Layout;
