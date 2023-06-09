import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Motivator } from "../interfaces/Motivator.interface";
import { ApiClient } from "../utils/ApiClient";
import Loading from "../components/Loading";
import { Box } from "@chakra-ui/react";
import DevMotivator from "../components/DevMotivator";

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
  }, [motivator]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [motivator]);

  if (!motivator) {
    return <Loading />;
  }
  return (
    <Box maxW="45%" p="1rem" m="2rem auto">
      <DevMotivator motivator={motivator} />
    </Box>
  );
};
export default MotivatorPage;
