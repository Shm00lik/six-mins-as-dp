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
  updateDoc,
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
    await addDocument(Definitions.db.scoresCollectionName, data);
    return;
  }

  if (data.score < topNameRecord.score) {
    await deleteDocument(topNameRecord);
    await addDocument(Definitions.db.scoresCollectionName, data);
  }
};

export const getTopScores = async () => {
  return getDocuments<ScoreDoc>(Definitions.db.scoresCollectionName, [
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

const updateDocument = async (doc: BaseDoc, data: DocumentData) => {
  if (!doc.ref) {
    return;
  }

  await updateDoc(doc.ref, data);
};

const getTopRecordByName = async (name: string) => {
  const result = await getDocuments<ScoreDoc>(
    Definitions.db.scoresCollectionName,
    [where("name", "==", name), orderBy("score", "asc"), limit(1)]
  );

  return result.length > 0 ? result[0] : null;
};

const getDropoutByName = async (name: string) => {
  const result = await getDocuments<DropoutDoc>(
    Definitions.db.dropoutsCollectionName,
    [where("name", "==", name)]
  );

  return result.length > 0 ? result[0] : null;
};

const addDropout = async (data: DropoutDoc) => {
  const currentDropoutData = await getDropoutByName(data.name);

  if (currentDropoutData == null) {
    await addDocument(Definitions.db.dropoutsCollectionName, {
      name: data.name,
      counter: 1,
    });

    return;
  }

  await updateDocument(currentDropoutData, {
    counter: currentDropoutData.counter + 1,
  });
};

const removeDropout = async (name: string) => {}

export interface ScoreDoc extends BaseDoc {
  name: string;
  score: number;
  timestamp: number;
}

interface BaseDoc {
  ref?: DocumentReference;
}

export interface DropoutDoc extends BaseDoc {
  name: string;
  counter: number;
}
