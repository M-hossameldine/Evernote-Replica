import { useMatch } from 'react-router-dom';

import { MainPublicNav } from '~modules/AuthFree/presentation/components/MainPublicNav';

import { AuthRouteVariants } from '~constants/routeVariants';

type PublicLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const PublicLayout = ({
  children,
  className = '',
}: PublicLayoutProps) => {
  const match = useMatch(AuthRouteVariants.auth.route);
  const isAuthPage = !!match;

  return (
    <main className={`${className} min-h-screen ${isAuthPage ? '' : 'pt-12'}`}>
      {isAuthPage ? null : <MainPublicNav />}
      {children}
    </main>
  );
};
