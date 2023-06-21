import { Box, Text, useColorModeValue, Flex } from "@chakra-ui/react";

interface VotingStats {
  likeCount: number;
  dislikeCount: number;
  exp: number;
  nextLevelExp: number;
  nextLevel: string;
}

interface UserCardProps {
  motivatorsNumber: number | undefined;
  votingStats: VotingStats | undefined;
}

const Stats: React.FC<UserCardProps> = ({ votingStats, motivatorsNumber }) => {
  return (
    <Flex w={"full"}>
      <Box
        borderRight={"4px"}
        borderBottom={"4px"}
        w={"full"}
        bg={useColorModeValue("white", "black")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={12}
        textAlign={"left"}
      >
        <Text mb={4}>
          <strong> Motivators commited:</strong> {motivatorsNumber}
        </Text>
        <Text mb={4}>
          <strong> Total Motivator Likes:</strong> {votingStats?.likeCount}
        </Text>
        <Text mb={4}>
          <strong>Total Motivator Dislikes:</strong> {votingStats?.dislikeCount}
        </Text>
        <Text mb={4}>
          <strong>Like Percentage:</strong>{" "}
          {votingStats && votingStats?.likeCount + votingStats?.dislikeCount > 0
            ? `${(
                (votingStats?.likeCount /
                  (votingStats?.likeCount + votingStats?.dislikeCount)) *
                100
              ).toFixed(2)}%`
            : "N/A"}
        </Text>
      </Box>
    </Flex>
  );
};

export default Stats;
