import { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

const Loading = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (dots.length >= 5) {
      setDots("");
    } else {
      const timer = setTimeout(() => {
        setDots((prevDots) => prevDots + ".");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [dots]);
  return (
    <Flex h="container.sm" justify="center" align="center">
      <Text size="lg" w="120px">
        Loading{dots}
      </Text>
    </Flex>
  );
};
export default Loading;
