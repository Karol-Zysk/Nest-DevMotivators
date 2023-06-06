import { Flex } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../../context/AccountContext";
import UserCard from "../../components/UserCard";
import Stats from "../../components/Stats";
import { Motivator } from "../../interfaces/Motivator.interface";
import { ApiClient } from "../../utils/ApiClient";

function DevProfile() {
  const { user } = useContext(AccountContext);
  const [userMotivators, setUserMotivators] = useState<Motivator[] | undefined>(
    undefined
  );
  const apiClient = new ApiClient();
  const motivatorsInfo = async () => {
    try {
      const res = await apiClient.get<Motivator[]>(`user/me/motivators`);
      setUserMotivators(res);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    motivatorsInfo();
  }, []);

  return (
    <Flex py="6" px="6" justify="space-around">
      <Flex direction="column" w="35%">
        <UserCard user={user} />
        <Stats user={user} motivatorsNumber={userMotivators?.length} />
      </Flex>
      <Flex direction="column">
        <UserCard user={user} />
        <UserCard user={user} />
      </Flex>
    </Flex>
  );
}

export default DevProfile;
