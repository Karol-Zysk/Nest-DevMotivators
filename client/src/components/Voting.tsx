import styled from "styled-components";
import { useState } from "react";
import { Flex, Icon, useToast } from "@chakra-ui/react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { Motivator } from "../interfaces/Motivator.interface";
import { ApiClient } from "../utils/ApiClient";

const StyledFlex = styled(Flex)<{ active: boolean }>`
  transition: all 0.3s;
  opacity: ${({ active }) => (active ? 1 : 0.9)};
  transform: scale(${({ active }) => (active ? 1 : 0.95)});
  &:hover {
    opacity: 1;
    transform: scale(1);
  }
`;

const Voting: React.FC<{ motivator: Motivator }> = ({ motivator }) => {
  const toast = useToast();
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const vote = async (
    id: string,
    action: string,
    setActionState: (state: boolean) => boolean,
    oppositeActionState: boolean
  ) => {
    if (oppositeActionState) return;
    try {
      const apiClient = new ApiClient();
      await apiClient.put(`/motivators/${id}/${action}`);
      setActionState((prevState: boolean) => !prevState);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex>
      <StyledFlex
        align="center"
        fontSize="1.125rem"
        fontWeight="700"
        color="white"
        mr="2"
        active={hasLiked}
        onClick={() =>
          vote(
            motivator._id,
            hasLiked ? "undolike" : "dolike",
            setHasLiked,
            hasDisliked
          )
        }
      >
        <Icon as={FaRegThumbsUp} fontSize="2rem" color="#3182ce" mr="0.5rem" />
        {motivator.like.length}
      </StyledFlex>
      <StyledFlex
        align="center"
        fontSize="1.125rem"
        fontWeight="700"
        color="white"
        active={hasDisliked}
        onClick={() =>
          vote(
            motivator._id,
            hasDisliked ? "undounlike" : "dounlike",
            setHasDisliked,
            hasLiked
          )
        }
      >
        <Icon
          as={FaRegThumbsDown}
          fontSize="2rem"
          color="#e53e3e"
          mr="0.5rem"
        />
        {motivator.dislike.length}
      </StyledFlex>
    </Flex>
  );
};

export default Voting;
