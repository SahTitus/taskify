import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteScroll } from "./useInfiniteScroll";
import {
  fetchTasks,
  addTaskAsync,
  updateTaskAsync,
  deleteTaskAsync,
  searchTasks,
  filterTasks,
  toggleTaskCompletion,
} from "../store/taskSlice";

// Custom hook for managing tasks with Redux integration and infinite scroll
export const useTasks = () => {
  const [showModalLoading, setShowModalLoading] = useState(false);
  const dispatch = useDispatch();

  // Select task-related state from Redux store
  const { tasks, displayedTasks, isLoading, error } = useSelector(
    (state) => state.tasks
  );

  // Initialize infinite scroll with 10 items per page
  const {
    displayedItems: paginatedTasks,
    hasMore,
    lastElementRef,
    isLoadingMore,
  } = useInfiniteScroll(displayedTasks, 10);

  // Fetch tasks on initial load if empty
  useEffect(() => {
    if (!tasks.length) {
      dispatch(fetchTasks());
    }
  }, [dispatch, tasks.length]);

  // Task management functions
  const addTask = (task) => {
    if (task.title.trim()) {
      dispatch(addTaskAsync(task));
      setShowModalLoading(true);
    }
  };

  const deleteTask = (id) => {
    dispatch(deleteTaskAsync(id));
    setShowModalLoading(true);
  };

  const editTask = (updatedTask) => {
    dispatch(updateTaskAsync(updatedTask));
    setShowModalLoading(true);
  };

  // Function to toggle task completion status
  const toggleCheckTask = (id) => {
    dispatch(toggleTaskCompletion(id));

    // Find the task by its ID
    const task = tasks.find((t) => t.id === id);

    // If the task exists, update it asynchronously with new completion status
    if (task) {
      dispatch(
        updateTaskAsync({
          ...task,
          completed: !task.completed,
          status: !task.completed ? "completed" : "pending",
          progress: !task.completed ? 100 : 0,
        })
      );
    }
  };

  // Search and filter handlers
  const handleSearch = (searchTerm) => {
    dispatch(searchTasks(searchTerm));
  };

  const handleFilter = (filter) => {
    dispatch(filterTasks(filter));
  };

  return {
    tasks: paginatedTasks,
    isLoading: isLoading || isLoadingMore,
    error,
    hasMore,
    showModalLoading,
    lastElementRef,
    addTask,
    editTask,
    deleteTask,
    handleFilter,
    handleSearch,
    toggleCheckTask,
  };
};
