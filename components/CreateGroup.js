import React,{useState} from "react";
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
import { addGroup } from "../firebase/setDataDB";

const auth = getAuth(firebaseApp);

const CreateGroup = ({updateGroups}) => {
  const firestore = getFirestore(firebaseApp);
  const [messageError, setMessageError] = useState("");

  

  const form = useForm({
    initialValues: {
      group: "",
    },
    validate:{
      group: (value) => (value==""?'Elige una opcion' : null)
    }

    
  });

  function addGroupModal(){
    const group = form.values.group
    const asignado = false
    const dataGroup = {group, asignado}
    addGroup(dataGroup)

    updateGroups()

  }


  return (
    <form onSubmit={form.onSubmit(addGroupModal)}>
      <Select
        label="Grado y Grupo"
        {...form.getInputProps("group")}
        data={[
          { value: "1-A", label: "1-A" },
          { value: "1-B", label: "1-B" },
          { value: "1-C", label: "1-C" },
          { value: "2-A", label: "2-A" },
          { value: "2-B", label: "2-B" },
          { value: "2-C", label: "2-C" },
          { value: "3-A", label: "3-A" },
          { value: "3-B", label: "3-B" },
          { value: "3-C", label: "3-C" }
          
        ]}
      />
        

      
      <Center pt={15}>
        <Button className={styles.post__button} type="submit">
          {" "}
          Registrar{" "}
        </Button>
      </Center>
    </form>
  );  
};

export default CreateGroup;
