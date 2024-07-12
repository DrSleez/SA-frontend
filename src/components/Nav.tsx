import { useState } from "react";
import { AppShell, Burger, Anchor, Group } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function Nav() {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      header={{ height: 60, offset: true }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Anchor>Home</Anchor>
        <Anchor>Features</Anchor>
        <Anchor>Pricing</Anchor>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
