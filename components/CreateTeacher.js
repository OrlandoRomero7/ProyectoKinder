import React from 'react'
import { Textarea, Button, Center, Select } from '@mantine/core';
import styles from '../styles/Teachers.module.css'

const CreateTeacher = () => {
  return (
    <>
    <Textarea autosize label="Nombre: "/>
    <Select
      label="Tipo de Usuario"
      data={[
        { value: 'admin', label: 'admin' },
        { value: 'profesor', label: 'profesor' },
        { value: 'subdirector', label: 'subdirector' },
        { value: 'prefecto', label: 'prefecto' },
      ]}
    />
    <Select
      label="Asignar Grupo"
      data={[
        { value: '1a', label: '1A' },
        { value: '1b', label: '1B' },
        { value: '2a', label: '2A' },
        { value: '2c', label: '2C' },
      ]}
    />
    <Textarea autosize label="Correo: "/>
    <Textarea autosize label="Contraseña: "/>
    <Center pt={15}>
        <Button className={styles.post__button}> Registrar </Button>
    </Center>
    
    </>
  )
}

export default CreateTeacher