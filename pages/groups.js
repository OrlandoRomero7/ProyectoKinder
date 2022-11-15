import React,{useEffect}from 'react'
import Layout from '../components/Layout'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
import { ActionIcon, Modal, Text, Table,Button, Center} from '@mantine/core';
import { useState } from 'react';
import CreateGroup from '../components/CreateGroup';
import styles from '../styles/Groups.module.css'
import { getAllGroups } from '../firebase/getDataDB';
import { deleteGroup } from '../firebase/setDataDB';
import CreateGroupEdit from '../components/CreateGroupEdit';
import { IconAdjustments } from '@tabler/icons';
const Groups = () => {
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [groups, setGroups] = useState([]);
  const [editGroup, setEditGroup] = useState({});

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

    {editGroup && (
      <Modal
      className={styles.modal}
      opened={opened2}
      onClose={() => setOpened2(false)}
      title="Editar Grupo"
      
    >
      <CreateGroupEdit updateGroups={updateGroups} editGroup={editGroup}/>
    </Modal>

    )}
    <div  className={styles.table__container}>
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
              <div className={styles.icons}>
            <ActionIcon color='indigo' onClick={() => {setOpened2(true);setEditGroup(group)}}>
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon color='red'onClick={()=>{deleteGroup(group).then((confimacion)=>{ updateGroups()}) }}>
              <IconTrash size={18} />
            </ActionIcon>
            </div>
            </td>

          </tr>
        ))}
      </tbody>
    </Table>
    </div>
    


    
  </Layout>
    
  )
}

export default Groups