import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BasketState } from "../redux/basketSlice";

const checkoutURL = import.meta.env.VITE_CHECKOUT_URL;

async function getCheckout(basket: BasketState, token: string) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post<string>(`${checkoutURL}`, basket, config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get checkout link " + error);
  }
}

export default function useCheckout(token: string) {
  const query = useMutation({
    mutationFn: (basket: BasketState) => getCheckout(basket, token),
  });
  return query;
}
