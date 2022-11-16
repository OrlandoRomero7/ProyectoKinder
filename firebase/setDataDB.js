import firebaseApp from '../firebaseConfig'
import { getFirestore,collection, getDocs,doc,setDoc,deleteDoc} from 'firebase/firestore'
import {  deleteUser,getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);

export async function addUser() {
    
    const collectionRef = collection(db, "Users");
    const docRef = doc(collectionRef);
    setDoc(docRef);
}


export async function addGroup(dataGroup) {
    
    const collectionRef = collection(db, "Groups");
    const docRef = doc(collectionRef);
    setDoc(docRef, dataGroup);
}


export async function deleteGroup(group) {
    
    const coleccionRef = collection(db, "Groups");
    const docuRef = doc(coleccionRef, group.uid);
    const removed = await deleteDoc(docuRef);
    return removed 
    
  }






export function deleteUserAuth(user){
    deleteUser(user.uid).then(() => {
        /* const coleccionRef = collection(db, "Users");
        const docuRef = doc(coleccionRef, user.uid);
        deleteDoc(docuRef);  */
        console.log("Usuario eliminado")
      }).catch((error) => {
        console.log(error)
      }); 
}


/* export async function deleteUserDB(user){
    const coleccionRef = collection(db, "Users");
    const docuRef = doc(coleccionRef, user.uid);
    const removed = await deleteDoc(docuRef);
    return removed 

} */




