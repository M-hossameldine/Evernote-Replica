import { RequestParams } from 'store/api.interfaces';
import { SaveLoginActionPayload } from '../local/authSlice.interfaces';
import type { UserCredential } from 'libs/firebase';

export type AuthRequestPayload = {
  email: string;
  password: string;
};

export type AuthRequestResponse = UserCredential;
export type AuthRequestResult = SaveLoginActionPayload;
export type AuthRequestParams = RequestParams<
  AuthRequestPayload,
  void,
  AuthRequestResult
>;
