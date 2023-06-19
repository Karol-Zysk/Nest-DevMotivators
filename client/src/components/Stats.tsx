import {
  Box,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { UserData } from "../context/AccountContext";
import { MotivatorsStats } from "../pages/DevProfile/DevProfile";
import { Motivator } from "../interfaces/Motivator.interface";

interface UserCardProps {
  user: UserData | null | undefined;
  userMotivators:
    | {
        motivators: Motivator[];
        stats: MotivatorsStats;
      }
    | undefined;
}

const Stats: React.FC<UserCardProps> = ({ userMotivators }) => {
  return (
    <Flex w={"full"}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "black")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={12}
        textAlign={"left"}
      >
        <Text mb={4}>
          Motivators commited: {userMotivators?.motivators.length}
        </Text>
        <Text mb={4}>
          Total Motivator Likes: {userMotivators?.stats.votingStats.likeCount}
        </Text>
        <Text mb={4}>
          Total Motivator Dislikes:{" "}
          {userMotivators?.stats.votingStats.dislikeCount}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {/* id: {user._id} */}
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
