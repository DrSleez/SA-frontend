import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BasketContent } from "../interfaces/BasketContent";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthenticatedUser } from "../interfaces/AuthenticatedUser";

const basketURL = import.meta.env.VITE_BASKET_SERVICE;

async function getBasket() {
  const authUser = useAuthUser<AuthenticatedUser>();
  const token = authUser?.access_token ?? "";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get<BasketContent>(`${basketURL}`, config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get basket content " + error);
  }
}

export default function useBasketService() {
  const query = useQuery({
    queryKey: ["basket"],
    queryFn: () => getBasket(),
  });
  return query;
}
