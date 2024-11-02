import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  DocumentData,
  DocumentReference,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";
import { Definitions } from "./definitions";

const config = {
  projectId: Definitions.db.projectId,
};

const app = initializeApp(config);
const db = getFirestore(app);

const getDocuments = async <T = BaseDoc>(
  collectionName: string,
  queries?: QueryConstraint[]
): Promise<T[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, collectionName), ...(queries || []))
  );

  return querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), ref: doc.ref } as T)
  );
};

const addDocument = async (collectionName: string, data: DocumentData) => {
  await addDoc(collection(db, collectionName), data);
};

export const addScoreRecord = async (data: ScoreDoc) => {
  const topNameRecord = await getTopRecordByName(data.name);

  if (topNameRecord == null) {
    await addDocument(Definitions.db.collectionName, data);
    return;
  }

  if (data.score < topNameRecord.score) {
    await deleteDocument(topNameRecord);
    await addDocument(Definitions.db.collectionName, data);
  }
};

export const getTopScores = async () => {
  return getDocuments<ScoreDoc>(Definitions.db.collectionName, [
    orderBy("score", "asc"),
    limit(5),
  ]);
};

const deleteDocument = async (doc: BaseDoc) => {
  if (!doc.ref) {
    return;
  }

  await deleteDoc(doc.ref);
};

const getTopRecordByName = async (name: string) => {
  const result = await getDocuments<ScoreDoc>(Definitions.db.collectionName, [
    // orderBy("score", "asc"),
    where("name", "==", name),
    orderBy("score", "asc"),
    limit(1),
  ]);

  return result.length > 0 ? result[0] : null;
};

export interface ScoreDoc extends BaseDoc {
  name: string;
  score: number;
  timestamp: number;
}

interface BaseDoc {
  ref?: DocumentReference;
}

// export interface DropoutDoc {
//   name: string;
// }
