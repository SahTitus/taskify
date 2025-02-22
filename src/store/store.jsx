import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import taskSlice from "./taskSlice";

// Configure Redux store with task reducer
export const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
  // Disable serializable check for potential non-serializable values
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;