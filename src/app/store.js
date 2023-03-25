import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import projectReducer from "../features/projects/projectsSlice";
import taskReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		projects: projectReducer,
		task: taskReducer,
	},
	middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
});

