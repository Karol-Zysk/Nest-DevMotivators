import {
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import { AccountContext } from "../context/AccountContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import NaviBtn from "./NavigationButton";

type LinkType = {
  children: {
    link: string;
    href: string;
  };
};

const Links = [
  {
    link: "Main",
    href: "/main",
  },
  {
    link: "Staging",
    href: "/staging",
  },
  {
    link: "Add New",
    href: "/add",
  },
];

const NavLink: React.FC<LinkType> = ({ children }) => (
  <Link to={children.href}>{children.link}</Link>
);

export default function Navbar() {
  const { isLoggedIn, user } = useContext(AccountContext);
  console.log(isLoggedIn);

  const { colorMode, toggleColorMode } = useColorMode();
  const shadow = useColorModeValue("1px 1px 1px black", "1px 1px 1px white");
  const color = useColorModeValue("facebook.500", "gray.500");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [menuHeight, setMenuHeight] = useState("0px");

  const handleMenuClick = () => {
    if (isOpen) {
      setMenuHeight("100vh");
    } else {
      setMenuHeight("0px");
    }
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.200", "gray.900")}
        px={4}
        borderBottom="4px"
      >
        <Flex h="min" p="4" align={"center"} justifyContent={"space-between"}>
          {
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={() => {
                handleMenuClick();
                isOpen ? onClose() : onOpen();
              }}
            />
          }
          <Box
            textShadow={shadow}
            fontSize={["2xl", "3xl", "4xl"]}
            fontWeight="bold"
            color={color}
          >
            Dev-Motivators
          </Box>
          <HStack
            spacing={8}
            alignItems={"center"}
            fontWeight="semibold"
            fontSize="xl"
            display={{ base: "none", md: "flex" }}
          >
            {Links.map((links) => (
              <motion.div
                key={links.link}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <NavLink key={links.link}>{links}</NavLink>
              </motion.div>
            ))}
          </HStack>
          <Flex alignItems={"center"}>
            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <>
                <NaviBtn href="login" btnTxt="Login" />
                <NaviBtn href="register" btnTxt="Register" />
              </>
            )}
            <Button size={["sm", "sm", "sm"]} ml="3" onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Flex>
        </Flex>
        <Box
          pb={4}
          display={{ md: "none" }}
          onClick={() => {
            handleMenuClick();
            isOpen ? onClose() : onOpen();
          }}
        >
          <Stack
            as={"nav"}
            spacing={4}
            bg={useColorModeValue("gray.200", "gray.900")}
            w={"100%"}
            position={"absolute"}
            top={"100%"}
            left={0}
            zIndex={999}
            overflow={"hidden"}
            transition={"height 0.3s ease-in-out"}
            height={menuHeight}
          >
            {Links.map((links) => (
              <NavLink key={links.link}>{links}</NavLink>
            ))}
          </Stack>
        </Box>
        {isOpen ? (
          <Box
            bg={color}
            w={"100%"}
            h={"100vh"}
            pos={"absolute"}
            top={0}
            left={0}
            zIndex={100}
            onClick={onClose}
          >
            <Flex alignItems={"center"} justifyContent={"center"} h={"100%"}>
              <VStack as={"nav"} spacing={"10"} align="center">
                {Links.map((links) => (
                  <motion.div
                    key={links.link}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Text fontWeight="semibold" fontSize="xl">
                      <NavLink key={links.link}>{links}</NavLink>
                    </Text>
                  </motion.div>
                ))}
              </VStack>
            </Flex>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
