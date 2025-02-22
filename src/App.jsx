import "./App.css";
import { useState } from "react";
import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { useTasks } from "./hooks/useTasks";
import { BackgroundPattern } from "./components/BackgroundPattern";
import Loader from "./components/Loader";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const {
    tasks,
    isLoading,
    error,
    hasMore,
    showModalLoading,
    lastElementRef,
    addTask,
    handleSearch,
    handleFilter,
    deleteTask,
    editTask,
    toggleCheckTask,
  } = useTasks();

  // Toggles the visibility of the task form
  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  // Handles the edit button click
  const handleOnEditClick = (selectedTask) => {
    setTaskToEdit(selectedTask);
    toggleForm(); // Show the form when editing
  };
  return (
    <div className="max-w-3xl mx-auto px-2 py-4 sm:p-8">
      <Header
        toggleForm={toggleForm}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
      />

      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      {/* Show loader when loading and no tasks exist */}
      {isLoading && tasks.length === 0 && <Loader />}

      {/* Show modal loader for CRUD operations */}
      {isLoading && showModalLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-52 w-1/2 mx-4">
            <div className="flex justify-center">
              <Loader />
            </div>
          </div>
        </div>
      )}

      <TaskList
        tasks={tasks}
        hasMore={hasMore}
        isLoading={isLoading}
        toggleForm={toggleForm}
        deleteTask={deleteTask}
        lastElementRef={lastElementRef}
        toggleCheckTask={toggleCheckTask}
        handleOnEditClick={handleOnEditClick}
      />

      {showForm && (
        <TaskForm
          addTask={addTask}
          showForm={showForm}
          editTask={editTask}
          taskToEdit={taskToEdit}
          toggleForm={toggleForm}
          setTaskToEdit={setTaskToEdit}
        />
      )}

      <BackgroundPattern />
    </div>
  );
}

export default App;
