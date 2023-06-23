import { Flex, Text, useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { ApiClient } from "../utils/ApiClient";

interface MotivatorInfo {
  motivatorsNumber: number;
  usersNumber: number;
  motivatorsToday: number;
}

const MainInfo = () => {
  const [info, setInfo] = useState<MotivatorInfo | undefined>(undefined);
  const apiClient = useMemo(() => new ApiClient(), []);

  const toast = useToast();
  useEffect(() => {
    const getMotivators = async () => {
      try {
        const res = await apiClient.get<MotivatorInfo>(`/motivators/info`);

        setInfo(res);
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Something Went Wrong`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    getMotivators();
  }, []);

  return (
    <Flex
      p="4"
      direction={"column"}
      w="auto"
      h="auto"
      position={"absolute"}
      right={"0"}
    >
      <Text>Active Users: {info?.usersNumber}</Text>
      <Text>Total Motivators Number: {info?.motivatorsNumber}</Text>
      <Text>Motivators Created Today: {info?.motivatorsToday}</Text>
    </Flex>
  );
};
export default MainInfo;
