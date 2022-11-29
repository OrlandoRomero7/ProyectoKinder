import React from "react";
import firebaseApp from "../firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  where,
  query,
  getDoc,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

//obtiene todos el personal ADMIN y DOCENTE
export async function getAllUsers() {
  var i = 0;
  const users = [];
  const q = query(collection(db, "Users"), where("role", "!=", "alumno"));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    users.push(doc.data());
    users[i]["uid"] = doc.id;
    i++;
  });

  return users.sort();
}

// export async function getAllStudents() {
//   var i = 0;
//   const students= [];
//   const collectionRef = collection(db, "Students"), ;
//   const snapshot = await getDocs(collectionRef);
//   snapshot.forEach((doc) => {
//     students.push(doc.data());
//     students[i]['uid']=doc.id;
//     i++
//   });
//   return students;
// }

export async function getAllStudents(id) {
  console.log(id);
  var i = 0;
  const students = [];
  const q = query(
    collection(db, "Users"),
    where("role", "==", "alumno"),
    where("group", "==", id)
  );
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    students.push(doc.data());
    students[i]["uid"] = doc.id;
    i++;
  });

  return students.sort();
}

export async function getNombreGrupo(uidgroup) {
  const docuRef = doc(db, `Groups/${uidgroup}`);
  const docSnap = await getDoc(docuRef);

  return docSnap.data();
}

export async function getAllGroupsStatic() {
  var i = 0;
  const groups = [];
  const q = query(
    collection(db, "GruposEstaticos"),
    where("creado", "==", false)
  );
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    groups.push(doc.data());
    groups[i]["uid"] = doc.id;
    i++;
  });
  //console.log(groups)

  return groups;
}

export async function getAllGroups() {
  var i = 0;
  const groups = [];
  const collectionRef = collection(db, "Groups");
  const snapshot = await getDocs(collectionRef);
  snapshot.forEach((doc) => {
    groups.push(doc.data());
    groups[i]["uid"] = doc.id;
    i++;
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
    groups[i]["uid"] = doc.id;
    i++;
  });
  //console.log(groups)

  return groups;
}

export async function getAllPosts(id) {
  var i = 0;
  const posts = [];
  const q = query(collection(db, "Posts"), where("group", "in", [id, "admin"]));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    posts.push(doc.data());
    posts[i]["uid"] = doc.id;
    i++;
  });
  //console.log(id)

  return posts;
}

export async function getAllPostsGeneral() {
  var i = 0;
  const posts = [];
  const q = query(collection(db, "Posts"));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    posts.push(doc.data());
    posts[i]["uid"] = doc.id;
    i++;
  });
  //console.log(groups)

  return posts;
}
