import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
} from '~libs/firebase';

import type { AuthRequestParams } from './authApis.interfaces';

export const signUp = async ({
  payload: { email, password },
}: AuthRequestParams) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Save user details in Firestore users collection
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    createdAt: new Date().toISOString(),
  });

  //* serialize the result
  return {
    user: {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
    },
    providerId: userCredential.providerId,
    operationType: userCredential.operationType,
  };
};

export const login = async ({
  payload: { email, password },
}: AuthRequestParams) => {
  const result = await signInWithEmailAndPassword(auth, email, password);

  return {
    user: {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    },
    providerId: result.providerId,
    operationType: result.operationType,
  };
};

export const logout = async () => {
  return await signOut(auth);
};
