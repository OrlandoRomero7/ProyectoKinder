import React from 'react'
import { Textarea, Button, Center } from '@mantine/core';
import { useForm } from "@mantine/form";
import styles from '../styles/Teachers.module.css'
import { DatePicker } from '@mantine/dates';
import { addPost } from '../firebase/setDataDB';
import 'dayjs/locale/es';



const CreatePost = ({updatePosts,editPost}) => {

  var value = new Date();

  function addPostModal(){
    const title = form.values.title
    const subject = form.values.subject
    const content = form.values.content
    const date = form.values.date

    const dataPost = {title,subject,content,date};
    addPost(dataPost)
    updatePosts()

  }
 
  const form = useForm({
    initialValues: {
      title: "",
      subject: "",
      content: "",
      date: []
    },
    validate:{
      
    },

    
  });
  return (
    
    <form onSubmit={form.onSubmit(addPostModal)}>
    <Textarea required label="Título: " {...form.getInputProps("title")}/>
    <Textarea label="Asunto: "{...form.getInputProps("subject")}minRows={2}/>
    <Textarea label="Contenido: "{...form.getInputProps("content")} minRows={4}
        maxRows={4}/>
    <DatePicker locale="es" inputFormat={"DD-MMM-YYYY"} defaultDate={value}
                placeholder="" label="Fecha Entrega"  {...form.getInputProps("date")}/>
    <Center pt={15}>
        <Button className={styles.post__button} type="submit"> Publicar </Button>
    </Center>
    
    </form>
  )
}

export default CreatePost