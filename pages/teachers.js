import React,{useEffect} from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Teachers.module.css'
import { IconPlus } from '@tabler/icons';
import { ActionIcon, Button, Modal, Text,Table } from '@mantine/core';
import { useState } from 'react';
import CreateTeacher from '../components/CreateTeacher';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAllUsers } from '../firebase/getDataDB';


import firebaseApp from "../firebaseConfig";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { async } from '@firebase/util';

import { deleteUserAuth } from '../firebase/setDataDB';

const auth = getAuth(firebaseApp);



/* const  mostrar = async () => {
  const firestore = getFirestore(firebaseApp);
  const docuRef = doc(firestore, `Users/${auth.currentUser.uid}`);
  const docSnap = await getDoc(docuRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }


}
 */


  

const Teachers = () => {
  const [opened, setOpened] = useState(false);
  const [users, setUsers] = useState([]);

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
            <td>{user.group==null? "N/A" : user.group}</td>
            <td>
              <Button>Editar</Button>
              <Button onClick={()=>updateUsers()}>Eliminar</Button>
            </td>

          </tr>
        ))}
      </tbody>
    </Table>
      

      
      
      


      
    </Layout>
    
  )
}

export default Teachers