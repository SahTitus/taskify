import { BiSearch } from "react-icons/bi";
import { Button } from "./Button";
import { useState } from "react";

export const SearchFilter = ({ handleSearch, handleFilter }) => {
  const [searchTerm, SetSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  // Apply selected filter
  const filterTasks = (filter) => {
    setActiveFilter(filter);
    handleFilter(filter);
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      {/* Search input */}
      <form onSubmit={handleSubmit} className="relative flex-grow">
        <Button
          type="submit"
          label=""
          arialLabel="Submit button"
          onClick={undefined}
          icon={<BiSearch className="h-5 w-5 text-gray-400" />}
          styles="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
        />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm md:text-base text-gray-700 placeholder-gray-400 transition-all outline-none duration-200 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => SetSearchTerm(e.target.value)}
        />
      </form>

      {/* Filter options */}
      <div className="flex justify-between md:justify-start gap-2 md:gap-3 p-1 overflow-x-auto hideScrollbar">
        <FilterCheckbox
          label="All"
          filterValue="all"
          activeFilter={activeFilter}
          onChange={filterTasks}
        />
        <FilterCheckbox
          label="Pending"
          filterValue="pending"
          activeFilter={activeFilter}
          onChange={filterTasks}
        />
        <FilterCheckbox
          label="In Progress"
          filterValue="in-progress"
          activeFilter={activeFilter}
          onChange={filterTasks}
        />
        <FilterCheckbox
          label="Completed"
          filterValue="completed"
          activeFilter={activeFilter}
          onChange={filterTasks}
        />
      </div>
    </div>
  );
};

// Filter checkbox component
const FilterCheckbox = ({ label, filterValue, activeFilter, onChange }) => (
  <label
    className={`shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
      activeFilter === filterValue
        ? "bg-blue-100 text-blue-700 shadow-sm"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    <input
      type="checkbox"
      checked={activeFilter === filterValue}
      onChange={() => onChange(filterValue)}
      className=" h-4 w-4 text-blue-600 rounded focus:ring-0 transition duration-150 cursor-pointer"
    />
    {label}
  </label>
);
