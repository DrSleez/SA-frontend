import { Badge, Card, Grid, Group, Image, Text, Title } from "@mantine/core";
import LoadingPage from "./LoadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import useCategoryPlants from "../hooks/useCategoryPlants";

export default function TreesPage() {
  const query = useCategoryPlants("BAUM");
  const navigator = useNavigate();

  if (query.isPending) {
    return <LoadingPage />;
  }

  if (query.isError) {
    return (
      <div>
        <p>{query.error.message}</p>
      </div>
    );
  }

  const categoryCards = query.data.map((item) => (
    <Grid.Col span={3} key={item.name}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="card-container"
        onClick={() => navigator("/plant/" + item.plantId)}
      >
        <Card.Section>
          <Image
            src={item.imageLink}
            h={400}
            fit="cover"
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{item.name}</Text>
          <Text fw={400}>{item.latinName}</Text>
        </Group>
        <Text fw={50}>{item.price}€</Text>
      </Card>
    </Grid.Col>
  ));

  return (
    <>
      <Title>Bäume</Title>
      <Grid justify="flex-start" mt={20}>
        {categoryCards}
      </Grid>
    </>
  );
}
