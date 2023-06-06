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
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { AiOutlineUser } from "react-icons/ai";
import { useContext, useState } from "react";
import { AccountContext } from "../context/AccountContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import NaviBtn from "./NavigationButton";
import BlinkingText from "./BlinkingText";

type LinkType = {
  children: {
    link: string;
    href: string;
  };
};

const Links = [
  {
    link: "Main",
    href: "/",
  },
  {
    link: "Staging",
    href: "/staging",
  },
];

const NavLink: React.FC<LinkType> = ({ children }) => (
  <Link to={children.href}>{children.link}</Link>
);

export default function Navbar() {
  const { isLoggedIn } = useContext(AccountContext);

  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("black", "white");
  const opositeColor = useColorModeValue("white", "black");

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
    <Box
      bg={useColorModeValue("gray.200", "black")}
      px={4}
      py={2}
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
        <BlinkingText color={color} />
        <HStack
          spacing={8}
          alignItems={"center"}
          fontWeight="semibold"
          fontSize="2xl"
          w="100%"
          justify="center"
          display={{ base: "none", md: "flex" }}
        >
          {Links.map((links) => (
            <Box _hover={{ opacity: "0.9" }}>
              <NavLink key={links.link}>{links}</NavLink>
            </Box>
          ))}
        </HStack>
        <Flex alignItems={"center"}>
          {isLoggedIn ? (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                >
                  <AiOutlineUser size="32" color={color} />
                  {/* <Avatar size={"sm"} src={user?.userPhoto} /> */}
                </MenuButton>
                <MenuList background={opositeColor}>
                  <MenuItem background={opositeColor}>
                    <Link to="/profile">Profil</Link>
                  </MenuItem>
                  <MenuItem background={opositeColor}>
                    <Link to="/pullrequest">Add Motivator</Link>
                  </MenuItem>
                </MenuList>
              </Menu>

              <LogoutButton />
            </>
          ) : (
            <Flex>
              <NaviBtn href="login" btnTxt="Login" />
              <NaviBtn href="register" btnTxt="Register" />
            </Flex>
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
          bg={color}
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
          bg={opositeColor}
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
  );
}
