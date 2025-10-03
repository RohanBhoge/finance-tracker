import React from "react";

const Sidebar = ({ isOpen, onClose, activePage, setActivePage }) => {
  const navItems = ["Stats", "Trans.", "Total", "Settings"];
  const uiOnlyItems = ["Accounts", "Recommend", "Notes"];

  const handleLinkClick = (item) => {
    setActivePage(item);
    onClose();
  };

  return (
    <>
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 bg-white shadow-xl z-50 w-64
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">FinTrack</h1>
          <button onClick={onClose} className="md:hidden p-2 text-gray-500">
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
        <nav>
          <ul>
            {navItems.map((item) => (
              <li
                key={item}
                onClick={() => handleLinkClick(item)}
                className={`px-8 py-3 text-gray-700 hover:bg-indigo-50 cursor-pointer ${
                  activePage === item
                    ? "border-r-4 border-indigo-500 bg-indigo-50 font-semibold"
                    : ""
                }`}
              >
                {item}
              </li>
            ))}
            {uiOnlyItems.map((item) => (
              <li
                key={item}
                className="px-8 py-3 text-gray-400 cursor-not-allowed"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
