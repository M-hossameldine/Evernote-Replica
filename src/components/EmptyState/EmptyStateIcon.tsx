import type { IconType } from 'react-icons';

export const EmptyStateIcon = (props: { Icon: IconType }) => {
  const { Icon } = props;

  return <Icon className="mb-12 shrink-0 text-8xl text-neutral-300" />;
};
