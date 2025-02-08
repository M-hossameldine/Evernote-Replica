import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
} from "libs/firebase";
import type { AuthRequestPayload } from "./authApis.interfaces";

export const signUp = async ({
  payload: { email, password },
}: {
  payload: AuthRequestPayload;
}) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  // Save user details in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: new Date().toISOString(),
  });

  return userCredential;
};

export const login = async ({
  payload: { email, password },
}: {
  payload: AuthRequestPayload;
}) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};
