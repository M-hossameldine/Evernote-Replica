import { FirebaseUser } from "libs/firebase";
import type { User } from "modules/auth/domain/models";
import type { SaveLoginActionPayload } from "../local/authSlice.interfaces";
import type { AuthRequestResponse } from "./authApis.interfaces";

export const mapFirebaseUserToAuthUser = (user: FirebaseUser): User => {
  return {
    id: user.uid,
    email: user.email,
    name: user.displayName,
  };
};

export const mapAuthRequestResult = (
  responseData: AuthRequestResponse,
): SaveLoginActionPayload => {
  const { user } = responseData;
  const authUser = mapFirebaseUserToAuthUser(user);

  return {
    user: authUser,
  };
};
