import React,{useEffect} from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Teachers.module.css'
import { IconPlus,IconEdit,IconTrash,IconUsers } from '@tabler/icons';
import { ActionIcon, Button, Modal, Text,Table,Center } from '@mantine/core';
import { useState } from 'react';
import CreateTeacher from '../components/CreateTeacher';
import { doc, getDoc, getFirestore,deleteDoc,collection } from "firebase/firestore";
import { getAllUsers, getNombreGrupo, getAllGroups } from '../firebase/getDataDB';
import {deleteTeacher} from '../firebase/setDataDB';
import { ThemeIcon } from '@mantine/core';

import { auth2, db } from "../firebaseConfig";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth";

import { deleteUserAuth } from '../firebase/setDataDB';
import EditTeacher from '../components/EditTeacher';
import { decodeId } from '../utils/formatString';


const Teachers = () => {
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [users, setUsers] = useState([]);
  const [teacherToEdit, setTeacherToEdit] = useState({});
  const [opened3, setOpened3] = useState(false);

 
  

  function updateUsers() {
    getAllUsers().then((users) => {
      setUsers(users);
    });
  }
  
  useEffect(() => {
    updateUsers();
  }, []);

  
  
  return (
    <Layout tituloPagina="Docentes">
      <div className={styles.new__post}>
        <div className={styles.group__title}>
        <ThemeIcon variant='transparent' color="dark"> <IconUsers /></ThemeIcon>
        <h2>Personal</h2>
        </div>

      <ActionIcon onClick={() => setOpened(true)} className={styles.post__icon}variant="filled"><IconPlus size={30} /></ActionIcon>

      </div>

      <Modal
        className={styles.modal}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Registro Personal"
      >
        <CreateTeacher updateUsers={updateUsers}/>
      </Modal>

      <br></br>

      
    <Center>
      <Table sx={{ maxWidth: 1200}}>
      <thead>
      
        <tr>
          <th><Center>Numero</Center></th>
          <th><Center>Nombre</Center></th>
          <th><Center>Rol</Center></th>
          <th><Center>Correo</Center></th>
          <th><Center>Grupo</Center></th>
          <th><Center>Acciones</Center></th>
        </tr>
      </thead>
        
      <tbody>
        
        {users && users.map((user,index)=>(

          
          <tr key={index}>
            <td><Center>{index + 1}</Center></td>
            <td><Center>{user.name}</Center></td>
            <td><Center>{user.role}</Center></td>
            <td><Center>{user.email}</Center></td>
            <td><Center>{user.group==""? "N/A" : decodeId(user.group)}</Center></td>
            <td>
              <Center>
              <div className={styles.icons}>
            <ActionIcon color='indigo' onClick={() => {setOpened2(true);setTeacherToEdit(user)}}>
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon color='red'onClick={()=>{setOpened3(true)}}>
              <IconTrash size={18} />
            </ActionIcon>
            </div>
            </Center>
            </td>
            

          </tr>
        ))}
      </tbody>
    </Table>
    </Center>

    {teacherToEdit && (
      <Modal
      className={styles.modal}
      opened={opened2}
      onClose={() => setOpened2(false)}
      title="Editar Personal"
    >
      <EditTeacher updateUsers={updateUsers} teacherToEdit={{...teacherToEdit}}/>
    </Modal>

    )}
      
      <Modal
        opened={opened3}
        onClose={() => setOpened3(false)}
        title={<Text size='lg'>Seguro que desea eliminar el grupo?</Text>}
      >
        <div className={styles.modal__confirmation}>
        <Button onClick={() => setOpened3(false)} color='red'>
          Cancelar
        </Button>
        <Button onClick={()=>deleteTeacher(users).then(()=>{updateUsers()}).then(()=> setOpened3(false))}>
          Confirmar
        </Button>
        </div>
    </Modal>

      
      
      


      
    </Layout>
    
  )
}

export default Teachers