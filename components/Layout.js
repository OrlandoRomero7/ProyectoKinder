import React from 'react'
import AppShellComponent from './AppShellComponent'
import Head from 'next/head'

const Layout = ({children,tituloPagina}) => {
  return (
    <div>
        
        <Head>
            <title>Sistema Escolar - {tituloPagina}</title>
        </Head>

        
        <AppShellComponent>
            {children}
        </AppShellComponent>
       
        
        
        
    </div>
  )
}

export default Layout