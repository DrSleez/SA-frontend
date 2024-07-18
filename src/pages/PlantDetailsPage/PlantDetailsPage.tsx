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
  Button,
  Flex,
} from "@mantine/core";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToBackend,
  removeItemFromBackend,
} from "../../redux/basketSlice";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import getUserIsAdmin from "../../utility/getUserIsAdmin";

function useRequiredParams<T extends Record<string, any>>() {
  const params = useParams<T>();
  return params as T;
}

export default function PlantDetailsPage() {
  const { id } = useRequiredParams<{ id: UUID }>();
  const query = usePlant(id);
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
  const isAdmin = getUserIsAdmin(authUser);
  const token = authHeader?.split(" ")[1];
  const dispatch: AppDispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket);
  const quantity = basket.items.filter((item) => item.plantId === id).length;
  const basketItem = useSelector((state: RootState) =>
    state.basket.items.find((item) => item.plantId === id)
  );

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

  const itemForBasket = {
    plantId: query.data.plantId,
    name: query.data.name,
    itemPrice: query.data.price,
    imageLink: query.data.imageLink,
  };

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={3}>
          <Image
            src={query.data.imageLink}
            alt={query.data.name}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            h="500"
            w="100%"
            radius="md"
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
          <Grid.Col span={3}>
            {isAuthenticated ? (
              <>
                {quantity === 0 ? (
                  <>
                    <Flex mt={20}>
                      <Button
                        onClick={() => {
                          dispatch(
                            addItemToBackend({ item: itemForBasket, token })
                          );
                        }}
                      >
                        Zum Warenkorb hinzufügen
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Flex
                      gap={{ base: "sm", sm: "lg" }}
                      mb={3}
                      align="center"
                      mt={20}
                    >
                      <Button
                        justify="center"
                        size="sm"
                        onClick={() => {
                          dispatch(
                            removeItemFromBackend({
                              item: {
                                ...itemForBasket,
                                itemId: basketItem?.itemId,
                              },
                              token,
                            })
                          );
                        }}
                      >
                        -
                      </Button>
                      <span>{quantity}</span>
                      <Button
                        justify="center"
                        size="sm"
                        onClick={() => {
                          dispatch(
                            addItemToBackend({ item: itemForBasket, token })
                          );
                        }}
                      >
                        +
                      </Button>
                    </Flex>
                  </>
                )}
              </>
            ) : null}
          </Grid.Col>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
