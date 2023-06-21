import { Box, Flex, Text } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../../context/AccountContext";
import UserCard from "../../components/UserCard";
import Stats from "../../components/Stats";
import { Motivator } from "../../interfaces/Motivator.interface";
import { ApiClient } from "../../utils/ApiClient";
import DevMotivator from "../../components/DevMotivator";

export interface MotivatorsStats {
  votingStats: {
    likeCount: number;
    dislikeCount: number;
    exp: number;
    nextLevelExp: number;
    nextLevel: string;
  };
}

function DevProfile() {
  const { user } = useContext(AccountContext);
  const [userMotivators, setUserMotivators] = useState<
    | {
        motivators: Motivator[];
        stats: MotivatorsStats;
      }
    | undefined
  >(undefined);
  const apiClient = new ApiClient();
  const motivatorsInfo = async () => {
    try {
      const res = await apiClient.get<{
        motivators: Motivator[];
        stats: MotivatorsStats;
      }>(`user/me/motivators`);
      setUserMotivators(res);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    motivatorsInfo();
  }, []);

  return (
    <Flex py="12" px="12" justify="space-around">
      <Flex direction="column" alignItems={"center"} w="35%">
        <UserCard user={user} votingStats={userMotivators?.stats.votingStats} />
        <Stats
          votingStats={userMotivators?.stats.votingStats}
          motivatorsNumber={userMotivators?.motivators.length}
        />
      </Flex>
      <Flex
        py="8"
        justify={"center"}
        align={"center"}
        direction="column"
        w="45%"
      >
        <Text mb={"4"} fontSize={"2xl"} fontWeight={"semibold"}>
          {user?.login} Dev_Motivators
        </Text>
        <Box w={"90%"}>
          {userMotivators && userMotivators?.motivators.length !== 0 ? (
            userMotivators?.motivators.map((motivator: Motivator) => (
              <DevMotivator motivator={motivator} key={motivator._id} />
            ))
          ) : (
            <Text fontSize={"lg"}>Here is place for your Motivators</Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export default DevProfile;
