import React,{useState} from 'react'
import { Textarea, Button, Center } from '@mantine/core';
import { useForm } from "@mantine/form";
import styles from '../styles/Teachers.module.css'
import { DatePicker } from '@mantine/dates';
import { editPostDB } from '../firebase/setDataDB';
import { Fecha } from '../helpers/index'

const PostEdit = ({updatePosts,editPost}) => {

  /* const [postState, setPostState] = useState({
    ...editPost,
  }); */

  function addPostModal(){
    const title = form.values.title
    const subject = form.values.subject
    const content = form.values.content
    const date = form.values.date
    const uid = editPost.uid
    const dataPost = {title,subject,content,date,uid};
    editPostDB(dataPost)
    console.log(dataPost)
    updatePosts()

  }
  const form = useForm({
    initialValues: {
      title: editPost.title ,
      subject: editPost.subject,
      content: editPost.content,
      date: Fecha(editPost.date.seconds),
    },
    validate:{
      
    },

    
  });
  
  return (
    <form onSubmit={form.onSubmit(addPostModal)}>
    <Textarea label="Título: " {...form.getInputProps(`title`)}/>
    <Textarea label="Asunto: " {...form.getInputProps(`subject`)}/>
    <Textarea label="Contenido: " {...form.getInputProps(`content`)}/>
    <DatePicker placeholder=""{...form.getInputProps(`date`)} />
    <Center pt={15}>
        <Button className={styles.post__button} type="submit"> Publicar </Button>
    </Center>
    
    </form>
  )
}

export default PostEdit