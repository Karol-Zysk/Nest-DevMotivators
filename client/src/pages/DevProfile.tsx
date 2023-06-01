import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import UserCard from "../components/UserCard";
import Stats from "../components/Stats";

function DevProfile() {
  const { user } = useContext(AccountContext);

  return (
    <Flex py="6" px="6" justify="space-around">
      <Flex direction="column" w="35%">
        <UserCard user={user} />
        <Stats user={user} />
      </Flex>
      <Flex direction="column">
        <UserCard user={user} />
        <UserCard user={user} />
      </Flex>
    </Flex>
  );
}

export default DevProfile;
