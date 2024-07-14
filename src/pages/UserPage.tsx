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

export default function UserPage() {
  return (
    <Container>
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
        <Card shadow="sm" padding="lg" radius="md" withBorder w={350}>
          <Card.Section>
            <Image src="/details.webp" h={200} fit="contain" />
          </Card.Section>
          <Container w="100%" h="100%">
            <Title>Meine Details</Title>
            <Text size="sm">
              Bearbeite Lieferadressen, Passwörter und andere Details von dir
            </Text>
          </Container>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder w={350}>
          <Card.Section>
            <Image src="/mlem.webp" h={200} fit="contain" />
          </Card.Section>
          <Container w="100%" h="100%">
            {" "}
            <Title>Noch irgendwas</Title>
            <Text size="sm">Ja irgendwas kannst du hier halt machen</Text>
          </Container>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
