import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import classes from "./NavbarLinksGroup.module.css";
import { IoChevronForwardSharp } from "react-icons/io5";
import { PiPlant } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const navigator = useNavigate();
  const items = (hasLinks ? links : []).map((link) => (
    <Text<"a">
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={() => navigator(link.link)}
    >
      {link.label}
    </Text>
  ));

  if (link === undefined) {
    return (
      <>
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={classes.control}
          m={5}
        >
          <Group justify="space-between" gap={0}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <IoChevronForwardSharp
                className={classes.chevron}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? "rotate(-90deg)" : "none",
                }}
              />
            )}
          </Group>
        </UnstyledButton>
        {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
      </>
    );
  } else {
    return (
      <>
        <UnstyledButton onClick={() => navigator(link)} m={5}>
          {" "}
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
        </UnstyledButton>
      </>
    );
  }
}

const mockdata = [
  { label: "Home", icon: FaHome, link: "/" },
  {
    label: "Pflanzen",
    icon: PiPlant,
    links: [
      { label: "Alle Pflanzen", link: "/all" },
      { label: "Gartenpflanzen", link: "/gartenpflanzen" },
      { label: "Zimmerpflanzen", link: "/zimmerpflanzen" },
      { label: "Heckenpflanzen", link: "/heckenpflanzen" },
      { label: "Bäume", link: "/baeume" },
    ],
  },
];

const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

export default function NavbarLinksGroup() {
  return (
    <Box mih={300} p="md">
      {links}
    </Box>
  );
}
