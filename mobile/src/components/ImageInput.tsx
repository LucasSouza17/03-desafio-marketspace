import { TouchableOpacity } from "react-native";
import { useState } from "react";
import {
  Center,
  FormControl,
  IFormControlProps,
  Image,
  Skeleton,
  useTheme,
  useToast,
} from "native-base";
import { Plus } from "phosphor-react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ImageDTO } from "@dtos/ImageDTO";

type Props = IFormControlProps & {
  errorMessage?: string | null;
  onChange: (value: ImageDTO) => void;
  value?: string;
};

const PHOTO_SIZE = 24;

export function ImageInput({ errorMessage, onChange, value, ...rest }: Props) {
  const toast = useToast();
  const { colors } = useTheme();

  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const invalid = !!errorMessage;

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
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

        const objectReturn: ImageDTO = {
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
    <TouchableOpacity activeOpacity={0.65} onPress={handleUserPhotoSelect}>
      <FormControl  isInvalid={invalid} {...rest}>
        <Center w={PHOTO_SIZE} h={PHOTO_SIZE} rounded="md" bg="gray.300">
          {!value ? (
            <Plus color={colors.gray[400]} />
          ) : photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="md"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <Image
              source={{ uri: value }}
              alt="Imagem do usuário"
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="md"
            />
          )}
        </Center>
        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      </FormControl>
    </TouchableOpacity>
  );
}
