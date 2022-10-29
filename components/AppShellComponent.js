import React, { useState } from "react";
import {
  AppShell,
  Navbar,
  MediaQuery,
  useMantineTheme,
  Text,
  Header,
  Burger,
  NavLink,
} from "@mantine/core";
import {
  IconHome2,
  IconCheckupList,
  IconCalculator,
  IconSearch,
} from "@tabler/icons";
import Link from "next/link";

const AppShellComponent = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Link href="/posts" passHref>
              <NavLink
                component="a"
                label="Publicaciones"
                icon={<IconHome2 size={16} stroke={1.5} />}
              />
            </Link>

            <Link href="/students" passHref>
              <NavLink
                component="a"
                label="Alumnos"
                icon={<IconCheckupList size={16} stroke={1.5} />}
              />
            </Link>

            <Link href="/groups" passHref>
              <NavLink
                component="a"
                label="Grupos"
                icon={<IconCalculator size={16} stroke={1.5} />}
              />
            </Link>

            <Link href="/teachers" passHref>
              <NavLink
                component="a"
                label="Personal"
                icon={<IconSearch size={16} stroke={1.5} />}
              />
            </Link>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            
          </div>
        </Header>
      }
    >
      <Text>{children}</Text>
    </AppShell>
  );
};

export default AppShellComponent;
