import { DefaultSpinner } from '../DefaultSpinner/DefaultSpinner';

type ScreenLoadingProps = {
  className?: string;
};

export const ScreenLoading = ({ className }: ScreenLoadingProps) => {
  return (
    <div
      className={`${className} flex min-h-screen w-full items-center justify-center`}
    >
      <DefaultSpinner size="h-12 w-12" borderSize="border-4" />
    </div>
  );
};
