import { Flex } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../../context/AccountContext";
import UserCard from "../../components/UserCard";
import Stats from "../../components/Stats";
import { Motivator } from "../../interfaces/Motivator.interface";
import { ApiClient } from "../../utils/ApiClient";

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
  console.log(userMotivators);

  return (
    <Flex py="6" px="6" justify="space-around">
      <Flex direction="column" w="35%">
        <UserCard user={user} userMotivators={userMotivators} />
        <Stats user={user} userMotivators={userMotivators} />
      </Flex>
      <Flex direction="column">
        {/* <UserCard user={user} />
        <UserCard user={user} /> */}
      </Flex>
    </Flex>
  );
}

export default DevProfile;
