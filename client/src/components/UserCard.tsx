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
      <Flex
        w={"full"}
        direction={"column"}
        bg={useColorModeValue("white", "black")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={12}
        justify={"center"}
      >
        <Avatar
          size={"2xl"}
          src={user?.userPhoto}
          mb={4}
          alignSelf={"center"}
          pos={"relative"}
        />
        <Text fontSize={"2xl"}>Dev{user?.login}</Text>
        <Text fontSize={"2xl"}>Seniority: {"trainee"}</Text>
        <Text mb={4}>E-mail: {user?.email}</Text>
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
      </Flex>
    </Flex>
  );
};

export default UserCard;
