import React,{useEffect}from 'react'
import Layout from '../components/Layout'
import { IconEdit, IconPlus, IconTrash, IconUsers } from '@tabler/icons';
import { ActionIcon, Modal, Text,Table,Button, Center,Group, ScrollArea} from '@mantine/core';
import { useState } from 'react';
import CreateGroup from '../components/CreateGroup';
import styles from '../styles/Groups.module.css'
import { getAllGroups } from '../firebase/getDataDB';
import { deleteGroup } from '../firebase/setDataDB';
import { ThemeIcon } from '@mantine/core';
import GroupEdit from '../components/GroupEdit';
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
      <ScrollArea>
    <div className={styles.new__post}>
      <div className={styles.group__title}>
      <ThemeIcon variant='transparent' color="dark"> <IconUsers /></ThemeIcon>
      <h2>Grupos</h2>
      </div>
      
      <ActionIcon onClick={() => setOpened(true)} className={styles.post__icon}variant="filled"><IconPlus size={30} /></ActionIcon>
    </div>
    <Center>
    
    
    <Table sx={{ maxWidth: 700}}>
      
      <thead>
        <tr>
          <th><Center>Grado y Grupo</Center></th>
          <th><Center>Asignado</Center></th>
          <th><Center>Acción</Center></th>
        </tr>
      </thead>
        
      <tbody>
        {groups && groups.map((group,index)=>(
          <tr key={index}>
            <td><Center>{group.group}</Center></td>
            <td><Center>{group.asignado == true ? "SI" : "NO"}</Center></td>
            <td><Center>
              <div className={styles.icons}>
            <ActionIcon color='indigo' onClick={() => {setOpened2(true);setEditGroup(group)}}>
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon color='red'onClick={()=>{setOpened3(true);setEliminar(group)}}>
              <IconTrash size={18} />
            </ActionIcon>
            </div>
            </Center></td>

          </tr>
        ))}
      </tbody>
    </Table>
    
    </Center>
    </ScrollArea>


    

    
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

    <Modal
      className={styles.modal}
      opened={opened}
      onClose={() => setOpened(false)}
      title="Crear Grupo"
      
    >
      <CreateGroup updateGroups={updateGroups}/>
    </Modal>



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