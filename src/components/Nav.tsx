import { useState } from "react";
import { AppShell, Burger, Group, Title, Button } from "@mantine/core";
import { FaBasketShopping, FaUser } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";
import { useBasket } from "../context/BasketContext";
import NavbarLinksGroup from "./NavbarLinksGroup";

export default function Nav() {
  const [navbarOpened, setNavbarOpened] = useState(false);
  const { openBasket } = useBasket();
  const navigator = useNavigate();

  function handleCartClick() {
    openBasket();
  }

  function handleUserClick() {
    navigator("/my");
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
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
            <Button variant="transparent" onClick={() => handleUserClick()}>
              <FaUser size="1.5rem" />
            </Button>
            <Button variant="outline" onClick={() => handleCartClick()}>
              <FaBasketShopping size="1.5rem" />
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavbarLinksGroup />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
