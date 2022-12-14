import React from "react";
import { Textarea, Button, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "../styles/Teachers.module.css";
import { DatePicker } from "@mantine/dates";
import { addPost } from "../firebase/setDataDB";
import "dayjs/locale/es";
import { decodeId } from "../utils/formatString";

const CreatePost = ({ updatePosts, editPost, teacher_group, closeModal }) => {
  var value = new Date();

  function addPostModal() {
    const title = form.values.title;
    const subject = form.values.subject;
    const content = form.values.content;
    const date = form.values.date;
    var group = "";
    teacher_group.role == "admin"
      ? (group = "admin")
      : (group = decodeId(teacher_group.group));
    const dataPost = { title, subject, content, date, group };
    addPost(dataPost).then(() => closeModal());
    updatePosts();
  }
  
  const form = useForm({
    initialValues: {
      title: "",
      subject: "",
      content: "",
      date: [],
    },
    validate: {
      title: (value) => (value.length === 0 ? "Escriba un titulo" : null),
      subject: (value) => (value.length === 0 ? "Escriba un asunto" : null),
      content: (value) => (value.length === 0 ? "Escriba el contenido" : null),
      date: (value) => (value.length === 0 ? "Elige una fecha" : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(addPostModal)}>
      <Textarea label="Título: " {...form.getInputProps("title")} />
      <Textarea
        label="Asunto: "
        {...form.getInputProps("subject")}
        minRows={2}
      />
      <Textarea
        label="Contenido: "
        {...form.getInputProps("content")}
        minRows={4}
        maxRows={4}
      />

      <DatePicker
        required
        locale="es"
        inputFormat={"DD/MM/YYYY"}
        defaultDate={value}
        placeholder=""
        label="Fecha Entrega"
        {...form.getInputProps("date")}
      />
      <Center pt={15}>
        <Button className={styles.post__button} type="submit">
          {" "}
          Publicar{" "}
        </Button>
      </Center>
    </form>
  );
};

export default CreatePost;
