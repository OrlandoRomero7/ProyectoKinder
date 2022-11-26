import React from 'react'
import firebaseApp from '../firebaseConfig'
import { getFirestore,collection, getDocs, doc, updateDoc, where, query } from 'firebase/firestore'

const db = getFirestore(firebaseApp);

//obtiene todos el personal ADMIN y DOCENTE
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



      

export async function getAllStudents() {
  var i = 0;
  const students= [];
  const collectionRef = collection(db, "Students");
  const snapshot = await getDocs(collectionRef);
  snapshot.forEach((doc) => {
    students.push(doc.data());
    students[i]['uid']=doc.id;
    i++
  });
  return students;
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

export async function getAllGroupsNoAsignados() {
  var i = 0;
  const groups = [];
  const q = query(collection(db, "Groups"), where("asignado", "!=", true));
  const snapshot = await getDocs(q);
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

