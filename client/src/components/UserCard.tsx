import { Text, Avatar, useColorModeValue, Flex, Box } from "@chakra-ui/react";
import { UserData } from "../context/AccountContext";
import { ProgressBar } from "./ProgressBar";

interface VotingStats {
  likeCount: number;
  dislikeCount: number;
  exp: number;
  nextLevelExp: number;
  nextLevel: string;
}

interface UserCardProps {
  user: UserData | null | undefined;

  votingStats: VotingStats | undefined;
}

const UserCard: React.FC<UserCardProps> = ({ user, votingStats }) => {
  const exp = votingStats?.exp;
  const nextLevel = votingStats?.nextLevel;
  const nextLevelExp = votingStats?.nextLevelExp;

  let progressValue = 0;

  if (exp !== undefined && nextLevelExp !== undefined && nextLevelExp !== 0) {
    progressValue = (exp / nextLevelExp) * 100;
  }

  return (
    <Flex py={2} mb={"4"} w={"full"}>
      <Flex
        borderRight={"4px"}
        borderBottom={"4px"}
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
          name={user?.login}
          mb={4}
          alignSelf={"center"}
          pos={"relative"}
        />
        <Text
          fontWeight={"semibold"}
          mt="4"
          mb={4}
          fontSize={"2xl"}
          w={"full"}
          textAlign={"center"}
        >
          {user?.login}
        </Text>
        <Text fontSize={"md"} mb={2}>
          <strong>Seniority:</strong> {user?.seniority} {user?.technology}{" "}
          Developer
        </Text>
        <Text fontSize={"md"} mb={2}>
          <strong>E-mail:</strong> {user?.email}
        </Text>
        <Box border={4} mb={2} borderColor={"red.500"}>
          <Text fontSize={"md"}>
            <strong>About Me:</strong> {user?.aboutMe}
          </Text>
        </Box>
        <Flex alignItems={"center"}>
          <Text fontWeight={"semibold"} fontSize={"md"}>
            Exp:
          </Text>
          <ProgressBar
            exp={exp}
            nextLvlExp={nextLevelExp}
            value={progressValue}
          />
        </Flex>

        <Text
          fontSize={"md"}
          w={"full"}
          mt={8}
          textAlign={"center"}
          justifySelf={"center"}
        >
          <strong>
            You need {nextLevelExp && exp && nextLevelExp - exp} exp to becme:{" "}
            <Text as={"span"} color={"green.400"}>
              {nextLevel}!
            </Text>
          </strong>
        </Text>
      </Flex>
    </Flex>
  );
};

export default UserCard;
