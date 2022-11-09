import React from 'react'
import { Textarea, Button, Center } from '@mantine/core';
import styles from '../styles/Teachers.module.css'
import { DatePicker } from '@mantine/dates';

const ModalNewPost = () => {
  return (
    <>
    <Textarea label="Título: "/>
    <Textarea label="Asunto: "/>
    <Textarea label="Contenido: "/>
    <DatePicker placeholder="" label="Fecha de Entrega" />    
    <Center pt={15}>
        <Button className={styles.post__button}> Publicar </Button>
    </Center>
    
    </>
    
  )
}

export default ModalNewPost