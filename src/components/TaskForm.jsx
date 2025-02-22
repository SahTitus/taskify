import { useEffect, useState } from "react";
import { Button } from "./Button";

const INITIALSTATE = {
  id: null,
  title: "",
  description: "",
  dueDate: "",
  progress: 0,
  status: "pending",
  completed: false,
};

export const TaskForm = ({
  addTask,
  taskToEdit,
  setTaskToEdit,
  editTask,
  toggleForm,
}) => {
  const [task, setTask] = useState(INITIALSTATE);
  const [errors, setErrors] = useState({});

  // Populate form when editing a task
  useEffect(() => {
    if (taskToEdit) setTask(taskToEdit);
  }, [taskToEdit]);

  // Handle input changes and update task state
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set task properties based on status
    const getTaskPropertiesByStatus = (status) => ({
      progress:
        status === "completed" ? 100 : status === "pending" ? 0 : task.progress,
      completed: status === "completed",
    });

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
      ...(name === "status" && getTaskPropertiesByStatus(value)),
    }));
  };

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!task.title.trim()) errors.title = "Title is required";
    if (!task.dueDate) errors.dueDate = "Due date is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Close form and reset state
  const closeForm = () => {
    toggleForm();
    setTask(INITIALSTATE);
    setTaskToEdit(INITIALSTATE);
    setErrors({});
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    task?.id ? editTask(task) : addTask(task);
    closeForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="w-[95%] md:w-full max-w-lg p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 sm:max-w-xl">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          Add New Task
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 text-left">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-md shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150"
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 text-left">
              Description
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-md shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150"
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 text-left">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-md shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150"
            />
            {errors.dueDate && (
              <p className="text-sm text-red-500">{errors.dueDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 text-left">
              Status
            </label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-md shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Progress */}
          {task.status === "in-progress" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 text-left">
                Progress: {task.progress || 0}%
              </label>
              <input
                type="range"
                name="progress"
                min="0"
                max="100"
                value={
                  task.status === "completed"
                    ? 100
                    : task.status === "pending"
                    ? 0
                    : task.progress
                }
                onChange={handleChange}
                className="w-full mt-1"
              />
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              isAddBtn={false}
              type="button"
              label="Cancel"
              onClick={closeForm}
              styles="px-6 py-2 bg-white text-gray-700 rounded-md shadow-sm hover:bg-gray-100 border border-gray-300 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transform hover:-translate-y-0.5"
            />
            <Button
              type="submit"
              label={task.id ? "Save Changes" : "Add Task"}
              onClick={undefined}
              styles="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow-md hover:shadow-lg hover:shadow-purple-400/50 transition duration-150 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
