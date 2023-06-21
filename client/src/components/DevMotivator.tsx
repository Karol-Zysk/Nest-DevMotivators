import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Voting from "./Voting";
import { Motivator } from "../interfaces/Motivator.interface";
import MotivatorImage from "./MotivatorImage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

interface DevMotivatorInterface {
  motivator: Motivator;
}

const DevMotivator: React.FC<DevMotivatorInterface> = ({ motivator }) => {
  const navigate = useNavigate();
  // const color = useColorModeValue("white", "black");
  const bg = useColorModeValue("white", "black");
  return (
    <Flex
      w="100%"
      minH="30vh"
      justify="center"
      align="ceenter"
      direction="column"
      p="1.5rem"
      mb="2rem"
      borderRadius="md"
      borderRight={"4px"}
      borderBottom={"4px"}
      bg={bg}
      // boxShadow={`4px 4px 8px ${color}`}
    >
      <Flex justify="space-between" minH="full" w="full" py="4" mb="4">
        <Box>
          <Text fontSize="1.1rem" fontWeight="600">
            Commited by:{" "}
            <span onClick={() => navigate(`/user/${motivator.author}`)}>
              {motivator.authorName}
            </span>
          </Text>
          {motivator.safeIn && (
            <Text fontSize="1rem" fontWeight="600">
              Safe In: {motivator?.safeIn}
            </Text>
          )}
        </Box>
        <Voting motivator={motivator} />
      </Flex>
      <Link to={`/motivator/${motivator.id}`}>
        <MotivatorImage
          src={motivator.image}
          alt="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
        />
      </Link>
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
  );
};
export default DevMotivator;
