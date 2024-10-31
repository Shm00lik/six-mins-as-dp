import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { DBDoc, Definitions } from "./game/definitions";

const config = {
  projectId: Definitions.db.projectId,
};

const app = initializeApp(config);
const db = getFirestore(app);

const getDocuments = async <T = any>(collectionName: string): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  return querySnapshot.docs.map((doc) => doc.data() as T);
};

const addDocument = async (collectionName: string, data: DocumentData) => {
  await addDoc(collection(db, collectionName), data);
};

export const addRecord = async (data: DBDoc) => {
  await addDocument(Definitions.db.collectionName, data);
};
