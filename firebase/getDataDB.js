import React from 'react'
import firebaseApp from '../firebaseConfig'
import { getFirestore,collection, getDocs } from 'firebase/firestore'

const db = getFirestore(firebaseApp);

export default async function getAllUsers() {
  const users = [];
  const collectionRef = collection(db, "Users");
  const snapshot = await getDocs(collectionRef);
  snapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
}
