import React, { useState } from "react";
import { Flex, Image, Spinner } from "@chakra-ui/react";

interface ImageWithLoadingProps {
  src: string;
  alt: string;
}

const MotivatorImage: React.FC<ImageWithLoadingProps> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setLoadError(true);
    setIsLoading(false);
  };

  return (
    <Flex
      justify="center"
      w="full"
      minW="full"
      minH="150px"
      p="1"
      mb="2"
      position="relative"
    >
      {isLoading && !loadError && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          position="absolute"
        />
      )}
      {loadError ? (
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
          alt={alt}
          border="4px"
          minW="full"
          boxSize="-moz-max-content"
          objectFit="cover"
        />
      ) : (
        <Image
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          src={src}
          alt={alt}
          border="4px"
          minW="full"
          boxSize="-moz-max-content"
          objectFit="cover"
        />
      )}
    </Flex>
  );
};

export default MotivatorImage;
