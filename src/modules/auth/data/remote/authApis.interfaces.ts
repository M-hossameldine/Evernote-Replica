import type { UserCredential } from '~libs/firebase';

import type { MutationRequestParams } from '~store/Apis/appApis.interfaces';

import type { SaveLoginActionPayload } from '../local/authSlice.interfaces';

export type AuthRequestPayload = {
  email: string;
  password: string;
};
export type AuthRequestResponse = UserCredential;
export type AuthRequestResult = SaveLoginActionPayload;
export type AuthRequestParams = MutationRequestParams<
  AuthRequestResult,
  AuthRequestPayload
>;

export type LogoutRequestParams = MutationRequestParams;
