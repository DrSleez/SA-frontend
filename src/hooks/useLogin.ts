import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const authURL = import.meta.env.VITE_LOGIN_URL;

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
    return axios
      .post<User>(`${authURL}`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => response.data);
  } catch (error) {
    throw new Error("Failed to login");
  }
}

export default function useLogin() {
  const mutation = useMutation({
    mutationFn: (user: UserRequest) => getLogin(user),
  });
  return mutation;
}
