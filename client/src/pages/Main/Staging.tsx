import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, Image, Icon } from "@chakra-ui/react";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import axios from "axios";
import { Motivator } from "../../interfaces/Motivator.interface";
import Voting from "../../components/Voting";

const Staging = () => {
  const [motivators, setMotivators] = useState([]);

  useEffect(() => {
    const getMotivators = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/api/v1/motivators/place/staging"
      );

      setMotivators(res.data);
    };

    getMotivators();
  }, []);

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
              {motivator.authorName}
            </Text>
            <Voting motivator={motivator} />
          </Flex>
          <Flex justify="center" w="full" mb="2">
            <Image
              src={motivator.image}
              alt="image"
              boxSize="full"
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
    </Box>
  );
};

export default Staging;
