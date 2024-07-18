import {
  Card,
  Container,
  Grid,
  Title,
  Text,
  Image,
  Center,
  SimpleGrid,
} from "@mantine/core";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthenticatedUser } from "../interfaces/AuthenticatedUser";
import getUserIsAdmin from "../utility/getUserIsAdmin";

export default function UserPage() {
  const authUser = useAuthUser<AuthenticatedUser>();
  const isAdmin = getUserIsAdmin(authUser);

  return (
    <Container>
      <Title pb={20}>Willkommen zurück {authUser?.given_name}!</Title>
      <SimpleGrid cols={2}>
        <Card shadow="sm" padding="lg" radius="md" withBorder w={350}>
          <Card.Section>
            <Image src="/orders.webp" h={200} fit="contain" />
          </Card.Section>
          <Container w="100%" h="100%">
            <Title>Bestellungen</Title>
            <Text size="sm">Schau dir deine letzten Bestellungen an</Text>
          </Container>
        </Card>
        {isAdmin ? (
          <Card shadow="sm" padding="lg" radius="md" withBorder w={350}>
            <Card.Section>
              <Image src="/mlem.webp" h={200} fit="contain" />
            </Card.Section>
            <Container w="100%" h="100%">
              {" "}
              <Title>Neue Pflanze</Title>
              <Text size="sm">Erstelle als Admin eine neue Pflanze</Text>
            </Container>
          </Card>
        ) : null}
      </SimpleGrid>
    </Container>
  );
}
