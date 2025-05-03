import React from "react";

interface LabelStripProps {
  content: string;
}

const LabelStrip: React.FC<LabelStripProps> = ({ content }) => {
  return (
    <div>
      <p className="bg-[#1e1e1e] px-4 py-1 inline-block text-sm uppercase tracking-wide text-gray-300 text-right pr-32">
        {content}
      </p>
    </div>
  );
};

export default LabelStrip;
