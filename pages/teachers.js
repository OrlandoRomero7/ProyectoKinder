import React,{useEffect} from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Teachers.module.css'
import { IconPlus } from '@tabler/icons';
import { ActionIcon, Button, Modal, Text,Table } from '@mantine/core';
import { useState } from 'react';
import CreateTeacher from '../components/CreateTeacher';
import { doc, getDoc, getFirestore,deleteDoc,collection } from "firebase/firestore";
import { getAllUsers, getNombreGrupo, getAllGroups } from '../firebase/getDataDB';
import {deleteTeacher} from '../firebase/setDataDB';

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

      
  
      <Table>
      <thead>
        <tr>
          <th>Numero</th>
          <th>Nombre</th>
          <th>Rol</th>
          <th>Correo</th>
          <th>Grupo</th>
          <th>Acciones</th>
        </tr>
      </thead>
        
      <tbody>
        
        {users && users.map((user,index)=>(

          
            
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>{user.email}</td>
            <td>{user.group==""? "N/A" : decodeId(user.group)}</td>
            <td>
              <Button onClick={() => {setOpened2(true);setTeacherToEdit(user)}}>Editar</Button>
              <Button onClick={()=>{deleteTeacher(user).then(()=>updateUsers())}}>Eliminar</Button>
            </td>

          </tr>
        ))}
      </tbody>
    </Table>
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
      

      
      
      


      
    </Layout>
    
  )
}

export default Teachers