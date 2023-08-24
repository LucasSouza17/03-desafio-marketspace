import { api } from "@services/api";
import { Box, HStack, Image, Text, VStack, View } from "native-base";
import { useState } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

type Props = {
  images: string[]
}

export function SliderImage({images}: Props) {
  const width = Dimensions.get("window").width;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const formatImages = images.map(item => {
    return `${api.defaults.baseURL}/images/${item}`
  })

  return (
    <VStack position="relative" width={width} height={width / 1.5}>
      <Carousel
        width={width}
        height={width / 1.5}
        loop={false}
        pagingEnabled
        snapEnabled
        onProgressChange={(_, absoluteProgress) =>
          setSelectedIndex(Math.round(absoluteProgress))
        }
        data={formatImages}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item }}
            w={width}
            h={width / 1.5}
            alt={item}
            resizeMode="cover"
          />
        )}
      />
      {images.length > 1 && (
        <HStack space="2" px="1" mt="-2">
          {images.map((item, index) => (
            <Box
              key={item}
              flex={1}
              h="1"
              bg="gray.100"
              opacity={selectedIndex === index ? 0.8 : 0.4}
              rounded="full"
            />
          ))}
        </HStack>
      )}
    </VStack>
  );
}
