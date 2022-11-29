import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { Modal, Button, Menu, ActionIcon, Text, Grid, Center, Stack, Container, Group, Badge } from '@mantine/core';
import { IconAdjustments,IconUsers, IconTrash, IconEdit, IconDots, IconClipboard, IconClipboardData, IconClipboardList } from '@tabler/icons';
import { ThemeIcon } from '@mantine/core';

import { IconPlus } from '@tabler/icons';
import { useState } from 'react';
import CreatePost from '../components/CreatePost';
import { getAllPosts } from '../firebase/getDataDB';
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { Fecha } from '../helpers/index'
import { deletePost } from '../firebase/setDataDB';
import PostEdit from '../components/PostEdit';
import styles from '../styles/Post.module.css'
import 'dayjs/locale/es';
const Posts = () => {
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState({});
  const [opened3, setOpened3] = useState(false);



  function updatePosts() {
    getAllPosts().then((posts) => {
      setPosts(posts);
    });

  }
  //console.log(new Date(posts[1].date.seconds*1000))


  useEffect(() => {
    updatePosts();

  }, []);

  return (
    <Layout tituloPagina="Publicaciones">

      <div className={styles.new__post}>
        <div className={styles.group__title}>
          <ThemeIcon variant='transparent' color="dark"> <IconClipboardList /></ThemeIcon>
          <h2>Publicacionessss</h2>
        </div>
        <ActionIcon onClick={() => setOpened(true)} className={styles.post__icon} variant="filled"><IconPlus size={30} /></ActionIcon>
      </div>


      <Modal
        className={styles.modal}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Agregar Publicación"
      >
        <CreatePost updatePosts={updatePosts} />
      </Modal>


      {editPost && (
        <Modal
          className={styles.modal}
          opened={opened2}
          onClose={() => setOpened2(false)}
          title="Editar Post"

        >
          <PostEdit updatePosts={updatePosts} editPost={{ ...editPost }} />
        </Modal>

      )}

      {posts && posts.map((post, index) => (
        
          <Grid sx={{ maxWidth: 900}} className={styles.post__container} my="xs" key={index} >
            <Grid.Col className={styles.post__group} xs={2}>
              <div className={styles.post__group}>
                <h1 >1A</h1>
              </div>
            </Grid.Col>
             
             <Grid.Col pr={5} xs={9.7} className={styles.post__content}>
              <div className={styles.post__title}>
                <h2>{post.title}</h2>
                <p>
                  <Badge radius="md" color="teal"> {Fecha(post.date.seconds)}</Badge>
                 </p>
              </div>
              
              <p className={styles.post__subtitle}>{post.subject}</p>
              <p className={styles.post__text}>{post.content}</p>
              <Menu className={styles.post__actions} shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon>
                    <IconDots className={styles.postActions__icon} size={18} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Editar</Menu.Label>
                    <Menu.Item onClick={() => { setEditPost(post); setOpened2(true) }} icon={<IconEdit size={14} />}>Editar</Menu.Item>
                    <Menu.Item onClick={() => { setEditPost(post); setOpened3(true) }} color="red" icon={<IconTrash size={14} />}>Eliminar</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Grid.Col >
          </Grid>
      ))}
      
      <Modal
        opened={opened3}
        onClose={() => setOpened3(false)}
        title={<Text size='lg'>Seguro que desea eliminar la publicacion?</Text>}
      >
        <div className={styles.modal__confirmation}>
          <Button onClick={() => setOpened3(false)} color='red'>
            Cancelar
          </Button>
          <Button onClick={() => {
            deletePost(editPost)
              .then(updatePosts())
              .then(() => setOpened3(false))
          }}>
            Confirmar
          </Button>
        </div>
      </Modal>


    </Layout>
  )
}

export default Posts