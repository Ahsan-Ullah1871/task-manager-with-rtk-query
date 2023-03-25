import { apiSlice } from "../api/apiSlice";
import { selectAllProjects, selectProject } from "./temsSlice";

export const teamApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//getProjects:
		getTeams: builder.query({
			query: () => `/team`,

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const result = await queryFulfilled;

				console.log("result", result);
				// if (!isAvailableInStorage) {
				// 	dispatch(selectAllProjects());
				// }
			},
		}),
	}),
});

export const { useGetTeamsQuery } = teamApi;
