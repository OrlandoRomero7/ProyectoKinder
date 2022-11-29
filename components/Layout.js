import React from "react";
import AppShellComponent from "./AppShellComponent";
import Head from "next/head";
import { Container, Stack } from "@mantine/core";

const Layout = ({ children, tituloPagina }) => {
  return (
    <div>
      <Head>
        <title>Sistema Escolar - {tituloPagina}</title>
      </Head>

      <AppShellComponent>
        <Container pt={40}>{children}</Container>
      </AppShellComponent>
    </div>
  );
};

export default Layout;
