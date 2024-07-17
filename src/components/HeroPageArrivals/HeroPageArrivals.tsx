import { Card, Grid, Group, Image, Text, Badge, Title } from "@mantine/core";
import "./HeroPageArrivals.css";
import useAllPlants from "../../hooks/useAllPlants";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import getRandomElements from "../../utility/getRandomElements";
import { useNavigate } from "react-router-dom";

export default function HeroPageArrivals() {
  const query = useAllPlants();
  const navigator = useNavigate();

  if (query.isLoading) {
    return <LoadingPage />;
  }

  if (query.isError) {
    return (
      <div>
        <p>{query.error.message}</p>
      </div>
    );
  }

  if (query.isSuccess) {
    const newPlants = getRandomElements(query.data, 12);
    const cards = newPlants.map((item) => (
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
            <Image src={item.imageLink} h={400} fit="cover" />
          </Card.Section>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{item.name}</Text>
            <Badge color="pink">New</Badge>
          </Group>
          <Text fw={50}>{item.price}€</Text>
        </Card>
      </Grid.Col>
    ));

    return (
      <>
        <Grid justify="flex-start" mt={20}>
          {cards}
        </Grid>
      </>
    );
  }
}
