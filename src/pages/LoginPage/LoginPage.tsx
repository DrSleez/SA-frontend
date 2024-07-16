import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Container,
} from "@mantine/core";
import "./LoginPage.css";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { notifications } from "@mantine/notifications";
import { KeyboardEvent, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import useLogin from "../../hooks/useLogin";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../../interfaces/TokenPayload";

export default function LoginPage() {
  const signIn = useSignIn();
  const signOut = useSignOut();
  const navigator = useNavigate();
  const mutation = useLogin();
  const isAuthenticated = useIsAuthenticated();
  const [isCapslockNotificated, setIsCapslockNotificated] = useState(false);
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  if (mutation.isPending) {
    return <LoadingPage />;
  }

  function handleSubmit(values: { username: string; password: string }) {
    mutation.mutate(values, {
      onSuccess: (data) => {
        const decodedAccessToken = jwtDecode<TokenPayload>(data.access_token);
        if (
          signIn({
            auth: {
              token: data.access_token,
              type: "Bearer",
            },
            refresh: data.refresh_token,
            userState: {
              name: decodedAccessToken.name,
              email: decodedAccessToken.email,
              username: decodedAccessToken.preferred_username,
              roles:
                decodedAccessToken.resource_access["frontend-client"]?.roles ||
                [],
              given_name: decodedAccessToken.given_name,
            },
          })
        ) {
          navigator("/my");
        }
      },
      onError: (error) => {
        console.log(error);
        form.setErrors({
          username: "Invalid Credentials",
          password: "Invalid Credentials",
        });
      },
    });
  }

  function handleSignOut() {
    signOut();
    navigator("/login");
  }

  function handleCapslock(event: KeyboardEvent<HTMLInputElement>) {
    if (event.getModifierState("CapsLock") && isCapslockNotificated === false) {
      notifications.show({
        title: "Capslock Activated",
        message: "Watch out - capslock activated",
      });
      setIsCapslockNotificated(true);
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Login</Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {isAuthenticated ? (
            <>
              <Title>Already logged in</Title>
              <Button fullWidth mt="xl" color="red" onClick={handleSignOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <TextInput
                label="Username"
                placeholder="User"
                required
                {...form.getInputProps("username")}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                key={form.key("password")}
                required
                mt="md"
                onKeyDown={handleCapslock}
                {...form.getInputProps("password")}
              />
              <Button fullWidth mt="xl" type="submit">
                Sign in
              </Button>
            </>
          )}
        </Paper>
      </form>
    </Container>
  );
}
