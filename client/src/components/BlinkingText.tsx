import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

interface BlinkingTextProps {
  color: string;
}

const BlinkingText: React.FC<BlinkingTextProps> = ({ color }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible((prevVisible) => !prevVisible);
    }, 1150);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box
      w="100%"
      p={"2"}
      fontSize={["sm", "lg", "lg", "xl"]}
      fontWeight="medium"
      color={color}
    >
      {"C:\\Dev_Motivators>"}
      {isVisible && "_"}
    </Box>
  );
};

export default BlinkingText;
