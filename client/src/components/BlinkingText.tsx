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
    }, 750); // Interwał migania (w milisekundach)

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box
      w="30%"
      fontSize={["2xl", "3xl", "2xl"]}
      fontWeight="medium"
      color={color}
    >
      {"C:\\Dev_Motivators"}
      {isVisible && "_"}
    </Box>
  );
};

export default BlinkingText;
