import React from 'react'
import { Textarea, Button, Center, Select,TextInput} from '@mantine/core';
import styles from '../styles/Teachers.module.css'

const CreateStudent = () => {
  return (
    <>
    <TextInput autosize label="Nombre Alumno: "/>
    <TextInput autosize label="Nombre Padre/Tutor: "/>
    <TextInput autosize label="Correo Institucional: "/>
    <TextInput autosize label="Contraseña: "/>
    <TextInput autosize label="Confirmar contraseña: " />
    <Center pt={15}>
        <Button className={styles.post__button}> Registrar </Button>
    </Center>
    
    </>
  )
}

export default CreateStudent