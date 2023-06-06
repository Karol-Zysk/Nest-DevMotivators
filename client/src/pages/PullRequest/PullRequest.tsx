import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ApiClient } from "../../utils/ApiClient";
import { uploadToCloudinary } from "../../utils/CloudinaryUpload";
import { useNavigate } from "react-router";
import MotivatorPreview from "../../components/MotivatorPreview";

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
      <Flex p="6" h="full" w="full">
        <Flex w="50%" justify="center" align="center" mt="6">
          <Box
            w="50%"
            as="form"
            p={4}
            borderRadius="lg"
            onSubmit={handleSubmit}
          >
            <VStack spacing={4}>
              <FormControl id="title">
                <FormLabel>Title:</FormLabel>
                <Input
                  type="text"
                  placeholder="Title"
                  required={true}
                  value={title}
                  onChange={(event) => setTitle(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl id="subTitle">
                <FormLabel>Description:</FormLabel>
                <Input
                  type="text"
                  placeholder="Subitle"
                  value={subTitle}
                  required={true}
                  onChange={(event) => setSubTitle(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl id="keyWords">
                <FormLabel>Key words (separated by commas):</FormLabel>
                <Input
                  type="text"
                  placeholder="[JavaScript, Java, Python, Linux]"
                  required={true}
                  value={keyWords.join(",")}
                  onChange={(event) =>
                    setKeyWords(event.target.value.split(","))
                  }
                />
              </FormControl>
              <FormControl
                justifyContent="space-between"
                border="0px"
                id="photo"
              >
                <FormLabel border="0px">Image:</FormLabel>
                <Input
                  display="flex"
                  justifyContent="space-between"
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
        <MotivatorPreview
          previewUrl={previewUrl}
          title={title}
          subTitle={subTitle}
        />
      </Flex>
    </Flex>
  );
};

export default PullRequest;
