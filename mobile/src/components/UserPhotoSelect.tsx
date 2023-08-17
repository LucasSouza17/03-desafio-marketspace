import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Center, FormControl, Image, Skeleton, Text, useToast } from "native-base";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { PencilSimpleLine, User } from "phosphor-react-native";

export type ResponseImage = {
  fileExtension: string;
  uri: string;
  type: string
};

type Props = {
  onChange: (value: ResponseImage) => void;
  value?: string;
  errorMessage?: string;
};

const PHOTO_SIZE = 20;

export function UserPhotoSelect({ value, onChange, errorMessage }: Props) {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const toast = useToast();
  const invalid = !!errorMessage;

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 8) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 8MB.",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop() ?? "";

        const objectReturn: ResponseImage = {
          fileExtension,
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        };

        onChange(objectReturn);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleUserPhotoSelect} style={{paddingBottom: 12}}>
      <FormControl isInvalid={invalid}>
        <Center
          position="relative"
          w={88}
          h={88}
          bg="gray.300"
          borderRadius="full"
          borderWidth="4"
          borderColor={invalid ? "#dc2626" : "blue.300"}
        >
          {!value ? (
            <User size={48} color="#9F9BA1" weight="bold" />
          ) : photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <Box w={PHOTO_SIZE} h={PHOTO_SIZE}>
              <Image
                source={{ uri: value }}
                alt="Imagem do usuário"
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
              />
            </Box>
          )}

          <Center
            w={10}
            h={10}
            borderRadius="full"
            position="absolute"
            bg={invalid ? "#dc2626" : "blue.300"}
            right="-10"
            bottom="-5"
          >
            <PencilSimpleLine size={20} color="#EDECEE" />
          </Center>
        </Center>
        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      </FormControl>
    </TouchableOpacity>
  );
}
