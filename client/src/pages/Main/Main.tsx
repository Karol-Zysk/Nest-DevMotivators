import { useEffect, useState, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { Motivator } from "../../interfaces/Motivator.interface";
import { ApiClient } from "../../utils/ApiClient";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import DevMotivator from "../../components/DevMotivator";

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
  const apiClient = useMemo(() => new ApiClient(), []);

  useEffect(() => {
    const getMotivators = async () => {
      const res: ApiResponse = await apiClient.get(
        `/motivators/place/main?page=${page + 1}&limit=${limit}`
      );

      setMotivators(res.motivators);
      setPageCount(Math.ceil(res.count / limit));
    };

    getMotivators();
  }, [page, motivators, apiClient]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  if (!motivators) {
    return <Loading />;
  }

  return (
    <Box maxW="40%" p="1rem" m="2rem auto">
      {motivators.map((motivator: Motivator) => (
        <DevMotivator motivator={motivator} key={motivator._id} />
      ))}

      <Pagination pageCount={pageCount} setPage={setPage} />
    </Box>
  );
};

export default Main;
