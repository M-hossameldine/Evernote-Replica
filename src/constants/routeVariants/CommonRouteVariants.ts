import type { NavigationRoute } from 'types/ui';

export const CommonRouteVariants: Record<string, NavigationRoute> = {
  publicHomePage: {
    route: `/`,
    pathname: () => `/`,
  },
  download: {
    route: `/download`,
    pathname: () => `/download`,
  },
  userHomePage: {
    route: `/home`,
    pathname: () => `/home`,
    id: 'home',
  },
};
