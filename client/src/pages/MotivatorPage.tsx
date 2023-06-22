import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Motivator, Comment } from "../interfaces/Motivator.interface";
import { ApiClient } from "../utils/ApiClient";
import Loading from "../components/Loading";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import DevMotivator from "../components/DevMotivator";

const MotivatorPage = () => {
  const { id } = useParams();
  const [motivator, setMotivator] = useState<Motivator | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const toast = useToast();

  const apiClient = new ApiClient();

  useEffect(() => {
    const getMotivator = async () => {
      const res: Motivator = await apiClient.get(`/motivators/${id}`);
      setMotivator(res);
    };

    const fetchComments = async () => {
      const res: Comment[] = await apiClient.get(`/comments/${id}`);
      setComments(res);
    };

    getMotivator();
    fetchComments();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [motivator]);

  const handleCommentSubmit = async () => {
    if (comment) {
      const newComment = await apiClient.post<Comment>(`/comments/${id}`, {
        comment,
      });

      setComments([...comments, newComment]);
      setComment("");

      toast({
        title: "Comment added",
        description: "Your comment was successfully added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a comment",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!motivator) {
    return <Loading />;
  }

  return (
    <Box w="40%" p="1rem" m="2rem auto">
      <DevMotivator motivator={motivator} />
      <VStack align="start" spacing={4} mt={6}>
        {comments.length > 0 ? (
          comments.map((comment, i) => (
            <Box key={i} display="flex" alignItems="start" mt={3}>
              <Avatar name={comment.user.login} mr={3} />
              <Box>
                <Text fontWeight="bold">{comment.user.login}</Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Text>
                <Text mt={2}>{comment.comment}</Text>
              </Box>
            </Box>
          ))
        ) : (
          <Text>No comments yet.</Text>
        )}
      </VStack>
      <Flex>
        <Textarea
          minHeight="5rem"
          m="4"
          placeholder="Add a comment"
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
