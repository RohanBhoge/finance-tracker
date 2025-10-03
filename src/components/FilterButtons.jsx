const FilterButtons = ({ activeFilter, setFilter }) => {
  const filters = ["total", "yearly", "monthly", "weekly"];
  return (
    <div className="flex space-x-1 bg-gray-200 p-1 rounded-md">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 text-sm font-medium rounded-md capitalize ${
            activeFilter === f
              ? "bg-white text-indigo-600 shadow"
              : "text-gray-600 hover:bg-gray-300"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
