import { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
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

  const navigate = useNavigate();
  const toast = useToast();
  const apiClient = new ApiClient();

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
    <Box
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
            onChange={(event) => setKeyWords(event.target.value.split(","))}
          />
        </FormControl>
        <FormControl id="photo">
          <FormLabel color="gray.300">Image:</FormLabel>
          <Input
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
  );
};

export default PullRequest;
