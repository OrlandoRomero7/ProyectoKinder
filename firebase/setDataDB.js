
import { getFirestore,collection, getDocs,doc,setDoc,deleteDoc, updateDoc} from 'firebase/firestore'
import {  deleteUser,signInWithEmailAndPassword} from "firebase/auth";
import { auth2, db } from "../firebaseConfig";

////Personal
/* export async function addUser() {
    const collectionRef = collection(db, "Users");
    const docRef = doc(collectionRef);
    setDoc(docRef);
}
 */
export async function deleteTeacher(user) {
  await signInWithEmailAndPassword(
    auth2,
    user.email,
    user.password
  )
  const currentUser = auth2.currentUser
  const currentUid = currentUser.uid
  const currentGroup = user.group
  //var currentGroup = ""
  //user.role==admin? currentGroup="": currentGroup=user.group
  await deleteUser(currentUser).then(async () => {
    const coleccionRef = collection(db, "Users");
    const docuRef = doc(coleccionRef, currentUid);
    currentGroup==null ? await deleteDoc(docuRef) : await deleteDoc(docuRef).then(() => assignGroupFalse(currentGroup))

  })  
}


///Estudiantes

/* export async function addStudent(dataStudent) {
  const collectionRef = collection(db, "Students");
  const docRef = doc(collectionRef);
  setDoc(docRef, dataStudent);
} */

export async function editStudentDB(dataStudent) {
  const collectionRef = collection(db, "Users");
  const docRef = doc(collectionRef,dataStudent.uid);
  updateDoc(docRef, dataStudent);
}

export async function deleteStudent(student) {
  await signInWithEmailAndPassword(
    auth2,
    student.email,
    student.password
  )
  const currentUser = auth2.currentUser
  const currentUid = currentUser.uid
  await deleteUser(currentUser).then(async () => {
    const coleccionRef = collection(db, "Users");
    const docuRef = doc(coleccionRef, currentUid);
    await deleteDoc(docuRef);
  })
}

///Grupos
export async function addGroup(dataGroup, id) {
    const collectionRef = collection(db, "Groups");
    const docRef = doc(collectionRef, id);
    setDoc(docRef, dataGroup);
}

export async function editGroupDB(dataGroup) {
  const collectionRef = collection(db, "Groups");
  const docRef = doc(collectionRef,dataGroup.uid);
  updateDoc(docRef, dataGroup);
}

export async function deleteGroup(group) {
  const coleccionRef = collection(db, "Groups");
  const docuRef = doc(coleccionRef, group.uid);
  const removed = await deleteDoc(docuRef);
  return removed 
}
//asigancion de grupos
export async function assignGroupTrue(uidgroup) {
  const docuRef = doc(db, `Groups/${uidgroup}`);
  
 updateDoc(docuRef, {
    
    asignado: true,
  });
  
}
async function assignGroupFalse(uidgroup) {
  const docuRef = doc(db, `Groups/${uidgroup}`);
  
 updateDoc(docuRef, {
    
    asignado: false,
  });
  
}
export async function setCreateValueGroup(valor) {
  const docuRef = doc(db, `GruposEstaticos/${valor}`);
  
 updateDoc(docuRef, {
    
    creado: true,
  });
  
}


//Posts
export async function addPost(dataPost) {
  const collectionRef = collection(db, "Posts");
  const docRef = doc(collectionRef);
  setDoc(docRef, dataPost);
}

export async function editPostDB(dataPost) {
  const collectionRef = collection(db, "Posts");
  const docRef = doc(collectionRef,dataPost.uid);
  updateDoc(docRef, dataPost);
}

export async function deletePost(post) {
  const coleccionRef = collection(db, "Posts");
  const docuRef = doc(coleccionRef, post.uid);
  const removed = await deleteDoc(docuRef);
  return removed 
  
}


/* export function deleteUserAuth(user){
    deleteUser(user.uid).then(() => {
        const coleccionRef = collection(db, "Users");
        const docuRef = doc(coleccionRef, user.uid);
        deleteDoc(docuRef);  
        console.log("Usuario eliminado")
      }).catch((error) => {
        console.log(error)
      }); 
}
 */

/* export async function deleteUserDB(user){
    const coleccionRef = collection(db, "Users");
    const docuRef = doc(coleccionRef, user.uid);
    const removed = await deleteDoc(docuRef);
    return removed 

}  */



