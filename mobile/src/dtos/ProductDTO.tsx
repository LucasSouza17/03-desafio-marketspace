export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: number;
  user_id: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  product_images: {
    path: string;
    id: String;
  }[];
  payment_methods: {
    key: "boleto" | "pix" | "cash" | "card" | "deposit";
    name: string;
  }[];
  user: {
    avatar: string;
    name: string;
    tel: string;
  };
};