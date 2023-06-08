import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Motivator } from "../../interfaces/Motivator.interface";
import Voting from "../../components/Voting";
import { ApiClient } from "../../utils/ApiClient";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import MotivatorImage from "../../components/MotivatorImage";
import { Link } from "react-router-dom";

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
  const color = useColorModeValue("white", "black");
  const bg = useColorModeValue("white", "black");

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
        <Link to={`/motivator/${motivator.id}`}>
          <Flex
            key={motivator._id}
            direction="column"
            minH="100%"
            w="100%"
            p="1rem"
            mb="2rem"
            borderRadius="md"
            border="1px"
            bg={bg}
            boxShadow={`4px 4px 8px ${color}`}
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
        </Link>
      ))}

      <Pagination pageCount={pageCount} setPage={setPage} />
    </Box>
  );
};

export default Main;
