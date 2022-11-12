import React,{useState} from "react";
import {
  Textarea,
  Button,
  Center,
  Select,
  TextInput,
  PasswordInput,
  Paper,
  Text,
} from "@mantine/core";
import styles from "../styles/Teachers.module.css";
import { useForm } from "@mantine/form";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
//import { auth } from "../firebaseConfig";
import firebaseApp from "../firebaseConfig";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebaseApp);

const CreateTeacher = () => {
  const firestore = getFirestore(firebaseApp);
  const [messageError, setMessageError] = useState("");

  const form = useForm({
    initialValues: {
      name: "",
      role: "",
      group: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    /* validate: {
      name: (value) =>
        value.length===0
          ? "Escriba un nombre"
          : null,
          name: (value) =>
          value.length===0
            ? "Escriba un nombre"
            : null,
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
    
  }, */
  });
  const registerUser = async () => {
    try {
        await createUserWithEmailAndPassword(
        auth,
        form.values.email,
        form.values.password
      ).then((usuarioFirebase) => {
        return usuarioFirebase;
      }); 
     // console.log(infoUser.user.uid);
      const docuRef = doc(firestore, `Users/${form.values.email}`);
      form.values.group != ""
        ? setDoc(docuRef, {
            name: form.values.name,
            role: form.values.role,
            email: form.values.email,
            group: form.values.group,
          })
        : setDoc(docuRef, {
            name: form.values.name,
            role: form.values.role,
            email: form.values.email,
          });
    } catch (error) {
      if (
        error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."
      ) {
        setMessageError("Este usuario ya esta registrado.");
      }
    }
  };

  const handleRegister = () => {
    //console.log(form.values.name,form.values.group,form.values.email,form.values.password)
  };

  return (
    <form onSubmit={form.onSubmit(registerUser)}>
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
          label="Asignar Grupo"
          {...form.getInputProps("group")}
          data={[
            { value: "1a", label: "1A" },
            { value: "1b", label: "1B" },
            { value: "2a", label: "2A" },
            { value: "2c", label: "2C" },
          ]}
        />
      )}

      <TextInput autosize label="Correo: " {...form.getInputProps("email")} />
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
      <TextInput autosize label="Confirmar contraseña: " />
      <Center pt={15}>
        <Button className={styles.post__button} type="submit">
          {" "}
          Registrar{" "}
        </Button>
      </Center>
    </form>
  );
};

export default CreateTeacher;
