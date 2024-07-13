import { useState } from "react";
import {
  AppShell,
  Burger,
  Anchor,
  Group,
  Stack,
  Title,
  Button,
} from "@mantine/core";
import { FaBasketShopping } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import { useBasket } from "../context/BasketContext";

export default function Nav() {
  const [navbarOpened, setNavbarOpened] = useState(false);
  const { openBasket } = useBasket();

  function handleCartClick() {
    openBasket();
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: !navbarOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={navbarOpened}
              onClick={() => setNavbarOpened((o) => !o)}
            />
          </Group>
          <Group>
            {" "}
            <Title>Software Moftware</Title>
          </Group>
          <Group>
            <Button
              variant="outline"
              style={{ marginLeft: "3em" }}
              onClick={() => handleCartClick()}
            >
              <FaBasketShopping size="1.5rem" />
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Stack w="100%" px="md" p="auto">
          <Anchor>Home</Anchor>
          <Anchor>Features</Anchor>
          <Anchor>Pricing</Anchor>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
