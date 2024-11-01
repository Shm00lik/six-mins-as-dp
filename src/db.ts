import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { Definitions } from "./definitions";

const config = {
  projectId: Definitions.db.projectId,
};

const app = initializeApp(config);
const db = getFirestore(app);

const getDocuments = async <T = any>(
  collectionName: string,
  queries?: QueryConstraint[]
): Promise<T[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, collectionName), ...(queries || []))
  );

  return querySnapshot.docs.map((doc) => doc.data() as T);
};

const addDocument = async (collectionName: string, data: DocumentData) => {
  await addDoc(collection(db, collectionName), data);
};

export const addScoreRecord = async (data: ScoreDoc) => {
  await addDocument(Definitions.db.collectionName, data);
};

export const getTopScores = async () => {
  return getDocuments<ScoreDoc>(Definitions.db.collectionName, [
    orderBy("score", "asc"),
    limit(5),
  ]);
};

export interface ScoreDoc {
  name: string;
  score: number;
}

// export interface DropoutDoc {
//   name: string;
// }
