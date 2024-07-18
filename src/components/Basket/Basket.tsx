import {
  Button,
  Center,
  Drawer,
  Group,
  List,
  ListItem,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import BasketEntry from "./BasketEntry";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useCheckout from "../../hooks/useCheckout";
import { useNavigate } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

interface BasketProps {
  isOpen: boolean;
  closeBasket: () => void;
}

export default function Basket({ isOpen, closeBasket }: BasketProps) {
  const dispatch: AppDispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket);
  const authHeader = useAuthHeader();
  const token = authHeader?.split(" ")[1];
  const isAuthenticated = useIsAuthenticated();
  const basketItems = basket.items.map((item) => (
    <BasketEntry item={item} key={item.itemId} />
  ));
  const mutation = useCheckout(token);

  function handleCheckout() {
    mutation.mutate(basket, {
      onSuccess: (data) => {
        window.location.href = data;
      },
    });
  }

  return (
    <Drawer
      size="xl"
      opened={isOpen}
      onClose={closeBasket}
      title="Warenkorb"
      position="right"
      offset={8}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      {isAuthenticated ? (
        <>
          {basketItems.length === 0 ? (
            <>
              <Title>Keine Artikel im Warenkorb</Title>
            </>
          ) : (
            <>
              <List>{basketItems}</List>
            </>
          )}
          <Group justify="space-between">
            <Title mt={20}>Total: {basket.totalPrice.toFixed(2)}€</Title>
            <Center>
              <Button onClick={() => handleCheckout()}>Bezahlen</Button>
            </Center>
          </Group>
        </>
      ) : (
        <>
          <Title>Nicht eingeloggt</Title>
        </>
      )}
    </Drawer>
  );
}
