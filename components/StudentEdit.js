import React,{useState,useEffect} from "react";
import { Textarea, Button, Center, Select, TextInput } from "@mantine/core";
import styles from "../styles/Teachers.module.css";
import { useForm } from "@mantine/form";
import { auth2, db } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, collection, setDoc, updateDoc } from "firebase/firestore";
import { getAllGroups } from '../firebase/getDataDB';


const StudentEdit = ({updateStudents,editStudent}) => {
  const [messageError, setMessageError] = useState("");
  const [groups, setGroups] = useState([]);

  function updateGroups() {
    getAllGroups().then((groups) => {
      setGroups(groups);
    });
  }

  const form = useForm({
    initialValues: {
      name: editStudent.name,
      role: "alumno",
      parentName: editStudent.parentName,
      group: editStudent.group,
      email: editStudent.email,
      password: "",
      confirmPassword: "",
    },
  });
  const registerStudent = async () => {
   /*  try {
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        form.values.email,
        form.values.password
      ).then((usuarioFirebase) => {
        return usuarioFirebase;
      }); */
      const docuRef = doc(db, `Students/${editStudent.uid}`);
      updateDoc(docuRef, {
        name: form.values.name,
        parentName: form.values.parentName,
        group: form.values.group,
        role: form.values.role,
        email: form.values.email,
      }).then( updateStudents());
     ;
    /* } catch (error) {
      if (
        error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."
      ) {
        setMessageError("Este usuario ya esta registrado.");
      }
    } */
  };
  return (
    <form onSubmit={form.onSubmit(registerStudent)}>
      <TextInput
        autosize
        label="Nombre Alumno: "
        {...form.getInputProps("name")}
      />
       <Select
          defaultValue={form.values.group}
          onClick={()=>updateGroups()}
          label="Asignar Grupo"
          data={groups.map((group) => {
            return { value: group.group, label: group.group};
          })}
          {...form.getInputProps("group")}
          //data={groups.map((group) => {
            //return { value: group.uid, label: group.grade + " " + group.group};
          //})}
        />
      <TextInput
        autosize
        label="Nombre Padre/Tutor: "
        {...form.getInputProps("parentName")}
      />
      <TextInput
        autosize
        label="Correo Institucional: "
        disabled
        defaultValue={form.values.email}
      />
      {messageError != "" && (
        <Paper>
          <Text color="red">{messageError}</Text>
        </Paper>
      )}
      {/* <TextInput
        autosize
        label="Contraseña: "
        {...form.getInputProps("password")}
      />
      <TextInput
        autosize
        label="Confirmar contraseña: "
        {...form.getInputProps("confirmPassword")}
      /> */}
      <Center pt={15}>
        <Button className={styles.post__button} type="submit">
          Editar
        </Button>
      </Center>
    </form>
  );
};

export default StudentEdit;
