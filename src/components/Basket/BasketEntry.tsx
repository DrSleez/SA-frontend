import { Grid, Image, Stack, Text, Flex, Button } from "@mantine/core";
import { BasketItem } from "../../interfaces/BasketItem";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { removeItemFromBackend } from "../../redux/basketSlice";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import "./BasketEntry.css";
import { useNavigate } from "react-router-dom";

type BasketEntryProps = {
  item: BasketItem;
};

export default function BasketEntry({ item }: BasketEntryProps) {
  const dispatch: AppDispatch = useDispatch();
  const authHeader = useAuthHeader();
  const token = authHeader?.split(" ")[1];
  const navigator = useNavigate();
  if (!token) {
    console.error("No auth token available");
    return;
  }

  function handleProductClick() {
    navigator("/plant/" + item.plantId);
  }

  function handleRemove() {
    dispatch(
      removeItemFromBackend({
        item: {
          ...item,
        },
        token,
      })
    );
  }

  return (
    <>
      <Grid columns={24} key={item.itemId}>
        <Grid.Col span={6}>
          <Image
            radius="md"
            src={item.imageLink}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            h={100}
            w="auto"
            onClick={() => handleProductClick()}
            className="plantClick"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Stack gap={0} h={100} justify="center">
            <Text
              fw={700}
              className="plantClick"
              onClick={() => handleProductClick()}
            >
              {item.name}
            </Text>
            <Text fs="italic">{item.itemPrice}€</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Flex h={100} justify="center" align="center" gap={6}>
            <Button
              variant="outline"
              color="red"
              size="xs"
              onClick={() => handleRemove()}
            >
              x
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
}
