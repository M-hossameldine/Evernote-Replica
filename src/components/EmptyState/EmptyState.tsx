import React from 'react';

export type EmptyStateProps = {
  title: string;
  text: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
};

export const EmptyState = (props: EmptyStateProps): React.ReactElement => {
  const { title, text, icon, action } = props;

  return (
    <div className="flex h-full flex-col items-center justify-center bg-neutral-100 p-8 text-center text-neutral-500">
      {icon}
      <h2 className="mb-4 text-lg text-neutral-700">{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
};

export default EmptyState;
