import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
} from '~libs/firebase';
import { mapFirebaseUserToAuthUser } from './authApis.mapping';

import type {
  AuthRequestParams,
  AuthRequestResult,
} from './authApis.interfaces';

export const signUp = async ({
  payload: { email, password },
}: AuthRequestParams): Promise<AuthRequestResult> => {
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

  // TODO: handle this with add note thunk
  // Initialize empty notes collection for the user
  await setDoc(doc(db, 'users', user.uid, 'active-notes', 'welcome'), {
    title: 'Welcome to Evernote!',
    text: 'Start creating your notes...',
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: new Date().toISOString(),
  });

  const mappedUser = mapFirebaseUserToAuthUser(user);

  return {
    user: mappedUser,
  };
};

export const login = async ({
  payload: { email, password },
}: AuthRequestParams): Promise<AuthRequestResult> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = mapFirebaseUserToAuthUser(userCredential.user);

  return {
    user,
  };
};

export const logout = async () => {
  return await signOut(auth);
};
