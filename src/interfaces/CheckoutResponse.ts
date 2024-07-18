export interface CheckoutResponse {
  id: string;
  items: {
    id: string;
    productName: string;
    itemId: string;
    price: number;
  }[];
  metadata: {
    id: string;
    username: string;
    status: string;
    sessionId: string;
    createdAt: string;
  };
}
