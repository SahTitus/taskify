import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  tasks: [], // All tasks
  displayedTasks: [], // Filtered or searched tasks for UI display
  isLoading: false, // Loading state for async actions
  error: null, // Error handling state
};

// Task data with additional properties like description, due date, progress, and status
const enhanceTaskData = (task) => {
  // First determine status
  let status;
  if (task.completed) {
    status = "completed";
  } else {
    status = ["pending", "in-progress"][Math.floor(Math.random() * 2)];
  }

  // Set progress based on status
  let progress;
  if (status === "completed") {
    progress = 100;
  } else if (status === "in-progress") {
    progress = Math.floor(Math.random() * 99) + 1; // 1-99
  } else {
    // pending
    progress = 0;
  }

  return {
    ...task,
    description: `Task description for ${task.title}`,
    dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    progress,
    status,
  };
};

const api = "https://jsonplaceholder.typicode.com/todos";

// Async thunk to fetch tasks from API
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch(api);
  const data = await response.json();
  return data.map(enhanceTaskData);
});

// Async thunk to add a new task
export const addTaskAsync = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify({
          title: task.title,
          completed: false,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      return enhanceTaskData(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update an existing task
export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await fetch(`${api}/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: task.id,
          title: task.title,
          completed: task.completed,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      return { ...task, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a task
export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await fetch(`${api}/${id}`, { method: "DELETE" });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: INITIAL_STATE,
  reducers: {
    // Set displayed tasks
    setDisplayedTasks: (state, action) => {
      state.displayedTasks = action.payload;
    },

    // Search tasks based on title
    searchTasks: (state, action) => {
      const searchTerm = action.payload.toLowerCase().trim();
      state.displayedTasks = searchTerm
        ? state.tasks.filter((task) =>
            task.title.toLowerCase().includes(searchTerm)
          )
        : state.tasks;
    },

    // Filter tasks based on status
    filterTasks: (state, action) => {
      const statusFilter = action.payload.toLowerCase().trim();
      state.displayedTasks =
        statusFilter === "all"
          ? state.tasks
          : state.tasks.filter(
              (task) => task.status.toLowerCase() === statusFilter
            );
    },

    // Toggle task completion and update status/progress
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.status = task.completed ? "completed" : "pending";
        task.progress = task.completed ? 100 : 0;
      }
      state.displayedTasks = [...state.tasks];
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch tasks cases
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.displayedTasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Add task cases
      .addCase(addTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.unshift(action.payload);
        state.displayedTasks = [...state.tasks];
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update task cases
      .addCase(updateTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
          state.displayedTasks = [...state.tasks];
        }
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete task cases
      .addCase(deleteTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.displayedTasks = [...state.tasks];
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setDisplayedTasks,
  searchTasks,
  filterTasks,
  toggleTaskCompletion,
} = taskSlice.actions;

export default taskSlice.reducer;
