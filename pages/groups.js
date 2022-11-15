import React,{useEffect}from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Teachers.module.css'
import { IconPlus } from '@tabler/icons';
import { ActionIcon, Modal, Text, Table,Button} from '@mantine/core';
import { useState } from 'react';
import CreateGroup from '../components/CreateGroup';

import { getAllGroups } from '../firebase/getDataDB';
import { deleteGroup } from '../firebase/setDataDB';

const Groups = () => {
  const [opened, setOpened] = useState(false);
  const [groups, setGroups] = useState([]);

  function updateGroups() {
    getAllGroups().then((groups) => {
      setGroups(groups);
    });
  }
  
  useEffect(() => {
    updateGroups();
  }, []);


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
      <CreateGroup updateGroups={updateGroups}/>
    </Modal>

    <Table>
      <thead>
        <tr>
          <th>Numero</th>
          <th>Grado</th>
          <th>Grupo</th>
          <th>Acción</th>
        </tr>
      </thead>
        
      <tbody>
        {groups && groups.map((group,index)=>(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{group.grade}</td>
            <td>{group.group}</td>
            <td>
              <Button >Editar</Button>
              <Button onClick={()=>{deleteGroup(group).then((confimacion)=>{
                updateGroups()
              })
                }}>Eliminar</Button>
            </td>

          </tr>
        ))}
      </tbody>
    </Table>

    


    
  </Layout>
    
  )
}

export default Groups