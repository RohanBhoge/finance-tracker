import React from "react";

const PageHeader = ({ title, onMenuClick }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-2 text-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </header>
  );
};

export default PageHeader;
