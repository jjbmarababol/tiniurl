import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../lib/firebase";
import { format } from "../lib/shortlinks";

const useShortlinks = () => {
  const [shortlinks, setShortlinks] = useState<any>();
  useEffect(() => {
    const collectionRef = collection(db, "shortlinks");
    const q = query(collectionRef, orderBy("destination"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const links = [];
      querySnapshot.forEach((doc) => {
        const { id } = doc;
        const { destination } = doc.data();
        links.push(
          format(id, destination, process.env.NEXT_PUBLIC_SHORTLINK_BASE_URL)
        );
        console.log(links);
      });
      setShortlinks(links);
    });
    console.log(shortlinks);
    return unsubscribe;
  }, []);

  return { shortlinks, setShortlinks };
};

export const shortlinkAPI = {
  useShortlinks,
};
