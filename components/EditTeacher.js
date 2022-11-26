import React,{useState,useEffect} from "react";
import {
  Button,
  Center,
  Select,
  TextInput,
  Paper,
  Text,
} from "@mantine/core";
import styles from "../styles/Teachers.module.css";
import { useForm } from "@mantine/form";
import { getFirestore, doc, collection, setDoc,updateDoc } from "firebase/firestore";

import { auth2, db } from "../firebaseConfig";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAllGroupsNoAsignados, assignGroupTrue } from '../firebase/getDataDB';


const EditTeacher = ({updateUsers, teacherToEdit}) => {
  const [messageError, setMessageError] = useState("");

  const [groups, setGroups] = useState([]);

  
  const form = useForm({
    initialValues: {
      name: teacherToEdit.name,
      role: teacherToEdit.role,
      group:teacherToEdit.group,
      email:teacherToEdit.email,
      password: "",
      confirmPassword: "",
    },

    /* validate: {
      name: (value) =>
        value.length===0
          ? "Escriba un nombre"
          : null,
      role: (value) => value.length==0? "Eliga una opción":null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Esto no es un correo",
      password: (value) =>
        value.length < 6
          ? "La contraseñas deben de tener como minimo 6 caracteres"
          : null,
      confirmPassword: (value) =>
        value.length < 6
          ? "La contraseñas deben de tener como minimo 6 caracteres"
          : null,
      confirmPassword: (value, values) =>
        value !== values.passwordRegistrar
          ? "Las contraseñas no coinciden"
          : null,
    
  },  */
  
  });

   function updateGroups() {
    getAllGroupsNoAsignados().then((groups) => {
      setGroups(groups);
    });
  }
  //console.log(groups)
  
  useEffect(() => {
    updateGroups();
  }, []);   
  
  //console.log(groups)
  const editUser = async () => {
    /* try {
      await createUserWithEmailAndPassword(
        auth2,
        form.values.email,
        form.values.password
      ).then(async (u) => { */
      form.values.group===null ? (
        await updateDoc(doc(db, `Users/${teacherToEdit.uid}`), {
          name: form.values.name,
          role: form.values.role,
          email: form.values.email,
          //group: form.values.group,
          //password: form.values.password
        })
    
       ) : (
        await updateDoc(doc(db, `Users/${teacherToEdit.uid}`), {
          name: form.values.name,
          role: form.values.role,
          email: form.values.email,
          group: form.values.group,
          //password: form.values.password
        })
    
       )
       updateUsers();
        
      /* })
    } catch (error) {
      if (
        error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."
      ) {
        setMessageError("Este usuario ya esta registrado.");
      }
    } */
  };

  return (
    <form onSubmit={form.onSubmit(editUser)}>
      <TextInput autosize label="Nombre: " {...form.getInputProps("name")} />
      <Select
        label="Tipo de Usuario"
        {...form.getInputProps("role")}
        data={[
          { value: "admin", label: "admin" },
          { value: "profesor", label: "profesor" },
        ]}
      />
      {form.values.role === "profesor" && (
        <Select
          onClick={()=>updateGroups()}
          label="Asignar Grupo"
          data={groups.map((group) => {
            return { value: group.uid, label: group.group};
          })}
          
          {...form.getInputProps("group")}
          //data={groups.map((group) => {
            //return { value: group.uid, label: group.grade + " " + group.group};
          //})}
        />
        
      )}

      <TextInput autosize disabled label="Correo: " {...form.getInputProps("email")} />
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
      <TextInput autosize label="Confirmar contraseña: " /> */}
      <Center pt={15}>
        <Button className={styles.post__button} type="submit">
          {" "}
          Registrar{" "}
        </Button>
      </Center>
    </form>
  );
};

export default EditTeacher;