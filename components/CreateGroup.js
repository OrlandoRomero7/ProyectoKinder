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
const auth = getAuth(firebaseApp);

const CreateGroup = () => {
  const firestore = getFirestore(firebaseApp);
  const [messageError, setMessageError] = useState("");

  const form = useForm({
    initialValues: {
      grade: "",
      group: "",
    },

    
  });
  return (
    <form onSubmit={form.onSubmit()}>
      <Select
        label="Grado"
        {...form.getInputProps("grade")}
        data={[
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" }
          
        ]}
      />
        <Select
          label="Grupo"
          {...form.getInputProps("group")}
          data={[
            { value: "a", label: "A" },
            { value: "b", label: "B" },
            { value: "a", label: "C" }
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
