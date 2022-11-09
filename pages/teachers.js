import React from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Teachers.module.css'
import { IconPlus } from '@tabler/icons';
import { ActionIcon, Modal } from '@mantine/core';
import { useState } from 'react';
import CreateTeacher from '../components/CreateTeacher';

const Teachers = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Layout tituloPagina="Docentes">
      <div className={styles.new__post}>
      <ActionIcon onClick={() => setOpened(true)} className={styles.post__icon}variant="filled"><IconPlus size={30} /></ActionIcon>

      </div>


      <Modal
        className={styles.modal}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Registro Personal"
      >
        <CreateTeacher/>
      </Modal>
    </Layout>
    
  )
}

export default Teachers