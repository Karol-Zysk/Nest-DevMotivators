import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Button,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { UserData } from "../context/AccountContext";
import { formatDateString } from "../utils/TimeOperations";

interface UserCardProps {
  user: UserData | null | undefined;
}

const Stats: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Flex w={"full"}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          on motivators:
          {formatDateString(user?.createdAt)}
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

export default Stats;
