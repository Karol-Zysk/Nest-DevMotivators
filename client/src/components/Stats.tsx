import {
  Box,
  Text,
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
          <strong> Motivators commited:</strong>{" "}
          {userMotivators?.motivators.length}
        </Text>
        <Text mb={4}>
          <strong> Total Motivator Likes:</strong>{" "}
          {userMotivators?.stats.votingStats.likeCount}
        </Text>
        <Text mb={4}>
          <strong>Total Motivator Dislikes:</strong>{" "}
          {userMotivators?.stats.votingStats.dislikeCount}
        </Text>
        <Text mb={4}>
          <strong>Like Percentage:</strong>{" "}
          {userMotivators &&
          userMotivators.stats.votingStats.likeCount +
            userMotivators.stats.votingStats.dislikeCount >
            0
            ? `${
                (userMotivators.stats.votingStats.likeCount /
                  (userMotivators.stats.votingStats.likeCount +
                    userMotivators.stats.votingStats.dislikeCount)) *
                100
              }%`
            : "N/A"}
        </Text>
      </Box>
    </Flex>
  );
};

export default Stats;
