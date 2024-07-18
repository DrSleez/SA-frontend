import { useNavigate, useParams } from "react-router-dom";
import usePlantSearch from "../hooks/usePlantSearch";
import LoadingPage from "./LoadingPage/LoadingPage";
import { Card, Grid, Group, Image, Text, Title } from "@mantine/core";

function useRequiredParams<T extends Record<string, any>>() {
  const params = useParams<T>();
  return params as T;
}

export default function SearchPlantPage() {
  const { search } = useRequiredParams<{ search: string }>();
  const query = usePlantSearch(search);
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

  const searchedCards = query.data.map((item) => (
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
          <Text fw={50}>{item.price}€</Text>
        </Group>
        <Text fw={400}>{item.latinName}</Text>
      </Card>
    </Grid.Col>
  ));

  return (
    <>
      <Title>Suchergebnisse für {search}</Title>
      <Grid justify="flex-start" mt={20}>
        {searchedCards}
      </Grid>
    </>
  );
}
