import type { User } from '~modules/auth/domain/models';

import type { MutationRequestParams } from '~store/Apis/appApis.interfaces';

// * Backend DTOs (shapes returned by the REST API)
export type UserDto = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

/** Body of login / register / google / refresh. */
export type AuthResponseDto = {
  user: UserDto;
  accessToken: string;
  /** Seconds until the access token expires. */
  expiresIn: number;
};

// * Result handed to the presentation layer (no tokens)
export type AuthRequestResult = {
  user: User;
};

// * Login
export type LoginRequestPayload = {
  email: string;
  password: string;
};
export type LoginRequestParams = MutationRequestParams<
  AuthRequestResult,
  LoginRequestPayload
>;

// * Register
export type RegisterRequestPayload = {
  name: string;
  email: string;
  password: string;
};
export type RegisterRequestParams = MutationRequestParams<
  AuthRequestResult,
  RegisterRequestPayload
>;

// * Logout
export type LogoutRequestParams = MutationRequestParams;

// * Restore session (on app start)
/** `null` when there is no valid session (the user is logged out). */
export type RestoreSessionResult = AuthRequestResult | null;
