import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { Motivator } from "../../interfaces/Motivator.interface";
import Voting from "../../components/Voting";
import { ApiClient } from "../../utils/ApiClient";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import MotivatorImage from "../../components/MotivatorImage";

interface ApiResponse {
  motivators: Motivator[];
  count: number;
}

const Main = () => {
  const [motivators, setMotivators] = useState<Motivator[] | undefined>(
    undefined
  );
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const limit = 3;
  const apiClient = new ApiClient();

  useEffect(() => {
    const getMotivators = async () => {
      const res: ApiResponse = await apiClient.get(
        `/motivators/place/staging?page=${page + 1}&limit=${limit}`
      );

      setMotivators(res.motivators);
      setPageCount(Math.ceil(res.count / limit));
    };

    getMotivators();
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [motivators]);

  if (!motivators) {
    return <Loading />;
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
          <MotivatorImage src={motivator.image} alt={motivator.image} />
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
            as="h3"
            mt="1rem"
            fontSize="3xl"
            fontWeight="700"
            color="white"
          ></Heading>
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
      <Pagination pageCount={pageCount} setPage={setPage} />
    </Box>
  );
};

export default Main;
