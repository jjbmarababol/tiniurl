import db from './firebase';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import {
  BaseUrl,
  Destination,
  ErrorResponse,
  Id,
  Shortlink,
  ShortlinkFormat,
} from '../models';

export const add = async (destination: Destination): Promise<Shortlink> => {
  const { id } = await addDoc(collection(db, 'shortlinks'), {
    destination,
  });
  return { id, destination };
};

export const remove = async (id: Id) => {
  await deleteDoc(doc(db, 'shortlinks', id));
};

export const clear = async () => {
  const docRef = collection(db, 'shortlinks');
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach(snapshot => {
    remove(snapshot.id);
  });
};

export const read = async (id: Id): Promise<Shortlink | ErrorResponse> => {
  const docRef = doc(db, 'shortlinks', id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  if (!docSnap.exists || !data || !data?.destination) {
    return { hasError: true };
  }

  return { destination: data.destination, id };
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
  id: Id,
  destination: Destination,
  baseUrl: BaseUrl,
): ShortlinkFormat => {
  const { hostname } = new URL(destination);
  return {
    id,
    hostname,
    link: `${baseUrl}/${id}`,
  };
};
