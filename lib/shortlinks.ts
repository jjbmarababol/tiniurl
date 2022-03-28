import { db } from './firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

export async function add(destination: string, shortlink: string){
    const ref = await addDoc(collection(db, 'shortlinks'), {
        destination,
        shortlink
    });
    return `${process.env.SHORTLINK_BASE_URL}/${ref.id}`;
}

export async function read(id: string){
    const docRef = doc(db, 'shortlinks', id);
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists) {
        return false;
    }
    return docSnap.data();
}