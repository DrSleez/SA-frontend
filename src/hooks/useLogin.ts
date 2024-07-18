import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const authURL = import.meta.env.VITE_LOGIN_URL;
const basketURL = import.meta.env.VITE_BASKET_SERVICE;

type UserRequest = {
  username: string;
  password: string;
};

type User = {
  access_token: string;
  refresh_token: string;
};

function getLogin(user: UserRequest): Promise<User> {
  try {
    const params = new URLSearchParams({
      grant_type: "password",
      username: user.username,
      password: user.password,
      client_id: "frontend-client",
    });
    const response = axios
      .post<User>(`${authURL}`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => response.data);
    return response;
  } catch (error) {
    throw new Error("Failed to login");
  }
}

async function createBasketIfNotExist(access_token: string) {
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };
  try {
    const response = await axios.get(`${basketURL}`, config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      try {
        const createResponse = await axios.post(`${basketURL}`, {}, config);
        return createResponse.data;
      } catch (createError) {
        throw new Error("Basket can't be created");
      }
    } else {
      throw error;
    }
  }
}
export default function useLogin() {
  const mutation = useMutation({
    mutationFn: (user: UserRequest) => getLogin(user),
    onSuccess: (data) => {
      try {
        createBasketIfNotExist(data.access_token);
      } catch (error) {}
    },
  });
  return mutation;
}
