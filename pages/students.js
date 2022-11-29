import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout'
//import styles from '../styles/Teachers.module.css'
import { ActionIcon, Modal,Table,Button,Text} from '@mantine/core';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
import CreateStudent from '../components/CreateStudent';
import { getAllStudents} from '../firebase/getDataDB';
import { deleteStudent } from '../firebase/setDataDB';
import styles from '../styles/Groups.module.css'
import StudentEdit from '../components/StudentEdit';
import { doc, getDoc, getFirestore,deleteDoc,collection } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";


const Students = () => {

  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState({});
  const [eliminar, setEliminar] = useState({});

  const [rol, setRol] = useState({});
  
  useEffect(() => {
    const  getRol = async () => {

      const docuRef = doc(db, `Users/${auth.currentUser.uid}`);
      const docSnap = await getDoc(docuRef);

      setRol({
          role : docSnap.data().role,
          name : docSnap.data().name,
          group: docSnap.data().group
      });
      
    }
    getRol()
  }, [])

  //console.log(rol)

  function updateStudents() {
    getAllStudents().then((students) => {
      setStudents(students);
    });
  }
  useEffect(() => {
    updateStudents();
  }, []);


  return (
    <Layout tituloPagina="Alumnos">
      <div className={styles.new__post}>
        <ActionIcon onClick={() => setOpened(true)} className={styles.post__icon}variant="filled"><IconPlus size={30} /></ActionIcon>
      </div>


      <Modal
        className={styles.modal}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Registro Alumnos"
      >
        <CreateStudent updateStudents={updateStudents} teacher={rol}/>
      </Modal>
      <Table>
      <thead>
        <tr>
          <th>Numero</th>
          <th>Nombre</th>
          <th>Grupo</th>
          <th>Nombre del Padre</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
        
      <tbody>
        {students && students.map((student,index)=>(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{student.name}</td>
            <td>{student.group}</td>
            <td>{student.parentName}</td>
            <td>{student.email}</td>
            <td>
            <div className={styles.icons}>
            <ActionIcon color='indigo' onClick={() => {setOpened2(true);setEditStudent(student)}}>
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon color='red'onClick={()=>{setOpened3(true);setEliminar(student)}}>
              <IconTrash size={18} />
            </ActionIcon>
            </div>
            </td>

          </tr>
        ))}
      </tbody>
    </Table>

    {editStudent && (
      <Modal
      className={styles.modal}
      opened={opened2}
      onClose={() => setOpened2(false)}
      title="Editar Alumno"
      
    >
      <StudentEdit updateStudents={updateStudents} editStudent={{...editStudent}}/>
    </Modal>

    )}

    <Modal
        opened={opened3}
        onClose={() => setOpened3(false)}
        title={<Text size='lg'>Seguro que desea eliminar el alumno?</Text>}
      >
        <div className={styles.modal__confirmation}>
        <Button onClick={() => setOpened3(false)} color='red'>
          Cancelar
        </Button>
        <Button onClick={()=>deleteStudent(eliminar).then(()=>{updateStudents()}).then(()=> setOpened3(false))}>
          Confirmar
        </Button>
        </div>
      </Modal>

    </Layout>
    
  )
}
export default Students