import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, Image, Button } from "@chakra-ui/react";
import { Motivator } from "../../interfaces/Motivator.interface";
import Voting from "../../components/Voting";
import { ApiClient } from "../../utils/ApiClient";

const Main = () => {
  const [motivators, setMotivators] = useState([]);
  const [page, setPage] = useState(0);
  const resultsPerPage = 3;

  const apiClient = new ApiClient();

  const getMotivators = async () => {
    const res = await apiClient.get(
      `/motivators/place/staging?limit=${resultsPerPage}&page=${
        page * resultsPerPage
      }`
    );

    setMotivators((oldMotivators) => [...oldMotivators, ...res]);
  };

  useEffect(() => {
    getMotivators();
  }, [page]);

  if (!motivators.length) {
    return <h1 className="text-3xl font-bold text-center">Loading...</h1>;
  }

  return (
    <Box maxW="40%" p="1rem" m="2rem auto">
      {motivators.map((motivator: Motivator) => (
        <Box
          key={motivator.id}
          p="1rem"
          mb="2rem"
          bgColor="#1a202c"
          border="2px solid white"
          borderRadius="md"
          boxShadow="lg"
        >
          <Flex justify="between" w="full" mb="4">
            <Text fontSize="1.25rem" fontWeight="600" color="white">
              Commited by: {motivator.authorName}
            </Text>
            <Voting motivator={motivator} />
          </Flex>
          <Flex justify="center" w="full" mb="2">
            <Image
              src={motivator.image}
              alt="image"
              boxSize="-moz-max-content"
              objectFit="contain"
            />
          </Flex>
          <Heading
            as="h3"
            mt="1rem"
            fontSize="3xl"
            fontWeight="700"
            color="white"
          >
            {motivator.title}
          </Heading>
          <Heading
            as="h4"
            mt="0.5rem"
            fontSize="xl"
            fontWeight="500"
            color="white"
          >
            {motivator.subTitle}
          </Heading>
        </Box>
      ))}
      <Button onClick={() => setPage((prevPage) => prevPage + 1)}>
        Load more
      </Button>
    </Box>
  );
};

export default Main;
