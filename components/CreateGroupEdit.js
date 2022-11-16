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

const CreateGroupEdit = ({updateGroups,editGroup}) => {
  const firestore = getFirestore(firebaseApp);
  const [messageError, setMessageError] = useState("");

  

  const form = useForm({
    initialValues: {
      grade: "",
      group: "",
    },

    
  });

  function editGroupModal(){
    const grade = form.values.grade
    const group = form.values.group

    const dataGroup = {grade,group};
    addGroup(dataGroup)

    updateGroups()

  }


  return (
    <form onSubmit={form.onSubmit(editGroupModal)}>
      <Select
        label="Grado"
        {...form.getInputProps("grade")}
        defaultValue={editGroup.grade}
        data={[
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" }
          
        ]}
      />
        <Select
          label="Grupo"
          defaultValue={editGroup.group}
          {...form.getInputProps("group")}
          data={[
            { value: "A", label: "A" },
            { value: "B", label: "B" },
            { value: "C", label: "C" }
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

export default CreateGroupEdit;
