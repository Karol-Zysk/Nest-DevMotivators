import React, { useState } from "react";
import { Flex, Image, Spinner } from "@chakra-ui/react";

interface ImageWithLoadingProps {
  src: string;
  alt: string;
}

const MotivatorImage: React.FC<ImageWithLoadingProps> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Flex
      justify="center"
      w="full"
      minW="full"
      minH="150px"
      p="1"
      boxShadow="1px 1px 3px gray"
      mb="2"
      position="relative"
    >
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          position="absolute"
        />
      )}
      <Image
        onLoad={handleImageLoad}
        loading="lazy"
        src={src}
        alt={alt}
        boxSize="-moz-max-content"
        objectFit="contain"
      />
    </Flex>
  );
};

export default MotivatorImage;
