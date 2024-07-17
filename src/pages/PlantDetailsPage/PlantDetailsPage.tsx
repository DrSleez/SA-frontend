import { useParams } from "react-router-dom";
import usePlant from "../../hooks/usePlant";
import { UUID } from "crypto";
import LoadingPage from "../LoadingPage/LoadingPage";
import {
  Container,
  Title,
  Text,
  Image,
  Grid,
  Loader,
  Button,
  Flex,
} from "@mantine/core";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useBasket } from "../../context/BasketContext";

function useRequiredParams<T extends Record<string, any>>() {
  const params = useParams<T>();
  return params as T;
}

export default function PlantDetailsPage() {
  const { id } = useRequiredParams<{ id: UUID }>();
  const query = usePlant(id);
  const isAuthenticated = useIsAuthenticated();
  const {
    increaseBasketQuantity,
    decreaseBasketQuantity,
    removeFromBasket,
    getItemQuantity,
  } = useBasket();
  const quantity = getItemQuantity(id);

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
        <Image
          src={query.data.imageLink}
          alt={query.data.name}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          h="500"
          w="100%"
        />
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
          {isAuthenticated ? (
            <>
              {quantity === 0 ? (
                <>
                  <Flex justify={{ sm: "center" }} align="center">
                    <Button onClick={() => increaseBasketQuantity(id)}>
                      Add to Basket
                    </Button>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex
                    gap={{ base: "sm", sm: "lg" }}
                    justify={{ sm: "center" }}
                    mb={3}
                    align="center"
                  >
                    <Button
                      justify="center"
                      size="sm"
                      onClick={() => decreaseBasketQuantity(id)}
                    >
                      -
                    </Button>
                    <span>{quantity}</span>
                    <Button
                      justify="center"
                      size="sm"
                      onClick={() => increaseBasketQuantity(id)}
                    >
                      +
                    </Button>
                  </Flex>
                  <Flex mt={3} justify={{ sm: "center" }} align="center">
                    <Button
                      color="red"
                      size="sm"
                      onClick={() => removeFromBasket(id)}
                    >
                      Remove from Basket
                    </Button>
                  </Flex>
                </>
              )}
            </>
          ) : null}
        </Grid.Col>
      </Grid>
    </Container>
  );
}
