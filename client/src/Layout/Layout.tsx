import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { Flex } from "@chakra-ui/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex minH="100vh" direction="column">
      <Navbar />

      <Flex direction="column" height="100%" flex="1">
        {children}
      </Flex>

      {/* <Footer /> */}
    </Flex>
  );
};
export default Layout;
