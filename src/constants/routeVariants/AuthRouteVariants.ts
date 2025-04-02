import type { AuthMode } from '~constants/AppEnums';
import type { NavigationRoute } from 'types/ui';

export const AuthRouteVariants: Record<string, NavigationRoute> = {
  auth: {
    route: '/auth/:authMode',
    pathname: (authType: AuthMode) => `/auth/${authType}`,
  },
};
