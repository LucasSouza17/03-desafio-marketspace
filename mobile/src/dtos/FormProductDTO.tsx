import { ImageDTO } from "./ImageDTO";

export type FormProductDTO = {
  name: string;
  description: string;
  is_new: string;
  price: number;
  accept_trade: boolean;
  payment_methods: {
    key: string;
    name: string
  }[]
  images: ImageDTO[];
};


