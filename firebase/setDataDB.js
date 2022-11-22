import firebaseApp from '../firebaseConfig'
import { getFirestore,collection, getDocs,doc,setDoc,deleteDoc} from 'firebase/firestore'
import {  deleteUser,getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);

export async function addUser() {
    
    const collectionRef = collection(db, "Users");
    const docRef = doc(collectionRef);
    setDoc(docRef);
}
export async function addStudent(dataStudent) {
    
  const collectionRef = collection(db, "Students");
  const docRef = doc(collectionRef);
  setDoc(docRef, dataStudent);
}
export async function editStudentDB(dataStudent) {
    
  const collectionRef = collection(db, "Students");
  const docRef = doc(collectionRef,dataPost.uid);
  setDoc(docRef, dataStudent);
}
export async function deleteStudent(student) {
    
  const coleccionRef = collection(db, "Students");
  const docuRef = doc(coleccionRef, student.uid);
  const removed = await deleteDoc(docuRef);
  return removed 
  
}

export async function addGroup(dataGroup) {
    
    const collectionRef = collection(db, "Groups");
    const docRef = doc(collectionRef);
    setDoc(docRef, dataGroup);
}
export async function editGroupDB(dataGroup) {
    
  const collectionRef = collection(db, "Groups");
  const docRef = doc(collectionRef,dataGroup.uid);
  setDoc(docRef, dataGroup);
}
export async function deleteGroup(group) {
    
  const coleccionRef = collection(db, "Groups");
  const docuRef = doc(coleccionRef, group.uid);
  const removed = await deleteDoc(docuRef);
  return removed 
  
}

export async function addPost(dataPost) {
    
  const collectionRef = collection(db, "Posts");
  const docRef = doc(collectionRef);
  setDoc(docRef, dataPost);
}
export async function editPostDB(dataPost) {
    
  const collectionRef = collection(db, "Posts");
  const docRef = doc(collectionRef,dataPost.uid);
  setDoc(docRef, dataPost);
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

export async function deleteUserDB(user){
    const coleccionRef = collection(db, "Users");
    const docuRef = doc(coleccionRef, user.uid);
    const removed = await deleteDoc(docuRef);
    return removed 

} 



