import { Flex } from "@chakra-ui/react";
import styled from "styled-components";

export const StyledFlex = styled(Flex)<{ $active: boolean }>`
  transition: all 0.3s;
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};
  transform: scale(${({ $active }) => ($active ? 1 : 0.8)});
  &:hover {
    opacity: 1;
    transform: scale(1);
  }
`;
