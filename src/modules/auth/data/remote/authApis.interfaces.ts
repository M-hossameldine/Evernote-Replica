import type { User } from '~modules/auth/domain/models';

import type { MutationRequestParams } from '~store/Apis/appApis.interfaces';

export type AuthRequestPayload = {
  email: string;
  password: string;
};
export type AuthRequestResponse = {
  user: User | null;
};
export type AuthRequestResult = AuthRequestResponse;
export type AuthRequestParams = MutationRequestParams<
  AuthRequestResult,
  AuthRequestPayload
>;

export type LogoutRequestParams = MutationRequestParams;
