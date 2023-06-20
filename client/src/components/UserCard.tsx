import { Text, Avatar, useColorModeValue, Flex } from "@chakra-ui/react";
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
        <Text mt="4" mb={4} fontSize={"2xl"} w={"full"} textAlign={"center"}>
          {user?.login}
        </Text>
        <Text fontSize={"xl"} mb={2}>
          Seniority: {user?.seniority} {user?.technology} Developer
        </Text>
        <Text fontSize={"xl"} mb={2}>
          E-mail: {user?.email}
        </Text>
        <Text fontSize={"lg"} py={8} border={2}>
          <strong>About Me:</strong> {user?.aboutMe}
        </Text>
        <Flex alignItems={"center"}>
          <Text fontSize={"lg"}>Exp:</Text>
          <ProgressBar
            exp={userMotivators?.stats.votingStats.exp}
            nextLvlExp={userMotivators?.stats.votingStats.nextLevelExp}
            value={progressValue}
          />
        </Flex>

        <Text
          fontSize={"lg"}
          w={"full"}
          mt={4}
          textAlign={"center"}
          justifySelf={"center"}
        >
          You need{" "}
          {userMotivators &&
            userMotivators?.stats.votingStats.nextLevelExp -
              userMotivators?.stats.votingStats.exp}{" "}
          exp to becme:{" "}
          <strong>{userMotivators?.stats.votingStats.nextLevel}</strong>
        </Text>
      </Flex>
    </Flex>
  );
};

export default UserCard;
