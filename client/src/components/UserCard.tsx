import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  Button,
  useColorModeValue,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { UserData } from "../context/AccountContext";

interface UserCardProps {
  user: UserData | null | undefined;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const toast = useToast();
  return (
    <Flex py={2} w={"full"}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"2xl"}
          src={user?.userPhoto}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {user?.login}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {user?.email}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          Fajny Ziomo
        </Text>
        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            onClick={() => {
              toast({
                title: "Info",
                description: "Not yet implemented",
                status: "info",
                duration: 5000,
                isClosable: true,
              });
            }}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
          >
            Message
          </Button>
          <Button
            onClick={() => {
              toast({
                title: "Info",
                description: "Not yet implemented",
                status: "info",
                duration: 5000,
                isClosable: true,
              });
            }}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={"0 5px 20px 0px rgba(66, 153, 225, 0.5)"}
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Follow
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default UserCard;
