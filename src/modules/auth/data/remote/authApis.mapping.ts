import type { FirebaseUser } from '~libs/firebase';
import type { User } from '~modules/auth/domain/models';

export const mapFirebaseUserToAuthUser = (user: FirebaseUser): User => {
  return {
    id: user.uid,
    email: user.email!,
    name: user.displayName,
  };
};
