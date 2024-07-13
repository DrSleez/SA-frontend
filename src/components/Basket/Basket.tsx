import {
  Drawer,
  Flex,
  Grid,
  Stack,
  Title,
  Button,
  Container,
  List,
} from "@mantine/core";
import { useState } from "react";
import { useBasket } from "../../context/BasketContext";

interface BasketProps {
  isOpen: boolean;
}

export default function Basket({ isOpen }: BasketProps) {
  const [totalBasket, setTotal] = useState(0);
  const { closeBasket } = useBasket();
  let totalMap = new Map();

  function updateTotal(id: string, total: number) {
    let sum: number = 0;
    totalMap.set(id, total);
    totalMap.forEach((value) => {
      sum += value;
    });
    setTotal(sum);
  }

  const handleCheckout = () => {};
  const basketQuantity = 0;

  return (
    <>
      <Drawer
        size="xl"
        opened={isOpen}
        onClose={() => closeBasket()}
        title="Warenkorb"
        position="right"
        offset={8}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Container>
          <List></List>
        </Container>
        <Grid columns={24}>
          <Grid.Col span={18}>
            {basketQuantity === 0 ? (
              <Flex h={100} align="center" justify="flex-end">
                <Title>Keine Artikel im Warenkorb</Title>
              </Flex>
            ) : (
              <Flex align="center" justify="flex-end" ml={3} h={50}>
                <Title order={2}>Total</Title>
              </Flex>
            )}
          </Grid.Col>
          <Grid.Col span={6}>
            {basketQuantity === 0 ? null : (
              <Flex
                h={100}
                gap="md"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Stack gap={3}>
                  <Title> ${totalBasket.toFixed(2)}</Title>
                  <Button color="green" onClick={() => handleCheckout()}>
                    Checkout
                  </Button>
                </Stack>
              </Flex>
            )}
          </Grid.Col>
        </Grid>
      </Drawer>
    </>
  );
}
