import styled from "styled-components";
import { useContext, useState } from "react";
import { Flex, Icon, useToast } from "@chakra-ui/react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { Motivator } from "../interfaces/Motivator.interface";
import { ApiClient } from "../utils/ApiClient";
import { AxiosError, AxiosResponse } from "axios";
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
  const [resp, setResp] = useState<Motivator | undefined>(undefined);

  const vote = async (id: string, action: string) => {
    const apiClient = new ApiClient();

    try {
      console.log(action);

      const res = await apiClient.patch(`/motivators/${id}/${action}`);
      // console.log(res);
      setResp(res);
      console.log(resp);

      setLastError403(!lastError403); // reset lastError403 status after executing the action
    } catch (error: any) {
      console.log(error);

      toast({
        title: "Error",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      if (error.response && error.response.status === 403) {
        setLastError403(true);
      }
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
          user && vote(motivator._id, lastError403 ? "dolike" : "undolike")
        }
      >
        <Icon as={FaRegThumbsUp} fontSize="2rem" color="#3182ce" mr="0.5rem" />
        {resp?.like.length || motivator.like.length}
      </StyledFlex>
      <StyledFlex
        align="center"
        fontSize="1.125rem"
        fontWeight="700"
        color="white"
        active={true}
        onClick={() =>
          user && vote(motivator._id, lastError403 ? "undounlike" : "dounlike")
        }
      >
        <Icon
          as={FaRegThumbsDown}
          fontSize="2rem"
          color="#e53e3e"
          mr="0.5rem"
        />
        {resp?.dislike.length || motivator.dislike.length}
      </StyledFlex>
    </Flex>
  );
};

export default Voting;
