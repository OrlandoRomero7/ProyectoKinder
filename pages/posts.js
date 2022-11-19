import React,{useEffect}from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Teachers.module.css'
import { ActionIcon, Modal,Card,Text,Button} from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useState } from 'react';
import CreatePost from '../components/CreatePost';
import { getAllPosts } from '../firebase/getDataDB';
import { getFirestore,collection, getDocs } from 'firebase/firestore'
import { Fecha } from '../helpers/index'
import { deletePost } from '../firebase/setDataDB';
import PostEdit from '../components/PostEdit';

const Posts = () => {
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState({});
  

  function updatePosts() {
    getAllPosts().then((posts) => {
      setPosts(posts);
    });
    
  }
  //console.log(new Date(posts[1].date.seconds*1000))
  console.log(posts)
  
  
  useEffect(() => {
    updatePosts();
  }, []);

  return (
    <Layout tituloPagina="Publicaciones">
      <div className={styles.new__post}>
        <ActionIcon onClick={() => setOpened(true)} className={styles.post__icon}variant="filled"><IconPlus size={30} /></ActionIcon>
      </div>


      <Modal
        className={styles.modal}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Agregar Publicación"
      >
        <CreatePost  updatePosts={updatePosts}/>
      </Modal>
      {editPost && (
      <Modal
      className={styles.modal}
      opened={opened2}
      onClose={() => setOpened2(false)}
      title="Editar Post"
      
    >
      <PostEdit updatePosts={updatePosts} editPost={{...editPost}}/>
    </Modal>

    )}

        <br></br>
        <br></br>
      
       {posts && posts.map((post,index)=>(
         
        
        <Card key={index}>
          <Text>{post.title}---{post.subject}----{post.content}---{Fecha(post.date.seconds)}</Text>
          <Button size='xs' onClick={()=>{setEditPost(post);setOpened2(true)}}>Editar</Button>
          <Button size='xs' onClick={()=>deletePost(post).then(updatePosts())}>Eliminar</Button>
        </Card>


        
      ))} 



    </Layout>
  )
}

export default Posts