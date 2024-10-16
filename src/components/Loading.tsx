import React from "react";

const Loading: React.FC = () => {
  return (
    <div
      className="flex h-[100vh] w-[100vw] justify-center items-center"
      aria-busy="true"
    >
      <div className="loader border-t-4 border-[#CB1517] rounded-full w-12 h-12 animate-spin"></div>
      <p className="ml-4 text-lg font-BebasNune text-[#CB1517] font-medium">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
