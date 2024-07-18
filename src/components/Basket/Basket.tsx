import { Drawer, List, ListItem, Title } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import BasketEntry from "./BasketEntry";
interface BasketProps {
  isOpen: boolean;
  closeBasket: () => void;
}

export default function Basket({ isOpen, closeBasket }: BasketProps) {
  const dispatch: AppDispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket);

  const basketItems = basket.items.map((item) => <BasketEntry item={item} />);

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
      {basketItems.length === 0 ? (
        <>
          <Title>Keine Artikel im Warenkorb</Title>
        </>
      ) : (
        <>
          <List>{basketItems}</List>
        </>
      )}
      <Title mt={20}>Total: {basket.totalPrice.toFixed(2)}€</Title>
    </Drawer>
  );
}
