import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
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

const Staging = () => {
  const { page = "1" } = useParams<string>();
  const [motivators, setMotivators] = useState<Motivator[] | undefined>(
    undefined
  );
  const [pageCount, setPageCount] = useState(0);

  const limit = 3;
  const apiClient = useMemo(() => new ApiClient(), []);

  useEffect(() => {
    const getMotivators = async () => {
      const res: ApiResponse = await apiClient.get(
        `/motivators/place/staging?page=${parseInt(page)}&limit=${limit}`
      );

      setMotivators(res.motivators);
      setPageCount(Math.ceil(res.count / limit));
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
    <Box minW="45%" maxW="45%" p="1rem" m="2rem auto">
      {motivators.map((motivator: Motivator) => (
        <DevMotivator motivator={motivator} key={motivator._id} />
      ))}

      <Pagination pageCount={pageCount} route={"staging"} />
    </Box>
  );
};

export default Staging;
