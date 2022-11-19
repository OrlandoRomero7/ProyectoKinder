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
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
//import { auth } from "../firebaseConfig";
import firebaseApp from "../firebaseConfig";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAllGroups } from '../firebase/getDataDB';

const auth = getAuth(firebaseApp);

const CreateTeacher = ({updateUsers}) => {
  const firestore = getFirestore(firebaseApp);
  const [messageError, setMessageError] = useState("");

  const [groups, setGroups] = useState([]);

  
  const form = useForm({
    initialValues: {
      name: "",
      role: "",
      group: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
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
    
  }, 
  
  });

   function updateGroups() {
    getAllGroups().then((groups) => {
      setGroups(groups);
    });
  }
  //console.log(groups)
  
/*   useEffect(() => {
    updateGroups();
  }, []);   
 */
  //console.log(groups)
  const registerUser = async () => {
    try {
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        form.values.email,
        form.values.password
      ).then((usuarioFirebase) => {
        return usuarioFirebase;
      }); 
     // console.log(infoUser.user.uid);
      const docuRef = doc(firestore, `Users/${infoUsuario.user.uid}`);
      form.values.group === ""
        ? setDoc(docuRef, {
            name: form.values.name,
            role: form.values.role,
            email: form.values.email,
          })
        : setDoc(docuRef, {
            name: form.values.name,
            role: form.values.role,
            email: form.values.email,
            group: form.values.group,
          });
          updateUsers()
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
      <TextInput autosize={true} label="Nombre: " {...form.getInputProps("name")} />
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
            return { value: group.grade+group.group, label: group.grade + "-" + group.group};
          })}
          
          {...form.getInputProps("group")}
          //data={groups.map((group) => {
            //return { value: group.uid, label: group.grade + " " + group.group};
          //})}
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
