import React, { useState } from "react";
import styles from '../styles/AppShell.module.css'
import { FaChalkboardTeacher, FaClipboardList, FaUser, FaUsers, FaSignOutAlt} from 'react-icons/fa';
import { signOut,getAuth } from 'firebase/auth'
//import { auth } from '../firebaseConfig';
import firebaseApp from "../firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";


import {
  AppShell,
  Navbar,
  MediaQuery,
  useMantineTheme,
  Text,
  Header,
  Burger,
  NavLink,
  Center,
  Stack,
  ThemeIcon,
  Image,
} from "@mantine/core";
import {
  IconCheckupList,
  IconSearch,
  IconUsers,
  IconClipboardList,
  IconUser,
} from "@tabler/icons";
import Link from "next/link";

const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);



const signOutUser = async () => {  
  return signOut(auth).then(() => { 
      return {
          suscess: true
      }
    }).catch((error) => { 
      return {
        error
      }
    })

} 




/* const  mostrar = async () => {

  const [datos, setDatos] = useState('');


  

   const firestore = getFirestore(firebaseApp);
  const docuRef = doc(firestore, `Users/${auth.currentUser.uid}`);
  const docSnap = await getDoc(docuRef);

  
  

 if (docSnap.exists()) {
    setDatos(docSnap.data().role)
    console.log(datos)
    //return datos
    //setDatos(docSnap.data());
    //console.log("Document data:", docSnap.data().role);
  } else {
    // doc.data() will be undefined in this case
    //console.log("No such document!");
  }  
 

}
   */


const AppShellComponent = ({ children }) => {

  /* const [datos, setDatos] = useState('');

  const  mostrar = async () => {
    const docuRef = doc(firestore, `Users/${auth.currentUser.uid}`);
    const docSnap = await getDoc(docuRef);
    if (docSnap.exists()) {
      setDatos(docSnap.data().role)
      //console.log(datos)
      //setDatos(docSnap.data());
      //console.log("Document data:", datos);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }  
  } */


  
  //console.log(datos)

  

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell 
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        
        <Navbar className={styles.nav__bar} p="md"  hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 150, lg: 125 }} >
          
          <Center>
            <Stack>
              <Link href='posts'>
              <div className={styles.nav__links}>
              <FaClipboardList color="white" size="3em"/>
              <Text className={styles.nav__text}>Publicaciones</Text>
              </div>
              </Link>

              <Link href="students">
              <div className={styles.nav__links}>
              <FaUser color="white" size="3em"/>
              <Text className={styles.nav__text}>Alumnos</Text>
              </div>
              </Link>
              

              <Link href="groups">
              <div className={styles.nav__links}>
              <FaChalkboardTeacher color="white" size="3em"/>
              <Text className={styles.nav__text}>Grupos</Text>
              </div>
              </Link>

              <Link href="teachers">
              <div className={styles.nav__links}>
              <FaUsers color="white" size="3em"/>
              <Text className={styles.nav__text}>Personal</Text>
              </div>
              </Link>
              <div className={styles.nav__links}>
              <a onClick={signOutUser}>
              <FaSignOutAlt color="white" size="3em"/>
              
              <Text className={styles.nav__text}>Salir</Text>
              
              </a>
              </div>
              
                

              
          </Stack>
          </Center>
        </Navbar>
        
      }
      header={
        <Header className={styles.header__main}height={80} p="md" pl={60}>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Image width={180}src="/assets/img/aidalogo.png"></Image>
           
            

            
          </div>
        </Header>
      }
    >
      <Text>{children}</Text>
    </AppShell>
  );
};

export default AppShellComponent;
