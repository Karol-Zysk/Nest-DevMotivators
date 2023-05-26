import { useState } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ApiClient } from "../utils/ApiClient";

const PullRequest: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [keyWords, setKeyWords] = useState<string[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const toast = useToast();
  const apiClient = new ApiClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { signature, timestamp } = await apiClient.getCloudinarySignature();

      const formData = new FormData();
      if (image) {
        formData.append("file", image);
      }
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", `${import.meta.env.VITE_CLOUDINARY_API_KEY}`);
      console.log(import.meta.env.VITE_CLOUDINARY_API_KEY);

      console.log(formData);
      const data = await apiClient.postCloudinaryUpload(formData);

      setImage(data.secure_url);

      const motivatorData = {
        keyWords,
        image: data.secure_url,
        title,
        subTitle,
      };
      console.log(motivatorData);

      const res = await apiClient.post("motivators", motivatorData);
      console.log(res);

      toast({
        title: "Motivator created",
        description: "Your motivator has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      console.log(error);

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
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl id="subTitle">
          <FormLabel color="gray.300">Description:</FormLabel>
          <Input
            type="text"
            value={subTitle}
            onChange={(event) => setSubTitle(event.currentTarget.value)}
          />
        </FormControl>
        <FormControl id="keyWords">
          <FormLabel color="gray.300">
            Key words (separated by commas):
          </FormLabel>
          <Input
            type="text"
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
