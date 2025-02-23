import { useCallback } from 'react';

import { collection, getDocs, getFirestore } from 'firebase/firestore';

// TODO: Validate if this hook is still needed
export const useFirebase = () => {
  // get collection data
  const getCollectionData = useCallback(async (collectionKey: string) => {
    // init service
    const db = getFirestore();

    // collection ref
    const getCollectionRef = (key: string) => collection(db, key);

    const colRef = getCollectionRef(collectionKey);
    return getDocs(colRef).then(snapshot => {
      return snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));
    });
  }, []);

  return {
    getCollectionData,
  };
};
