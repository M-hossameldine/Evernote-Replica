import type { User } from 'modules/auth/domain/models';

export type AuthSliceState = {
  user: User | null;
  isLoggedIn: boolean;
};

export type SaveLoginActionPayload = {
  user: User | null;
};
