import React from "react";

const NumberDisplay: React.FC<{number: number, label:string}> = ({number, label}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-2xl font-bold">{number}</div>
    </div>
  );
};

export default NumberDisplay;