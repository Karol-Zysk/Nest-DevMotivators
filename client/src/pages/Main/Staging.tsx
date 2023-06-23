import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { Motivator } from "../../interfaces/Motivator.interface";
import { ApiClient } from "../../utils/ApiClient";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import DevMotivator from "../../components/DevMotivator";

interface ApiResponse {
  motivators: Motivator[];
  count: number;
}

const Staging = () => {
  const { page = "1" } = useParams<string>();
  const [motivators, setMotivators] = useState<Motivator[] | undefined>(
    undefined
  );
  const [pageCount, setPageCount] = useState(0);

  const limit = 3;
  const apiClient = useMemo(() => new ApiClient(), []);

  const toast = useToast();
  useEffect(() => {
    const getMotivators = async () => {
      try {
        const res: ApiResponse = await apiClient.get(
          `/motivators/place/staging?page=${parseInt(page)}&limit=${limit}`
        );

        setMotivators(res.motivators);
        setPageCount(Math.ceil(res.count / limit));
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
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (!motivators) {
    return <Loading />;
  }

  return (
    <Flex direction={"column"}>
      <Text
        fontWeight={"semibold"}
        mt={"8"}
        // color={"red.500"}
        fontSize={"lg"}
        textAlign={"center"}
      >
        Dev_motivators in staging area...{" "}
      </Text>
      <Text
        fontWeight={"semibold"}
        mt={"2"}
        // color={"red.500"}
        fontSize={"lg"}
        textAlign={"center"}
      >
        When a motivator receives 10 positive reviews, it gets moved to 'Main'
      </Text>
      <Box minW="45%" maxW="45%" p="1rem" m="2rem auto">
        {motivators.map((motivator: Motivator) => (
          <DevMotivator motivator={motivator} key={motivator._id} />
        ))}

        <Pagination pageCount={pageCount} route={"staging"} />
      </Box>
    </Flex>
  );
};

export default Staging;
