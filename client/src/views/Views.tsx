import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { Route, Routes } from "react-router";
import Navbar from "../components/Navbar";
// import Footer from "./Footer";
import { AccountContext } from "../context/AccountContext";
import Main from "../pages/Main/Main";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import PrivateRoutes from "../routes/PrivateRoutes";
import AuthRoutes from "../routes/AuthRoutes";

const Views = () => {
  const { user } = useContext(AccountContext);

  return (
    <Flex minH="100vh" direction="column">
      <Navbar />

      <Flex direction="column" height="100%" flex="1">
        {user === null ? (
          <Flex flex="1" borderColor="gray.200" justify="center" align="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.300"
              color="facebook.400"
              size="xl"
            />
          </Flex>
        ) : (
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/main" element={<Main />} />
            </Route>

            <Route element={<AuthRoutes />} path="/">
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="*" element={<Main />} />
            </Route>
          </Routes>
        )}
      </Flex>

      {/* <Footer /> */}
    </Flex>
  );
};

export default Views;
