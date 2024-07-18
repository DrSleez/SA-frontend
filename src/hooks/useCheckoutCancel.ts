import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CheckoutResponse } from "../interfaces/CheckoutResponse";

const checkoutCancelURL = import.meta.env.VITE_CHECKOUT_CANCEL_URL;

async function getCancel(id: string, token: string): Promise<CheckoutResponse> {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get<CheckoutResponse>(
      `${checkoutCancelURL}=${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to get checkout cancel" + error);
  }
}

export default function useCheckoutCancel(id: string, token: string) {
  const query = useQuery({
    queryKey: ["checkout", "cancel", id],
    queryFn: () => getCancel(id, token),
  });
  return query;
}
