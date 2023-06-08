import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Motivator } from "../interfaces/Motivator.interface";
import { ApiClient } from "../utils/ApiClient";
import Loading from "../components/Loading";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Voting from "../components/Voting";
import MotivatorImage from "../components/MotivatorImage";

const MotivatorPage = () => {
  const { id } = useParams();
  const [motivator, setMotivator] = useState<Motivator | undefined>(undefined);

  const apiClient = new ApiClient();

  useEffect(() => {
    const getMotivator = async () => {
      const res: Motivator = await apiClient.get(`/motivators/${id}`);

      setMotivator(res);
    };

    getMotivator();
  }, []);
  console.log(motivator);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [motivator]);

  if (!motivator) {
    return <Loading />;
  }
  return (
    <Flex justify="center" h="min-content" p="12" align="center">
      <Flex
        justify="center"
        align="ceenter"
        key={motivator._id}
        direction="column"
        minH="100%"
        w="50%"
        p="1rem"
        mb="2rem"
        borderRadius="md"
        border="1px"
        //   bg={bg}
        //   boxShadow={`4px 4px 8px ${color}`}
      >
        <Flex justify="space-between" minH="full" w="full" py="4" mb="4">
          <Box>
            <Text fontSize="1.1rem" fontWeight="600">
              Commited by: {motivator.authorName}
            </Text>
            {motivator.safeIn && (
              <Text fontSize="1rem" fontWeight="600">
                Safe In: {motivator?.safeIn}
              </Text>
            )}
          </Box>
          <Voting motivator={motivator} />
        </Flex>
        <MotivatorImage src={motivator.image} alt={motivator.image} />
        <Heading
          as="h3"
          mt="1rem"
          fontSize="3xl"
          fontWeight="700"
          w="100%"
          textAlign="center"
        >
          {motivator.title}
        </Heading>

        <Heading
          as="h4"
          mt="0.5rem"
          fontSize="xl"
          fontWeight="500"
          w="100%"
          textAlign="center"
        >
          {motivator.subTitle}
        </Heading>
      </Flex>
    </Flex>
  );
};
export default MotivatorPage;
