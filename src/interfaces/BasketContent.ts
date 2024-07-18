export interface BasketContent {
  username: string;
  items: {
    itemId: string;
    plantId: string;
    name: string;
    itemPrice: number;
    imageLink: string;
  }[];
  totalPrice: number;
}
