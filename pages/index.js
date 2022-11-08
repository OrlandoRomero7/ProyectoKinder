import { Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { Login } from '../components/Login'
import styles from '../styles/Login.module.css'
const index = () => {
  return (
    <div className={styles.background}>
      <Login />
    </div>
  )
}

export default index
