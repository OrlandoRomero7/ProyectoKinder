import React from 'react'
import firebaseApp from '../firebaseConfig'
import { getFirestore,collection, getDocs } from 'firebase/firestore'

const db = getFirestore(firebaseApp);

export async function getAllUsers() {
  const users = [];
  const collectionRef = collection(db, "Users");
  const snapshot = await getDocs(collectionRef);
  snapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
}


export async function getAllGroups() {
  var i = 0;
  const groups = [];
  const collectionRef = collection(db, "Groups");
  const snapshot = await getDocs(collectionRef);
  snapshot.forEach((doc) => {
    groups.push(doc.data());
    groups[i]['uid']=doc.id;
    i++
    
  });
  console.log(groups)
  
  return groups;
}

