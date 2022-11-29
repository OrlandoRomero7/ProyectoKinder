import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Image,
  Center,
  Paper,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { signInWithEmailAndPassword,getAuth } from "firebase/auth";
//import { auth } from "../firebaseConfig";
import { useRouter } from "next/router";
import firebaseApp from "../firebaseConfig";

const auth = getAuth(firebaseApp);

export const Login = () => {
  const [messageError, setMessageError] = useState("");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Esto no es un correo",
      password: (value) =>
        value.length < 6
          ? "La contraseñas tienen como minimo 6 caracteres"
          : null,
    },
  });

  const { push } = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        form.values.email.toLowerCase(),
        form.values.password
      );
      push("/posts");
    } catch (error) {
      if (error == "FirebaseError: Firebase: Error (auth/user-not-found).") {
        setMessageError("Este usuario no esta registrado");
      }
      if (error == "FirebaseError: Firebase: Error (auth/wrong-password).") {
        setMessageError("Contraseña incorrecta");
      }

      console.log(error);
    }
  };

  return (
    <Center>
      <div className={styles.login__container}>
        <div className={styles.image}>
          <Image
            width={300}
            className={styles.image}
            src="/assets/img/aidalogo.png"
          />
        </div>

        <form className={styles.inputs} onSubmit={form.onSubmit(login)}>
          <TextInput
            placeholder="Correo Electronico"
            {...form.getInputProps("email")}
          />

          <br></br>
          <PasswordInput
            placeholder="Contraseña"
            {...form.getInputProps("password")}
          />
          {messageError != "" && (
            <Paper>
              <Text size={14} color="red">{messageError}</Text>
            </Paper>
          )}

          <div className={styles.down}>
            <Button
              className={styles.login__button}
              //component="a"
              //href="/posts"
              type="submit"
              radius="md"
            >
              {" "}
              Iniciar Sesion{" "}
            </Button>
            <a className={styles.recover}> Recuperar Contraseña </a>
          </div>
        </form>
      </div>
    </Center>
  );
};
