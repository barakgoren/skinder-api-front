import React from "react";

const TextDisplay: React.FC<{text: string, label:string}> = ({text, label}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-2xl font-bold">{text}</div>
    </div>
  );
};

export default TextDisplay;
