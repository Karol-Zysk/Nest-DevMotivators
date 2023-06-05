import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Flex,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ApiClient } from "../utils/ApiClient";
import { uploadToCloudinary } from "../utils/CloudinaryUpload";
import { useNavigate } from "react-router";

const PullRequest: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [keyWords, setKeyWords] = useState<string[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const navigate = useNavigate();
  const toast = useToast();
  const apiClient = new ApiClient();

  useEffect(() => {
    if (!photo) {
      setPreviewUrl(null);
    } else {
      const objectUrl = URL.createObjectURL(photo);
      setPreviewUrl(objectUrl);

      // Porządek po odmontowaniu komponentu
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [photo]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const imageUrl = photo ? await uploadToCloudinary(photo) : "";

      const motivatorData = {
        keyWords,
        image: imageUrl,
        title,
        subTitle,
      };

      const res = await apiClient.post("motivators", motivatorData);

      if (res) {
        navigate("/");
        toast({
          title: "Success",
          description: "Motivaror Successfully Created",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" align="center" justify="center">
      <Box py="6">
        <Heading>Create Motivator</Heading>
      </Box>
      <Flex p="6">
        <Flex>
          <Flex w="100%" justify="center" align="center" mt="6">
            <Box
              w="50%"
              as="form"
              p={4}
              bgColor="gray.800"
              borderRadius="lg"
              onSubmit={handleSubmit}
            >
              <VStack spacing={4}>
                <FormControl id="title">
                  <FormLabel color="gray.300">Title:</FormLabel>
                  <Input
                    type="text"
                    required={true}
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl id="subTitle">
                  <FormLabel color="gray.300">Description:</FormLabel>
                  <Input
                    type="text"
                    value={subTitle}
                    required={true}
                    onChange={(event) => setSubTitle(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl id="keyWords">
                  <FormLabel color="gray.300">
                    Key words (separated by commas):
                  </FormLabel>
                  <Input
                    type="text"
                    required={true}
                    value={keyWords.join(",")}
                    onChange={(event) =>
                      setKeyWords(event.target.value.split(","))
                    }
                  />
                </FormControl>
                <FormControl border="0px" id="photo">
                  <FormLabel border="0px" color="gray.300">
                    Image:
                  </FormLabel>
                  <Input
                    border="none"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setPhoto(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">
                  Create Motivator
                </Button>
              </VStack>
            </Box>
          </Flex>
          <Flex justify="center" align="center">
            <Box
              w="70%"
              p="1rem"
              mb="2rem"
              bgColor="#1a202c"
              border="2px solid white"
              borderRadius="md"
              boxShadow="lg"
            >
              <Flex justify="between" w="full" mb="4">
                <Text fontSize="1.25rem" fontWeight="600" color="white">
                  Commited by: {"Elo"}
                </Text>
                {/* <Voting motivator={motivator} /> */}
              </Flex>
              <Flex justify="center" w="full" mb="2">
                <Image
                  src={
                    previewUrl
                      ? previewUrl
                      : "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  }
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
                {title}
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
                {subTitle}
              </Heading>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PullRequest;
