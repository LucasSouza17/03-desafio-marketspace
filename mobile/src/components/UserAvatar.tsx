import { IImageProps, Image, Skeleton } from "native-base";

import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";

type Props = IImageProps & {
  sizeImage: number;
  avatar: string;
};

export function UserAvatar({ sizeImage, avatar, ...rest }: Props) {
  return (
    <Image
      source={{ uri: `${api.defaults.baseURL}/images/${avatar}` }}
      alt="avatar image"
      w={sizeImage}
      h={sizeImage}
      rounded="full"
      borderWidth={2}
      borderColor="blue.300"
      fallbackElement={<Skeleton w={sizeImage} h={sizeImage} startColor="blue.300" endColor="blue.700" />}
      {...rest}
    />
  );
}
