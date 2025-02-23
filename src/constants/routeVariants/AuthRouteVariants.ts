import type { AuthMode } from '~constants/AppEnums';

export const AuthRouteVariants = {
  auth: {
    route: '/auth/:authMode',
    pathname: (authType: AuthMode) => `/auth/${authType}`,
  },
};
