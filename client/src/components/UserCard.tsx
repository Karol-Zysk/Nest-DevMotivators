import { Text, Avatar, useColorModeValue, Flex, Box } from "@chakra-ui/react";
import { UserData } from "../context/AccountContext";
import { Motivator } from "../interfaces/Motivator.interface";
import { MotivatorsStats } from "../pages/DevProfile/DevProfile";
import { ProgressBar } from "./ProgressBar";

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
  const progressValue = userMotivators
    ? (userMotivators?.stats.votingStats.exp /
        userMotivators?.stats.votingStats.nextLevelExp) *
      100
    : 100;

  return (
    <Flex py={2} mb={"4"} w={"full"}>
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
            exp={userMotivators && userMotivators?.stats.votingStats.exp}
            nextLvlExp={
              userMotivators && userMotivators?.stats.votingStats.nextLevelExp
            }
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
            You need{" "}
            {userMotivators &&
              userMotivators?.stats.votingStats.nextLevelExp -
                userMotivators?.stats.votingStats.exp}{" "}
            exp to becme:{" "}
            <span style={{ color: "green" }}>
              {userMotivators?.stats.votingStats.nextLevel}!
            </span>
          </strong>
        </Text>
      </Flex>
    </Flex>
  );
};

export default UserCard;
