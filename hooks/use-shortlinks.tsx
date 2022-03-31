import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../lib/firebase";
import { format } from "../lib/shortlinks";

const useShortlinks = () => {
  const [shortlinks, setShortlinks] = useState<any>();
  useEffect(() => {
    const collectionRef = collection(db, "shortlinks");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const links = [];
      querySnapshot.forEach((doc) => {
        const { id } = doc;
        const { destination } = doc.data();
        links.push(
          format(id, destination, process.env.NEXT_PUBLIC_SHORTLINK_BASE_URL)
        );
      });
      if(JSON.stringify(shortlinks) !== JSON.stringify(links)) {
        setShortlinks(links);
      }
    });
    return unsubscribe;
  });

  return { shortlinks, setShortlinks };
};

export const shortlinkAPI = {
  useShortlinks,
};
