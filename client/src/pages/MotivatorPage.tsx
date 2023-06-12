import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Motivator } from "../interfaces/Motivator.interface";
import { ApiClient } from "../utils/ApiClient";
import Loading from "../components/Loading";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import DevMotivator from "../components/DevMotivator";

const MotivatorPage = () => {
  const { id } = useParams();
  const [motivator, setMotivator] = useState<Motivator | undefined>(undefined);
  const [comment, setComment] = useState<string>("");
  const toast = useToast();

  const apiClient = new ApiClient();

  useEffect(() => {
    const getMotivator = async () => {
      const res: Motivator = await apiClient.get(`/motivators/${id}`);

      setMotivator(res);
    };

    getMotivator();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [motivator]);

  const handleCommentSubmit = () => {
    toast({
      title: "Feature not implemented yet",
      description: "This feature will be implemented soon",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  if (!motivator) {
    return <Loading />;
  }

  const comments = [
    {
      username: "John Doe",
      date: "2023-06-10",
      avatar: "https://via.placeholder.com/150",
      comment: "This is a great motivator!",
    },
    {
      username: "Jane Smith",
      date: "2023-06-11",
      avatar: "https://via.placeholder.com/150",
      comment: "I really like this!",
    },
    {
      username: "Mark Johnson",
      date: "2023-06-12",
      avatar: "https://via.placeholder.com/150",
      comment: "Amazing!",
    },
  ];

  return (
    <Box maxW="45%" p="1rem" m="2rem auto">
      <DevMotivator motivator={motivator} />
      <VStack align="start" spacing={4} mt={6}>
        {comments.map((comment, i) => (
          <Box key={i} display="flex" alignItems="start" mt={3}>
            <Avatar src={comment.avatar} mr={3} />
            <Box>
              <Text fontWeight="bold">{comment.username}</Text>
              <Text fontSize="sm" color="gray.500">
                {comment.date}
              </Text>
              <Text mt={2}>{comment.comment}</Text>
            </Box>
          </Box>
        ))}
      </VStack>
      <Flex>
        <Textarea
          minHeight="5rem"
          m="4"
          placeholder="Example Text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button my="4" onClick={handleCommentSubmit}>
          Add Comment
        </Button>
      </Flex>
    </Box>
  );
};

export default MotivatorPage;
