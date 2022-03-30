import db from './firebase';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

interface Shortlink {
  id: string;
  destination: string;
}

export interface ShortlinkFormat {
  id: string;
  hostname: string;
  link: string;
}

export const add = async (destination: string): Promise<Shortlink> => {
  const { id } = await addDoc(collection(db, 'shortlinks'), {
    destination,
  });
  return { id, destination };
};

export const read = async (id: string): Promise<Shortlink | false> => {
  const docRef = doc(db, 'shortlinks', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists) {
    return false;
  }
  const { destination } = docSnap.data();
  return { destination, id };
};

export const browse = async (): Promise<Shortlink[]> => {
  let shortlinks: Shortlink[] = [];
  const docRef = collection(db, 'shortlinks');
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach(snapshot => {
    const { id } = snapshot;
    const { destination } = snapshot.data();
    shortlinks.push({ destination, id });
  });
  return shortlinks;
};

export const format = (
  id: string,
  destination: string,
  baseUrl: string,
): ShortlinkFormat => {
  const { hostname } = new URL(destination);
  return {
    id,
    hostname,
    link: `${baseUrl}/${id}`,
  };
};
