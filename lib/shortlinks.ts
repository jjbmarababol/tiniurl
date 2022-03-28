import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function addShortlink(destination: string, shortlink: string){
    const ref = await addDoc(collection(db, 'shortlinks'), {
        destination,
        shortlink
    });
    return ref.id;
}