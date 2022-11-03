import React from 'react'
import { TextInput,PasswordInput,Button, Image, Center } from '@mantine/core';
import styles from '../styles/Login.module.css'
export const Login = () => {

  return (
   <Center>
    <div className={styles.login__container}>
      <div className={styles.image}>
        <Image width={300} className={styles.image} src='/assets/img/aidalogo.png'/>
      </div>  

      <form className={styles.inputs} onSubmit=''>
        <TextInput pb={14} placeholder="Correo Electronico"/>
        <PasswordInput placeholder="Contraseña"/>
        <div className={styles.down}> 
            <Button className={styles.login__button}component="a" href="/posts" type="submit" radius="md"> Iniciar Sesion </Button>
            <a className={styles.recover} href="/ErrorDeServer"> Recuperar Contraseña </a>
      </div>
      </form>

      
    </div>
   </Center>
  )
}
