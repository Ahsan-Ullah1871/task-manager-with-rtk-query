import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	search_key: "",
};
const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		setSearchKey: (state, { payload }) => {
			state.search_key = payload;
		},
	},
});

export default taskSlice.reducer;
export const { setSearchKey } = taskSlice.actions;
