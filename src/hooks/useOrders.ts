import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CheckoutResponse } from "../interfaces/CheckoutResponse";

const orderURL = import.meta.env.VITE_ORDER_URL;

async function getOrders(token: string): Promise<CheckoutResponse[]> {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get<CheckoutResponse[]>(`${orderURL}`, config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get orders" + error);
  }
}

export default function useOrders(token: string) {
  const query = useQuery({
    queryKey: ["orders", token],
    queryFn: () => getOrders(token),
  });
  return query;
}
