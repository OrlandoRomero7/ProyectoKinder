import React from 'react'
import AppShellComponent from './AppShellComponent'
import Head from 'next/head'
import { Stack } from '@mantine/core'


const Layout = ({ children, tituloPagina }) => {
  return (
    <div>

      <Head>
        <title>Sistema Escolar - {tituloPagina}</title>
      </Head>


      <AppShellComponent>
        <Stack sx={{ padding: 10 }}>
          {children}
        </Stack>
      </AppShellComponent>




    </div>
  )
}

export default Layout