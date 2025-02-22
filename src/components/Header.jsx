import { BiPlusCircle } from "react-icons/bi";
import { Button } from "./Button";
import { SearchFilter } from "./SearchFilter";

export const Header = ({ toggleForm, handleSearch, handleFilter }) => {
  return (
    <header className="sticky top-0 z-50 px-2 bg-white rounded-xl">
      <div className="relative sm:px-4 md:px-8 py-4 md:py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative group">
            <h1 className="text-left text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                Taskify
              </span>
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-600 hidden sm:block transition-opacity duration-200">
              Stay organized and productive
            </p>

            {/* dots */}
            <div className="absolute left-24 top-1 grid grid-cols-2 gap-1 opacity-20 shrink-0 flex-grow-0 size-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="size-1 rounded-full bg-blue-600 shrink-0 flex-grow-0"
                />
              ))}
            </div>
          </div>

          <Button
            type="button"
            label="New Task"
            onClick={toggleForm}
            icon={<BiPlusCircle className="w-5 h-5" />}
            styles="relative px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-sm md:text-base transition-all duration-20 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] overflow-hidden group"
          />
        </div>

        <SearchFilter handleFilter={handleFilter} handleSearch={handleSearch} />
      </div>
    </header>
  );
};
