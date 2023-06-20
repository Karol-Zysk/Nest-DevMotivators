import { Box, Flex } from "@chakra-ui/react";
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
      <Flex direction="column" alignItems={"center"} w="30%">
        <UserCard user={user} userMotivators={userMotivators} />
        <Stats user={user} userMotivators={userMotivators} />
      </Flex>
      <Flex py="8" direction="column" w="40%">
        <Box>
          {userMotivators?.motivators.map((motivator: Motivator) => (
            <DevMotivator motivator={motivator} key={motivator._id} />
          ))}
        </Box>
      </Flex>
    </Flex>
  );
}

export default DevProfile;
