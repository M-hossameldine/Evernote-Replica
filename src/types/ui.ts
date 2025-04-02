import type { IconType } from 'react-icons';

export type NavigationRoute = {
  route: string;
  pathname: (optionalParams?: any) => string;
  id?: string;
};

export type NavTabRouteConfig = {
  title: string;
  icon: IconType;
  path: string;
  id: string; // unique route path identifier to distinguish between routes
};
