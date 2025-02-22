import { Button } from "./Button";
import { useState } from "react";
import { BiCircle } from "react-icons/bi";
import { BsClock, BsThreeDotsVertical, BsTrash2 } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { statusConfig } from "../constants";
import { formatDate } from "../utils";

export const TaskItem = ({
  task,
  handleOnEditClick,
  deleteTask,
  toggleCheckTask,
}) => {
  const { id, title, completed, description, dueDate, progress, status } = task;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get current status or default to 'in-progress'
  const currentStatus = statusConfig[status] || statusConfig["in-progress"];

  // Toggle menu state
  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);

  // Close menu on outside click
  const handleOutsideClick = () => isMenuOpen && setIsMenuOpen(false);

  return (
    <div
      className={`group relative overflow-hidden shadow-md rounded-2xl transition-all duration-300 ${
        completed
          ? "bg-slate-50/80 backdrop-blur-sm"
          : "bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5"
      } border border-slate-100 hover:border-slate-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleOutsideClick} // Close menu on outside click
    >
      {/* Background Shape */}
      <div className="absolute z-0 top-10 right-5 w-32 h-32 opacity-5 -rotate-45">
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600" />
      </div>

      {/* Progress Gradient */}
      <div className="relative h-1.5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
            transform: `scaleX(${isHovered ? 1.03 : 1})`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="px-5 py-4">
        <div className="flex items-start gap-4">
          <Button
            type="button"
            label=""
            arialLabel={`${completed ? "Uncheck task" : "Check task"}`}
            isDropdown={true}
            onClick={() => toggleCheckTask(id)}
            icon={
              <>
                <span
                  className={`absolute inset-0 rounded-full ring-2 ring-slate-200 transition-all duration-300 ${
                    completed
                      ? "scale-0 opacity-0"
                      : "hover:ring-green-400 hover:ring-offset-2"
                  }`}
                />
                {completed ? (
                  <FaCircleCheck className="size-full p-1.5" />
                ) : (
                  <BiCircle className="size-full p-1" />
                )}
              </>
            }
            styles={`relative flex-shrink-0 rounded-full size-6 transition-all duration-300 ${
              completed
                ? "bg-gradient-to-br from-green-400 to-green-500 text-white scale-100"
                : "text-slate-300 hover:text-green-500 hover:scale-105"
            }`}
          />

          <div className="flex-1 min-w-0">
            <h2
              className={`text-start text-base font-semibold leading-tight transition-colors duration-200 ${
                isExpanded ? "hidden sm:block" : "block"
              } ${
                completed ? "text-slate-400 line-through" : "text-slate-700"
              } overflow-hidden whitespace-nowrap text-ellipsis`}
            >
              {title}
            </h2>
            {!isExpanded && description && (
              <p className="mt-1 text-start text-sm text-slate-500 line-clamp-2">
                {description}
              </p>
            )}
          </div>

          <ActionButtons
            deleteTask={() => deleteTask(id)}
            handleOnEditClick={() => handleOnEditClick(task)}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            handleMenuToggle={handleMenuToggle}
          />
        </div>

        {isExpanded && (
          <ExpandedDetails
            title={title}
            completed={completed}
            dueDate={dueDate}
            progress={progress}
            description={description}
          />
        )}

        <div className="relative mt-4 flex items-center gap-2 justify-between">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${currentStatus.bgStyles} transition-all duration-200 hover:shadow-md hover:scale-105`}
          >
            {currentStatus.icon}
            <span className="ml-1.5 capitalize">{status}</span>
          </span>

          <Button
            type="button"
            label=""
            arialLabel={isExpanded ? "View less" : "View task"}
            onClick={() => setIsExpanded((prevState) => !prevState)}
            icon={<ToggleExpand isExpanded={isExpanded} />}
            styles="flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-lg hover:bg-blue-200 transition-all z-10"
          />
        </div>
      </div>
    </div>
  );
};

const ActionButtons = ({
  deleteTask,
  handleOnEditClick,
  isMenuOpen,
  handleMenuToggle,
}) => {
  return (
    <div className="relative">
      <Button
        type="button"
        label=""
        arialLabel="Open action menu"
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent onClick from firing
          handleMenuToggle();
        }}
        isDropdown={true}
        icon={
          <BsThreeDotsVertical className="text-slate-500 size-4 text-center" />
        }
        styles="p-2 rounded-full hover:bg-slate-100 transition-all -mt-1"
      />

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 -mt-1 w-28 bg-white border border-slate-200 shadow-lg rounded-lg z-20">
          <Button
            type="button"
            label="Edit"
            arialLabel="Edit task"
            isDropdown={true}
            onClick={(e) => {
              e.stopPropagation();
              handleOnEditClick();
              handleMenuToggle();
            }}
            icon={<FiEdit2 className="size-4 text-yellow-600 mr-2" />}
            styles="w-full flex items-center gap-2 p-2 text-gray-500 hover:bg-slate-100 transition-all"
          />
          <Button
            type="button"
            label="Delete"
            arialLabel="Delete task"
            isDropdown={true}
            onClick={(e) => {
              e.stopPropagation();
              deleteTask();
              handleMenuToggle();
            }}
            icon={<BsTrash2 className="size-4 text-red-500 mr-2" />}
            styles="w-full flex items-center hover:bg-slate-100 gap-2 p-2 text-gray-700 transition-all"
          />
        </div>
      )}
    </div>
  );
};

const ToggleExpand = ({ isExpanded }) =>
  isExpanded ? (
    <>
      <MdVisibilityOff className="size-4" />
      <span>Less</span>
    </>
  ) : (
    <>
      <MdVisibility className="size-4" />
      <span>More</span>
    </>
  );

const ExpandedDetails = ({
  description,
  title,
  dueDate,
  completed,
  progress,
}) => {
  return (
    <div className="overflow-hidden">
      <div className="mt-4 space-y-3">
        <h2
          className={`block sm:hidden text-start text-base font-semibold leading-tight transition-colors duration-200 ${
            completed ? "text-slate-400 line-through" : "text-slate-700"
          }`}
        >
          {title}
        </h2>
        <p className="text-start text-sm text-slate-600 leading-relaxed">
          {description}
        </p>

        {/* Progress Detail */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-medium text-slate-500 mb-1">
              Progress
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {progress}%
              </span>
            </div>
          </div>

          {/* Due Date Card */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-medium text-slate-500 mb-1">
              Due Date
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <BsClock className="size-4 text-slate-400" />
              {formatDate(dueDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
