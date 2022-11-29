import React, { useEffect } from "react";
import Layout from "../components/Layout";
import {
  Modal,
  Button,
  Menu,
  ActionIcon,
  Text,
  Grid,
  Center,
  Stack,
  Container,
  Group,
  Badge,
} from "@mantine/core";
import {
  IconAdjustments,
  IconUsers,
  IconTrash,
  IconEdit,
  IconDots,
  IconClipboard,
  IconClipboardData,
  IconClipboardList,
} from "@tabler/icons";
import { ThemeIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
import CreatePost from "../components/CreatePost";
import { getAllPosts, getAllPostsGeneral } from "../firebase/getDataDB";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Fecha } from "../helpers/index";
import { deletePost } from "../firebase/setDataDB";
import PostEdit from "../components/PostEdit";
import styles from "../styles/Post.module.css";
import "dayjs/locale/es";
import { decodeId } from "../utils/formatString";
const Posts = () => {
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState({});
  const [opened3, setOpened3] = useState(false);

  const [rol, setRol] = useState({});

  useEffect(() => {
    const getRol = async () => {
      const docuRef = doc(db, `Users/${auth.currentUser.uid}`);
      const docSnap = await getDoc(docuRef);

      setRol({
        role: docSnap.data().role,
        name: docSnap.data().name,
        group: docSnap.data().group,
      });

      return docSnap.data();
    };
    getRol().then((roles) => {
      if (roles.role === "admin") {
        getAllPostsGeneral().then((posts) => {
          setPosts(posts);
        });
      } else {
        getAllPosts(decodeId(roles.group)).then((posts) => {
          setPosts(posts);
        });
      }
    });
  }, []);

  function compare_date(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }

  const closeModal = () => {
    setOpened(false);
    setOpened2(false);
  };

  function updatePosts() {
    if (rol.role === "admin") {
      getAllPostsGeneral().then((posts) => {
        setPosts(posts);
      });
    } else {
      getAllPosts(decodeId(rol.group)).then((posts) => {
        setPosts(posts);
      });
    }
    /* getAllPosts(decodeId(rol.group)).then((posts) => {
      
      setPosts(posts);
    }); */
  }

  return (
    <Layout tituloPagina="Publicaciones">
      <div className={styles.post_center}>
        <div className={styles.new__post}>
          <div className={styles.group__title}>
            <ThemeIcon variant="transparent" color="dark">
              {" "}
              <IconClipboardList />
            </ThemeIcon>
            <h2>Publicaciones</h2>
          </div>
          {rol.role != "alumno" && (
            <ActionIcon
              onClick={() => setOpened(true)}
              className={styles.post__icon}
              variant="filled"
            >
              <IconPlus size={30} />
            </ActionIcon>
          )}
        </div>

        <Modal
          className={styles.modal}
          opened={opened}
          onClose={() => setOpened(false)}
          title="Agregar Publicación"
        >
          <CreatePost
            updatePosts={updatePosts}
            teacher_group={rol}
            closeModal={closeModal}
          />
        </Modal>

        {editPost && (
          <Modal
            className={styles.modal}
            opened={opened2}
            onClose={() => setOpened2(false)}
            title="Editar Post"
          >
            <PostEdit
              updatePosts={updatePosts}
              editPost={{ ...editPost }}
              closeModal={closeModal}
            />
          </Modal>
        )}

        {posts &&
          posts.sort(compare_date).map((post, index) => (
            <Grid
              mx="auto"
              className={styles.post__container}
              my="xs"
              key={index}
            >
              <Grid.Col className={styles.post__group} xs={2}>
                <div className={styles.post__group}>
                  <h1>{post.group === "admin" ? "Dir." : post.group}</h1>
                </div>
              </Grid.Col>

              <Grid.Col pr={5} xs={9.7} className={styles.post__content}>
                <div className={styles.post__title}>
                  <h2>{post.title}</h2>
                  <p>
                    <Badge radius="md" color="teal">
                      {" "}
                      {Fecha(post.date.seconds)}
                    </Badge>
                  </p>
                </div>

                <p className={styles.post__subtitle}>{post.subject}</p>
                <p className={styles.post__text}>{post.content}</p>

                {rol.role != "alumno" && (
                  <Menu
                    className={styles.post__actions}
                    shadow="md"
                    width={200}
                  >
                    <Menu.Target>
                      <ActionIcon>
                        <IconDots
                          className={styles.postActions__icon}
                          size={18}
                        />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>Editar</Menu.Label>
                      <Menu.Item
                        onClick={() => {
                          setEditPost(post);
                          setOpened2(true);
                        }}
                        icon={<IconEdit size={14} />}
                      >
                        Editar
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          setEditPost(post);
                          setOpened3(true);
                        }}
                        color="red"
                        icon={<IconTrash size={14} />}
                      >
                        Eliminar
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                )}
              </Grid.Col>
            </Grid>
          ))}

        <Modal
          opened={opened3}
          onClose={() => setOpened3(false)}
          title={
            <Text size="lg">Seguro que desea eliminar la publicacion?</Text>
          }
        >
          <div className={styles.modal__confirmation}>
            <Button onClick={() => setOpened3(false)} color="red">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                deletePost(editPost).then(() => {
                  setOpened3(false);
                  updatePosts();
                });
              }}
            >
              Confirmar
            </Button>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Posts;
