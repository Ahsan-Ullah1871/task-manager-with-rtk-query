import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selected_tem_member: undefined,
};
const teamSlice = createSlice({
	name: "team",
	initialState,
	reducers: {
		selectTeamMember: (state, { payload }) => {
			state.selected_tem_member = payload;
		},
	},
});

export default teamSlice.reducer;
export const { selectTeamMember } = teamSlice.actions;
