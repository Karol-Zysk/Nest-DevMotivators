import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import MainInfo from "../components/MainInfo";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bg = useColorModeValue("blackAlpha.200", "gray.900");
  return (
    <Flex
      minH="100vh"
      borderTop="8px"
      borderX="4px"
      direction="column"
      position={"relative"}
    >
      <Navbar />

      <Flex bg={bg} direction="column" h="100%" flex="1">
        <MainInfo />
        {children}
      </Flex>

      {/* <Footer /> */}
    </Flex>
  );
};
export default Layout;
