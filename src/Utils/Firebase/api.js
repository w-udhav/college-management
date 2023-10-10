import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function addDocument(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function getStudents() {
  try {
    const students = await getDocs(collection(db, "Students"));
    return students;
  } catch (e) {
    throw new Error(e.message);
  }
}
