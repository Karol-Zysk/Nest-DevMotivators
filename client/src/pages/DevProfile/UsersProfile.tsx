import { Box, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { UserData } from "../../context/AccountContext";
import UserCard from "../../components/UserCard";
import Stats from "../../components/Stats";
import { Motivator } from "../../interfaces/Motivator.interface";
import { ApiClient } from "../../utils/ApiClient";
import DevMotivator from "../../components/DevMotivator";
import { useParams } from "react-router-dom";

export interface MotivatorsStats {
  votingStats: {
    likeCount: number;
    dislikeCount: number;
    exp: number;
    nextLevelExp: number;
    nextLevel: string;
  };
}

function UsersProfile() {
  const { id } = useParams();
  const [user, setUser] = useState<UserData | undefined>(undefined);
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
      }>(`user/${id}/motivators`);
      setUserMotivators(res);
    } catch (error) {
      console.error(error);
    }
  };
  const userInfo = async () => {
    try {
      const res = await apiClient.get<UserData>(`user/${id}`);
      setUser(res);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    motivatorsInfo();
    userInfo();
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

export default UsersProfile;
