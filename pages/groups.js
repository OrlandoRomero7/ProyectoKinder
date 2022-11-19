import React,{useEffect}from 'react'
import Layout from '../components/Layout'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
import { ActionIcon, Modal, Text, Table,Button, Center,Group} from '@mantine/core';
import { useState } from 'react';
import CreateGroup from '../components/CreateGroup';
import styles from '../styles/Groups.module.css'
import { getAllGroups } from '../firebase/getDataDB';
import { deleteGroup } from '../firebase/setDataDB';
import GroupEdit from '../components/GroupEdit';
import { IconAdjustments } from '@tabler/icons';
//import { openConfirmModal } from '@mantine/modals';


const Groups = () => {
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [groups, setGroups] = useState([]);
  const [editGroup, setEditGroup] = useState({});
  const [eliminar, setEliminar] = useState({});
  const [opened3, setOpened3] = useState(false);


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
      <GroupEdit updateGroups={updateGroups} editGroup={editGroup}/>
    </Modal>

    )}
    <div  className={styles.table__container}>
    <Table>
      <thead>
        <tr>
          <th>Grado</th>
          <th>Grupo</th>
          <th>Acción</th>
        </tr>
      </thead>
        
      <tbody>
        {groups && groups.map((group,index)=>(
          <tr key={index}>
            <td>{group.grade}</td>
            <td>{group.group}</td>
            <td>
              <div className={styles.icons}>
            <ActionIcon color='indigo' onClick={() => {setOpened2(true);setEditGroup(group)}}>
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon color='red'onClick={()=>{setOpened3(true);setEliminar(group)}}>
              <IconTrash size={18} />
            </ActionIcon>
            </div>
            </td>

          </tr>
        ))}
      </tbody>
    </Table>
    </div>
    

    <Modal
        opened={opened3}
        onClose={() => setOpened3(false)}
        title={<Text size='lg'>Seguro que desea eliminar el grupo?</Text>}
      >
        <div className={styles.modal__confirmation}>
        <Button onClick={() => setOpened3(false)} color='red'>
          Cancelar
        </Button>
        <Button onClick={()=>deleteGroup(eliminar).then(()=>{updateGroups()}).then(()=> setOpened3(false))}>
          Confirmar
        </Button>
        </div>
      </Modal>
    
  </Layout>
    
  )
}

export default Groups