import React from "react";

interface DefaultSpinnerProps {
  size?: string; //"h-6 w-6"
  borderColor?: string; // "border-green-450"
  borderSize?: string; // "border-3"
}

export const DefaultSpinner = (
  props: DefaultSpinnerProps,
): React.ReactElement => {
  const {
    size = "h-6 w-6",
    borderColor = "border-current",
    borderSize = "border-2",
  } = props;
  return (
    <div
      className={`inline-block ${size} animate-spin rounded-full ${borderSize} border-solid ${borderColor} border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};
