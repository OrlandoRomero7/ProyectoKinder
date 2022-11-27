import React,{useState,useEffect} from "react";
import { Textarea, Button, Center, Select, TextInput } from "@mantine/core";
import styles from "../styles/Teachers.module.css";
import { useForm } from "@mantine/form";
import { auth2, db } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import { getAllGroups } from '../firebase/getDataDB';



const CreateStudent = ({updateStudents}) => {
  const [messageError, setMessageError] = useState("");
  const [groups, setGroups] = useState([]);

  function updateGroups() {
    getAllGroups().then((groups) => {
      setGroups(groups);
    });
  }

  const form = useForm({
    initialValues: {
      name: "",
      role: "alumno",
      parentName: "",
      group: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const registerStudent = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth2,
        form.values.email,
        form.values.password
      ).then(async (u) => {
        await setDoc(doc(db, `Users/${u.user.uid}`), {
          name: form.values.name,
          parentName: form.values.parentName,
          role: "alumno",
          email: form.values.email.toLocaleLowerCase(),
          group: form.values.group,
          password: form.values.password
        })
        updateStudents()
      })
    } catch (error) {
      if (
        error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."
      ) {
        setMessageError("Este usuario ya esta registrado.");
      }
    }
  };
  return (
    <form onSubmit={form.onSubmit(registerStudent)}>
      <TextInput
        autosize
        label="Nombre Alumno: "
        {...form.getInputProps("name")}
      />
       <Select
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
        {...form.getInputProps("email")}
      />
      {messageError != "" && (
        <Paper>
          <Text color="red">{messageError}</Text>
        </Paper>
      )}
      <TextInput
        autosize
        label="Contraseña: "
        {...form.getInputProps("password")}
      />
      <TextInput
        autosize
        label="Confirmar contraseña: "
        {...form.getInputProps("confirmPassword")}
      />
      <Center pt={15}>
        <Button className={styles.post__button} type="submit">
          Registrar
        </Button>
      </Center>
    </form>
  );
};

export default CreateStudent;
