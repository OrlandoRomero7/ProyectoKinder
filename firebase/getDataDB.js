import React from 'react'
import firebaseApp from '../firebaseConfig'
import { getFirestore,collection, getDocs } from 'firebase/firestore'

const db = getFirestore(firebaseApp);

export async function getAllUsers() {
  var i = 0;
  const users = [];
  const collectionRef = collection(db, "Users");
  const snapshot = await getDocs(collectionRef);
  snapshot.forEach((doc) => {
    users.push(doc.data());
    users[i]['uid']=doc.id;
    i++
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
  //console.log(groups)
  
  return groups;
}

export async function getAllPosts() {
  var i = 0;
  const posts = [];
  const collectionRef = collection(db, "Posts");
  const snapshot = await getDocs(collectionRef);
  snapshot.forEach((doc) => {
    posts.push(doc.data());
    posts[i]['uid']=doc.id;
    i++
    
  });
  //console.log(groups)
  
  return posts;
}

