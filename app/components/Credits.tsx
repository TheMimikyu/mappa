import React from "react";

const Credits: React.FC = () => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg border border-gray-200 z-1 shadow-sm">
      <p className="text-sm text-gray-700">
        Built by{" "}
        <a
          href="https://knowvedant.vercel.app/"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Vedant Yadav
        </a>
      </p>
    </div>
  );
};

export default Credits;
