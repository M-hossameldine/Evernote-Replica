import type { User } from '~modules/auth/domain/models';
import type { AuthRequestResult } from '../remote/authApis.interfaces';

export type AuthSliceState = {
  user: User | null;
  isLoggedIn: boolean;
};

export type SaveLoginActionPayload = AuthRequestResult;
