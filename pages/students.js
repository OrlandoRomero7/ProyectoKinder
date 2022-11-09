import React from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Teachers.module.css'
import { ActionIcon, Modal } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useState } from 'react';
import CreateStudent from '../components/CreateStudent';
const Students = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Layout tituloPagina="Alumnos">
      <div className={styles.new__post}>
        <ActionIcon onClick={() => setOpened(true)} className={styles.post__icon}variant="filled"><IconPlus size={30} /></ActionIcon>
      </div>


      <Modal
        className={styles.modal}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Registro Alumnos"
      >
        <CreateStudent/>
      </Modal>
    </Layout>
    
  )
}
export default Students