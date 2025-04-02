import MainUserSideNav from '~modules/profile/presentation/components/MainUserSideNav';

type AuthorizedLayoutProps = {
  children?: React.ReactNode;
  className?: string;
};

export const AuthorizedLayout = (props: AuthorizedLayoutProps) => {
  const { className } = props;

  return (
    <main className={`${className} flex h-screen min-h-screen w-full`}>
      <MainUserSideNav />

      <div className="scrollbar-box w-full overflow-y-scroll bg-neutral-200">
        {props.children}
      </div>
    </main>
  );
};
