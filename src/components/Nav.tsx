import { useState } from "react";
import {
  AppShell,
  Burger,
  Anchor,
  Group,
  Stack,
  Center,
  Title,
  Button,
} from "@mantine/core";
import { FaBasketShopping } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

export default function Nav() {
  const [opened, setOpened] = useState(false);

  function handleCartClick() {}

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
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
