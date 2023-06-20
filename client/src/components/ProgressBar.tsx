import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const MotionBox = motion(Box);

export const ProgressBar = ({
  value,
  nextLvlExp,
  exp,
}: {
  value: number | undefined;
  exp: number | undefined;
  nextLvlExp: number | undefined;
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      width: `${value}%`,
      transition: { duration: 1, ease: "easeInOut" },
    });
  }, [controls, value]);

  return (
    <Box
      w="90%"
      ml="4"
      bg={useColorModeValue("gray.300", "gray.600")}
      h="20px"
      position={"relative"}
      borderRadius="md"
    >
      <MotionBox
        animate={controls}
        bg="gray.500"
        h="20px"
        borderRadius="md"
        style={{ position: "absolute" }}
      />
      <Box
        position={"absolute"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text>{`${exp || 0} / ${nextLvlExp || 100}`}</Text>
      </Box>
    </Box>
  );
};
