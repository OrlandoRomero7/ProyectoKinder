import React from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Teachers.module.css'
import { IconPlus } from '@tabler/icons';
import { ActionIcon, Button, Modal, Text } from '@mantine/core';
import { useState } from 'react';
import CreateTeacher from '../components/CreateTeacher';
import { doc, getDoc, getFirestore } from "firebase/firestore";


import firebaseApp from "../firebaseConfig";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { async } from '@firebase/util';
const auth = getAuth(firebaseApp);






const  mostrar = async () => {
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

      <p>{auth.currentUser.uid}</p>

      <Button onClick={mostrar}>
        Presiname
      </Button>
      

      
      
      


      
    </Layout>
    
  )
}

export default Teachers