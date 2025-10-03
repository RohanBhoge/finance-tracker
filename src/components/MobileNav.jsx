import React, { useState } from "react";

const MobileNav = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["Stats", "Trans.", "Total", "Settings"];
  const uiOnlyItems = ["Accounts", "Recommend", "Notes"];

  const handleLinkClick = (item) => {
    setActivePage(item);
    setIsOpen(false); 
  };

  return (
    <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">FinTrack</h1>

      <button onClick={() => setIsOpen(true)} className="p-2">
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

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="text-xl font-bold text-indigo-600">Menu</h1>
          <button onClick={() => setIsOpen(false)} className="p-2">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {navItems.map((item) => (
              <li
                key={item}
                onClick={() => handleLinkClick(item)}
                className={`px-4 py-3 text-gray-700 hover:bg-indigo-50 cursor-pointer ${
                  activePage === item ? "bg-indigo-50 font-semibold" : ""
                }`}
              >
                {item}
              </li>
            ))}
            {uiOnlyItems.map((item) => (
              <li
                key={item}
                className="px-4 py-3 text-gray-400 cursor-not-allowed"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </header>
  );
};

export default MobileNav;
