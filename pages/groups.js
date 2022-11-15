import React from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Teachers.module.css'
import { IconPlus } from '@tabler/icons';
import { ActionIcon, Modal, Text } from '@mantine/core';
import { useState } from 'react';
import CreateGroup from '../components/CreateGroup';
const Groups = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Layout tituloPagina="Grupos">
    <div className={styles.new__post}>
    <ActionIcon onClick={() => setOpened(true)} className={styles.post__icon}variant="filled"><IconPlus size={30} /></ActionIcon>

    </div>

    <Modal
      className={styles.modal}
      opened={opened}
      onClose={() => setOpened(false)}
      title="Crear Grupo"
    >
      <CreateGroup/>
    </Modal>


    
  </Layout>
    
  )
}

export default Groups