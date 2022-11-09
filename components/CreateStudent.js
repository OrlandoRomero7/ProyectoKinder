import React from 'react'
import { Textarea, Button, Center, Select } from '@mantine/core';
import styles from '../styles/Teachers.module.css'

const CreateStudent = () => {
  return (
    <>
    <Textarea autosize label="Nombre Alumno: "/>
    <Textarea autosize label="Nombre Padre/Tutor: "/>
    <Textarea autosize label="Correo Institucional: "/>
    <Textarea autosize label="Contraseña: "/>
    <Center pt={15}>
        <Button className={styles.post__button}> Registrar </Button>
    </Center>
    
    </>
  )
}

export default CreateStudent