import { useNavigate, useRouteError } from "react-router-dom";
import { Container, Center, Image, Text, Title, Button } from "@mantine/core";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const navigator = useNavigate();

  return (
    <Container>
      <Center style={{ height: "100vh", flexDirection: "column" }}>
        <Image
          src="/sadPlant.webp"
          alt="Sad plant with magnifying glass"
          style={{ maxWidth: "100%", maxHeight: "50vh", objectFit: "contain" }}
        />
        <Title order={2} style={{ marginTop: 20 }}>
          404 - Seite nicht gefunden
        </Title>
        <Text color="dimmed" style={{ marginTop: 10 }}>
          Die gesuchte Seite konnte nicht gefunden werden.
        </Text>
        <Button mt={20} onClick={() => navigator("/")}>
          Zurück zur Startseite
        </Button>
      </Center>
    </Container>
  );
}
