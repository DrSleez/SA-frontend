import { useParams } from "react-router-dom";
import usePlant from "../../hooks/usePlant";
import { UUID } from "crypto";
import LoadingPage from "../LoadingPage/LoadingPage";
import { Container, Title, Text, Image, Grid, Loader } from "@mantine/core";

function useRequiredParams<T extends Record<string, any>>() {
  const params = useParams<T>();
  return params as T;
}

export default function PlantDetailsPage() {
  const { id } = useRequiredParams<{ id: UUID }>();
  const query = usePlant(id);

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

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={6}>
          <Image
            src={query.data.imageLink}
            alt={query.data.name}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Title>{query.data.name}</Title>
          <Text color="dimmed" size="lg" style={{ marginBottom: "1rem" }}>
            {query.data.latinName}
          </Text>
          <Text>
            <strong>Preis: </strong>
            {query.data.price.toFixed(2)}€
          </Text>
          <Text>
            <strong>Größe:</strong> {query.data.height}
          </Text>
          <Text>
            <strong>Wasserverbauch:</strong> {query.data.waterDemand}
          </Text>
          <Text>
            <strong>Beschreibung:</strong> {query.data.description}
          </Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
