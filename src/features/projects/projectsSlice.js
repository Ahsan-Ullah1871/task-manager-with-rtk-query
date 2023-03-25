import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selected_projects: [],
};
const projectSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {
		selectProject: (state, { payload }) => {
			const isAvailable =
				state.selected_projects.includes(payload);
			if (isAvailable) {
				let updated_state = state.selected_projects
					.filter((it) => it != payload)
					.sort((a, b) => a - b);
				state.selected_projects = updated_state;
				localStorage.setItem(
					"selected_projects",
					JSON.stringify(updated_state)
				);
			} else {
				let updated_state = [
					...state.selected_projects,
					payload,
				].sort((a, b) => a - b);
				state.selected_projects = updated_state;
				localStorage.setItem(
					"selected_projects",
					JSON.stringify(updated_state)
				);
			}
		},
		selectAllProjects: (state, { payload }) => {
			state.selected_projects = payload;
			localStorage.setItem(
				"selected_projects",
				JSON.stringify(payload)
			);
		},
	},
});

export default projectSlice.reducer;
export const { selectProject, selectAllProjects } = projectSlice.actions;
