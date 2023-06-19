import {
  Text,
  Stack,
  Avatar,
  Button,
  useColorModeValue,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { UserData } from "../context/AccountContext";
import { Motivator } from "../interfaces/Motivator.interface";
import { MotivatorsStats } from "../pages/DevProfile/DevProfile";

interface UserCardProps {
  user: UserData | null | undefined;
  userMotivators:
    | {
        motivators: Motivator[];
        stats: MotivatorsStats;
      }
    | undefined;
}

const UserCard: React.FC<UserCardProps> = ({ user, userMotivators }) => {
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
        <Text mt="8" mb={2} fontSize={"xl"}>
          Nick: {user?.login}
        </Text>
        <Text fontSize={"xl"} mb={2}>
          Seniority: {user?.seniority}
        </Text>
        <Text fontSize={"xl"} mb={2}>
          E-mail: {user?.email}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          p={4}
          py="4"
        >
          {user?.aboutMe}
        </Text>
        <Text color={useColorModeValue("gray.700", "gray.400")} px={3}>
          Exp: {userMotivators?.stats.votingStats.exp} /{" "}
          {userMotivators?.stats.votingStats.nextLevelExp}
        </Text>
        <Text color={useColorModeValue("gray.700", "gray.400")} px={3}>
          You need{" "}
          {userMotivators &&
            userMotivators?.stats.votingStats.nextLevelExp -
              userMotivators?.stats.votingStats.exp}{" "}
          exp to becme: {userMotivators?.stats.votingStats.nextLevel}
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
