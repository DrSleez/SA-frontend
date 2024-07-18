import { useState } from "react";
import {
  AppShell,
  Burger,
  Group,
  Title,
  Button,
  Autocomplete,
  TextInput,
} from "@mantine/core";
import { FaBasketShopping, FaUser } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarLinksGroup from "./NavbarLinksGroup";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Basket from "./Basket/Basket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { clearBasket } from "../redux/basketSlice";
import { CiSearch } from "react-icons/ci";

export default function Nav() {
  const [navbarOpened, setNavbarOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const navigator = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const dispatch: AppDispatch = useDispatch();

  function handleCartClick() {
    setIsCartOpen(true);
  }

  function handleUserClick() {
    navigator("/my");
  }

  function handleSearchSubmit() {
    navigator("/search/" + searchValue);
  }

  function handleLogout() {
    signOut();
    dispatch(clearBasket());
    navigator("/login");
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
            <form onSubmit={handleSearchSubmit}>
              <TextInput
                value={searchValue}
                onChange={(event) => setSearchValue(event.currentTarget.value)}
                placeholder="Suche"
                leftSection={<CiSearch />}
                visibleFrom="xs"
              />
            </form>
          </Group>
          <Group>
            <Title>Software Moftware</Title>
          </Group>
          <Group>
            {isAuthenticated ? (
              <Button
                variant="gradient"
                gradient={{ from: "pink", to: "red", deg: 90 }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : null}
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
        <Basket
          isOpen={isCartOpen}
          closeBasket={() => setIsCartOpen((prev) => !prev)}
        />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
