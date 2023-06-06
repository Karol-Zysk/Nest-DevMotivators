import { Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { StyledFlex } from "./StyledFlex";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { AccountContext } from "../context/AccountContext";

import { useContext } from "react";

interface MotivatorPreviewProps {
  title: string;
  subTitle: string;
  previewUrl: string | null;
}

const MotivatorPreview: React.FC<MotivatorPreviewProps> = ({
  title,
  subTitle,
  previewUrl,
}) => {
  const { user } = useContext(AccountContext);
  return (
    <Flex w="35%" h="30%" minH="30%" justify="center" p="4" align="center">
      <Flex
        direction="column"
        minH="100%"
        w="100%"
        p="1rem"
        mb="2rem"
        borderRadius="md"
        border="1px"
        boxShadow="md"
      >
        <Flex justify="space-between" minH="full" w="full" mb="4">
          <Text fontSize="1.25rem" fontWeight="600">
            Commited by: {user?.login}
          </Text>
          <Flex>
            <StyledFlex
              align="center"
              fontSize="1.125rem"
              fontWeight="700"
              mr="2"
            >
              <Icon
                as={FaRegThumbsUp}
                fontSize="2rem"
                cursor="pointer"
                color="#3182ce"
                mr="0.5rem"
              />
              8
            </StyledFlex>
            <StyledFlex align="center" fontSize="1.125rem" fontWeight="700">
              <Icon
                as={FaRegThumbsDown}
                fontSize="2rem"
                color="#e53e3e"
                cursor="pointer"
                mr="0.5rem"
              />
              3
            </StyledFlex>
          </Flex>
        </Flex>
        <Flex justify="center" w="full" minW="100%" minH="100%" mb="2">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="image"
              boxSize="-moz-max-content"
              objectFit="contain"
            />
          ) : (
            <Flex
              justify="center"
              borderRadius="md"
              border="1px"
              boxShadow="md"
              align="center"
              h="200px"
              w="full"
            >
              <Text>Image</Text>
            </Flex>
          )}
        </Flex>
        <Heading
          as="h3"
          mt="1rem"
          fontSize="3xl"
          fontWeight="700"
          w="100%"
          textAlign="center"
        >
          {title}
        </Heading>
        <Heading
          w="100%"
          textAlign="center"
          as="h3"
          mt="1rem"
          fontSize="3xl"
          fontWeight="700"
        ></Heading>
        <Heading
          as="h4"
          mt="0.5rem"
          fontSize="xl"
          fontWeight="500"
          w="100%"
          textAlign="center"
        >
          {subTitle}
        </Heading>
      </Flex>
    </Flex>
  );
};
export default MotivatorPreview;
