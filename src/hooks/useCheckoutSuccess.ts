import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CheckoutResponse } from "../interfaces/CheckoutResponse";

const checkoutSuccessURL = import.meta.env.VITE_CHECKOUT_SUCCESS_URL;

async function getSuccess(
  id: string,
  token: string
): Promise<CheckoutResponse> {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get<CheckoutResponse>(
      `${checkoutSuccessURL}=${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to get checkout success" + error);
  }
}

export default function useCheckoutSuccess(id: string, token: string) {
  console.log(id, token);
  const query = useQuery({
    queryKey: ["checkout", id],
    queryFn: () => getSuccess(id, token),
  });
  return query;
}
