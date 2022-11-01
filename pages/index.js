import { Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { Login } from '../components/Login'

const index = () => {
  return (
    <>
    <Login/>
    <Link href='teachers'><Text>Login</Text></Link>
    </>
  )
}

export default index
