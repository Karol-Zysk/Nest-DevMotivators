import styled from "styled-components";
import { useContext, useState } from "react";
import { Flex, Icon, useToast } from "@chakra-ui/react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { Motivator } from "../interfaces/Motivator.interface";
import { ApiClient } from "../utils/ApiClient";
import { AccountContext } from "../context/AccountContext";

const StyledFlex = styled(Flex)<{ active: boolean }>`
  transition: all 0.3s;
  opacity: ${({ active }) => (active ? 1 : 0.8)};
  transform: scale(${({ active }) => (active ? 1 : 0.8)});
  &:hover {
    opacity: 1;
    transform: scale(1);
  }
`;

const Voting: React.FC<{ motivator: Motivator }> = ({ motivator }) => {
  const { user } = useContext(AccountContext);
  const toast = useToast();

  const [lastError403, setLastError403] = useState(false);
  const [resp, setResp] = useState<Motivator>();

  const vote = async (id: string, action: string) => {
    const apiClient = new ApiClient();

    try {
      setLastError403(!lastError403);
      const res = await apiClient.patch<Motivator>(
        `/motivators/${id}/${action}`
      );
      console.log(res);

      setResp(res);
    } catch (error: any) {
      console.log(error.statu);

      if (error.response && error.response.status === 403) {
        setLastError403(false);
      }
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
        active={true}
        onClick={() =>
          user
            ? vote(motivator._id, !lastError403 ? "dolike" : "undolike")
            : toast({
                title: "Error",
                description: `Log in to vote`,
                status: "error",
                duration: 5000,
                isClosable: true,
              })
        }
      >
        <Icon
          as={FaRegThumbsUp}
          fontSize="2rem"
          cursor="pointer"
          color="#3182ce"
          mr="0.5rem"
        />
        {resp?.like.length || motivator.like.length}
      </StyledFlex>
      <StyledFlex
        align="center"
        fontSize="1.125rem"
        fontWeight="700"
        color="white"
        active={true}
        onClick={() =>
          user
            ? vote(motivator._id, !lastError403 ? "dounlike" : "undounlike")
            : toast({
                title: "Error",
                description: `Unauthorized, Log in first`,
                status: "error",
                duration: 5000,
                isClosable: true,
              })
        }
      >
        <Icon
          as={FaRegThumbsDown}
          fontSize="2rem"
          color="#e53e3e"
          cursor="pointer"
          mr="0.5rem"
        />
        {resp?.dislike.length || motivator.dislike.length}
      </StyledFlex>
    </Flex>
  );
};

export default Voting;
