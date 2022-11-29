import React, { useState, useEffect } from "react";
import styles from '../styles/AppShell.module.css'
import { FaChalkboardTeacher, FaClipboardList, FaUser, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { signOut, getAuth } from 'firebase/auth'
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
  Skeleton,
  Loader, Flex, Box, Group, ScrollArea
} from "@mantine/core";
import {
  IconCheckupList,
  IconSearch,
  IconUsers,
  IconClipboardList,
  IconUser,
} from "@tabler/icons";
import Link from "next/link";
import { use } from "react";
import { NavLinkCustom } from "./NavLinkCustom";
import { decodeId } from "../utils/formatString";

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



const AppShellComponent = ({ children }) => {

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [rol, setRol] = useState({});
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const getRol = async () => {
      setLoader(true)

      const firestore = getFirestore(firebaseApp);
      const docuRef = doc(firestore, `Users/${auth.currentUser.uid}`);
      const docSnap = await getDoc(docuRef);

      setRol({
        role: docSnap.data().role,
        name: docSnap.data().name,
        group: docSnap.data().group
      });
      setLoader(false)
    }
    getRol()
  }, [])

  //console.log(rol)

  if (loader) {
    return null
  }

  return (
    <AppShell
      padding={0}
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

        <Navbar className={styles.nav__bar} p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 150, lg: 125 }} >

          <Center>
            <Stack>
              {
                rol.role === 'alumno' ? (
                  <NavLinkCustom Icon={FaClipboardList} href={'posts'} label={'Publicaciones'} />
                ) : rol.role === 'profesor' ? (
                  <>
                    <NavLinkCustom Icon={FaClipboardList} href={'posts'} label={'Publicaciones'} />
                    <NavLinkCustom Icon={FaUser} href={'students'} label={'Alumnos'} />
                  </>

                ) : rol.role === 'admin' ? (
                  <>
                    <NavLinkCustom Icon={FaClipboardList} href={'posts'} label={'Publicaciones'} />
                    <NavLinkCustom Icon={FaChalkboardTeacher} href={'groups'} label={'Grupos'} />
                    <NavLinkCustom Icon={FaUsers} href={'teachers'} label={'Personal'} />
                  </>
                ) : null
              }
              <div className={styles.nav__links}>
                <a onClick={signOutUser}>
                  <FaSignOutAlt color="white" size="3em" />

                  <Text className={styles.nav__text}>Salir</Text>

                </a>
              </div>




            </Stack>
          </Center>
        </Navbar>

      }


    >
      <Box className={styles.header__main} height={60} p="md" pl={60}>
        <div style={{ height: "100%" }} >
          
          <div className={styles.user__container}>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
            <Image className={styles.header__image} alt=''  width={180} src="/assets/img/aidalogo.png"></Image>
            <Group className={styles.user__info}>
              <Text>{rol.name}</Text>
              <Text>{decodeId(rol.group)}</Text>
            </Group>
          </div>



        </div>
      </Box>
      <ScrollArea>
        {children}
        </ScrollArea>
      
    </AppShell>
  );
};

export default AppShellComponent;