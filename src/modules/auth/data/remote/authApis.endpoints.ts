import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
} from '~libs/firebase';

import type { UserCredential } from 'firebase/auth';
import type { AuthRequestParams } from './authApis.interfaces';

export const signUp = async ({
  payload: { email, password },
}: AuthRequestParams): Promise<UserCredential> => {
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

  return userCredential;
};

export const login = async ({
  payload: { email, password },
}: AuthRequestParams): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};
