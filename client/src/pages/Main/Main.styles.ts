import styled from "styled-components";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

export const Container = styled.div`
  width: 40%;
  padding: 1rem;
  margin: 2rem auto;
`;

export const Card = styled.div`
  padding: 1rem;
  margin-bottom: 2rem;
  background: #1a202c;
  border: 2px solid white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const Author = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
`;

export const Thumb = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
`;

export const ThumbIconUp = styled(FaRegThumbsUp)`
  margin-right: 0.5rem;
  font-size: 2rem;
  color: #3182ce;
`;

export const ThumbIconDown = styled(FaRegThumbsDown)`
  margin-right: 0.5rem;
  font-size: 2rem;
  color: #e53e3e;
`;

export const Title = styled.h3`
  margin-top: 1rem;
  font-size: 3rem;
  font-weight: 700;
  color: white;
`;

export const SubTitle = styled.h4`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
`;
